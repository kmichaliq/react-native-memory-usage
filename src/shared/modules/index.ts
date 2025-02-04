import { getDbInstance } from "@/src/shared/lib/drizzle";
import { createDevicesController } from "@/src/shared/modules/devices/devicesController";
import { createDevicesService } from "@/src/shared/modules/devices/devicesService";

const { db } = getDbInstance();

const devicesService = createDevicesService(db);
const devicesController = createDevicesController(devicesService);

export const app = {
  devices: devicesController,
};
