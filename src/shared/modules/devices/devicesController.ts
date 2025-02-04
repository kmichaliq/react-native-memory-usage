import { Device } from "@/src/shared/modules/devices/devicesSchema";
import { DevicesService } from "@/src/shared/modules/devices/devicesService";
import { v4 as uuidv4 } from "uuid";

export type DevicesController = ReturnType<typeof createDevicesController>;

export const createDevicesController = (devicesService: DevicesService) => {
  const query = {
    getDevices: async () => {
      try {
        const devices = await devicesService.query.getDevices();

        return devices;
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    },
    getDeviceWithRandomAttributes: (uuid: string) => {
      try {
        const device = devicesService.query.getDeviceWithRandomAttributes(uuid);

        return device;
      } catch (error) {
        console.error("Error fetching device with random attributes:", error);
      }
    },
  };

  const mutation = {
    upsertDevice: async (device: Device) => {
      try {
        const result = await devicesService.mutation.upsertDevice(device);

        return result;
      } catch (error) {
        console.error("Error upserting device:", error);
      }
    },
    insertRandomDevice: async () => {
      try {
        const uuid = uuidv4();
        const device = await devicesService.query.getDeviceWithRandomAttributes(
          uuid
        );

        await devicesService.mutation.upsertDevice(device);
      } catch (error) {
        console.error("Error upserting generated device:", error);
      }
    },
  };

  return {
    query,
    mutation,
  };
};
