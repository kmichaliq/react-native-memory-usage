import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "@/src/shared/lib/drizzle/schema";

export type DrizzleDb = ExpoSQLiteDatabase<typeof schema>;

let dbInstance: DrizzleDb | null = null;
let expoDbInstance: ReturnType<typeof openDatabaseSync> | null = null;

export const getDbInstance = () => {
  if (!dbInstance || !expoDbInstance) {
    expoDbInstance = openDatabaseSync("app.db");
    dbInstance = drizzle(expoDbInstance, { schema });
  }
  return { db: dbInstance, expoDb: expoDbInstance };
};
