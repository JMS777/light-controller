import Device from "../devices/Abstract/Device";
import RgbLight from "../devices/RgbLight";
import RgbLightGroup from "../devices/RgbLightGroup";
import { DeviceType } from "./DeviceType";

export default class GroupFactory {
    static Create(type: DeviceType, id: number, devices: Device[]): Device | undefined {
        switch (type) {
            case DeviceType.RgbLightGroup:
                return new RgbLightGroup(id, devices as RgbLight[]);

            default:
                console.log(`Group type '${type}' is unsupported.`);
                return undefined;
        }
    }
}