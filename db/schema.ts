import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
};

export const organizations = sqliteTable("organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  status: text("status", { enum: ["trial", "active", "suspended"] })
    .notNull()
    .default("trial"),
  ...timestamps,
});

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    passwordHash: text("password_hash"),
    role: text("role", {
      enum: ["owner", "admin", "finance", "noc", "technician", "cashier"],
    })
      .notNull()
      .default("admin"),
    status: text("status", { enum: ["active", "inactive"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("users_org_email_unique").on(
      table.organizationId,
      table.email,
    ),
  ],
);

export const internetPlans = sqliteTable(
  "internet_plans",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    downloadMbps: integer("download_mbps").notNull(),
    uploadMbps: integer("upload_mbps").notNull(),
    price: integer("price").notNull(),
    billingCycle: text("billing_cycle", { enum: ["monthly", "prepaid"] })
      .notNull()
      .default("monthly"),
    mikrotikProfile: text("mikrotik_profile"),
    status: text("status", { enum: ["active", "inactive"] })
      .notNull()
      .default("active"),
    ...timestamps,
  },
  (table) => [
    index("plans_organization_idx").on(table.organizationId),
  ],
);

export const routers = sqliteTable(
  "routers",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    host: text("host").notNull(),
    apiPort: integer("api_port").notNull().default(8728),
    username: text("username").notNull(),
    encryptedPassword: text("encrypted_password").notNull(),
    location: text("location"),
    status: text("status", { enum: ["online", "offline", "unknown"] })
      .notNull()
      .default("unknown"),
    lastSeenAt: integer("last_seen_at", { mode: "timestamp" }),
    ...timestamps,
  },
  (table) => [
    index("routers_organization_idx").on(table.organizationId),
  ],
);

export const customers = sqliteTable(
  "customers",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    planId: text("plan_id").references(() => internetPlans.id),
    routerId: text("router_id").references(() => routers.id),
    customerNumber: text("customer_number").notNull(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone").notNull(),
    address: text("address").notNull(),
    area: text("area"),
    latitude: real("latitude"),
    longitude: real("longitude"),
    pppoeUsername: text("pppoe_username"),
    pppoePasswordEncrypted: text("pppoe_password_encrypted"),
    dueDay: integer("due_day").notNull().default(20),
    status: text("status", {
      enum: ["pending", "active", "isolated", "terminated"],
    })
      .notNull()
      .default("pending"),
    installedAt: integer("installed_at", { mode: "timestamp" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("customers_org_number_unique").on(
      table.organizationId,
      table.customerNumber,
    ),
    index("customers_status_idx").on(table.organizationId, table.status),
  ],
);

export const invoices = sqliteTable(
  "invoices",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    customerId: text("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "cascade" }),
    invoiceNumber: text("invoice_number").notNull(),
    period: text("period").notNull(),
    subtotal: integer("subtotal").notNull(),
    discount: integer("discount").notNull().default(0),
    penalty: integer("penalty").notNull().default(0),
    total: integer("total").notNull(),
    dueAt: integer("due_at", { mode: "timestamp" }).notNull(),
    paidAt: integer("paid_at", { mode: "timestamp" }),
    status: text("status", {
      enum: ["draft", "pending", "paid", "overdue", "cancelled"],
    })
      .notNull()
      .default("pending"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("invoices_org_number_unique").on(
      table.organizationId,
      table.invoiceNumber,
    ),
    index("invoices_customer_idx").on(table.customerId),
    index("invoices_status_idx").on(table.organizationId, table.status),
  ],
);

export const payments = sqliteTable(
  "payments",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    invoiceId: text("invoice_id")
      .notNull()
      .references(() => invoices.id, { onDelete: "cascade" }),
    reference: text("reference").notNull(),
    method: text("method", {
      enum: ["qris", "virtual_account", "ewallet", "cash", "transfer"],
    }).notNull(),
    amount: integer("amount").notNull(),
    provider: text("provider"),
    providerPayload: text("provider_payload"),
    status: text("status", {
      enum: ["pending", "paid", "failed", "refunded"],
    })
      .notNull()
      .default("pending"),
    paidAt: integer("paid_at", { mode: "timestamp" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("payments_reference_unique").on(table.reference),
    index("payments_invoice_idx").on(table.invoiceId),
  ],
);

export const tickets = sqliteTable(
  "tickets",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    customerId: text("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "cascade" }),
    technicianId: text("technician_id").references(() => users.id),
    ticketNumber: text("ticket_number").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    priority: text("priority", {
      enum: ["low", "medium", "high", "critical"],
    })
      .notNull()
      .default("medium"),
    status: text("status", {
      enum: ["open", "assigned", "in_progress", "resolved", "closed"],
    })
      .notNull()
      .default("open"),
    resolvedAt: integer("resolved_at", { mode: "timestamp" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("tickets_org_number_unique").on(
      table.organizationId,
      table.ticketNumber,
    ),
    index("tickets_status_idx").on(table.organizationId, table.status),
  ],
);

export const inventoryItems = sqliteTable(
  "inventory_items",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    sku: text("sku").notNull(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    unit: text("unit").notNull().default("unit"),
    quantity: integer("quantity").notNull().default(0),
    minimumStock: integer("minimum_stock").notNull().default(0),
    purchasePrice: integer("purchase_price").notNull().default(0),
    location: text("location"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("inventory_org_sku_unique").on(
      table.organizationId,
      table.sku,
    ),
  ],
);
