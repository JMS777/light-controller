import Device from "../devices/Abstract/Device";
import DimmableLight from "../devices/DimmableLight";
import Light from "../devices/Light";
import RgbLight from "../devices/RgbLight";
import { DeviceType } from "./DeviceType";

export default class DeviceFactory {
    static Create(type: DeviceType, id: number, pins: any): Device | undefined {
        switch (type) {
            case DeviceType.BasicLight:
                return new Light(id, pins.main);
            case DeviceType.DimmableLight:
                return new DimmableLight(id, pins.main);
            case DeviceType.RgbLight:
                return new RgbLight(id, pins.red, pins.green, pins.blue);

            default:
                console.log(`Device type '${type}' is unsupported.`);
                return undefined;
        }
    }
}