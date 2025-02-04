import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const devices = sqliteTable("devices", {
  uuid: text("uuid").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),

  // —————————————————————————————————————————————

  attribute1: integer("attribute1"),
  attribute2: integer("attribute2"),
  attribute3: integer("attribute3"),
  attribute4: integer("attribute4"),
  attribute5: integer("attribute5"),
  attribute6: integer("attribute6"),
  attribute7: integer("attribute7"),
  attribute8: integer("attribute8"),
  attribute9: integer("attribute9"),
  attribute10: integer("attribute10"),

  // —————————————————————————————————————————————

  attribute11: integer("attribute12", { mode: "boolean" }),
  attribute12: integer("attribute12", { mode: "boolean" }),
  attribute13: integer("attribute13", { mode: "boolean" }),
  attribute14: integer("attribute14", { mode: "boolean" }),
  attribute15: integer("attribute15", { mode: "boolean" }),
  attribute16: integer("attribute16", { mode: "boolean" }),
  attribute17: integer("attribute17", { mode: "boolean" }),
  attribute18: integer("attribute18", { mode: "boolean" }),
  attribute19: integer("attribute19", { mode: "boolean" }),
  attribute20: integer("attribute20", { mode: "boolean" }),

  // —————————————————————————————————————————————
  // Timestamps

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type InsertDevice = InferInsertModel<typeof devices>;
export type Device = InferSelectModel<typeof devices>;
