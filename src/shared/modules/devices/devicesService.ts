import { DrizzleDb } from "@/src/shared/lib/drizzle";
import { Device, devices } from "@/src/shared/modules/devices/devicesSchema";
import { random } from "@/src/shared/utils/random";
import { DateTime } from "luxon";

export type DevicesService = ReturnType<typeof createDevicesService>;

export const createDevicesService = (db: DrizzleDb) => {
  const query = {
    getDevices: async () => {
      const result = await db.select().from(devices).execute();

      console.log(`All devices fetched successfully`);

      return result;
    },
    getDeviceWithRandomAttributes: async (uuid: string) => {
      const randomDevice: Device = {
        uuid: uuid,
        name: `Random device ${uuid}`,
        description: `Random device ${uuid} description`,
        attribute1: random.int(0, 100),
        attribute2: random.int(0, 100),
        attribute3: random.int(0, 100),
        attribute4: random.int(0, 100),
        attribute5: random.int(0, 100),
        attribute6: random.int(0, 100),
        attribute7: random.int(0, 100),
        attribute8: random.int(0, 100),
        attribute9: random.int(0, 100),
        attribute10: random.int(0, 100),
        attribute11: random.boolean(),
        attribute12: random.boolean(),
        attribute13: random.boolean(),
        attribute14: random.boolean(),
        attribute15: random.boolean(),
        attribute16: random.boolean(),
        attribute17: random.boolean(),
        attribute18: random.boolean(),
        attribute19: random.boolean(),
        attribute20: random.boolean(),
        createdAt: DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
        updatedAt: DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
      };

      console.log(`Generated random attributes for device with uuid "${uuid}"`);

      return randomDevice;
    },
  };

  const mutation = {
    upsertDevice: async (device: Device) => {
      const result = await db
        .insert(devices)
        .values(device)
        .onConflictDoUpdate({
          target: devices.uuid,
          set: device,
        })
        .execute();

      console.log(`Device with uuid "${device.uuid}" upserted successfully`);
      return result;
    },
  };

  return {
    query,
    mutation,
  };
};
