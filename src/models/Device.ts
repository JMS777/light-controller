import { DeviceType } from "../helpers/DeviceType";

export default class Device {
    id!: number;
    type!: DeviceType;
    physicalInfo!: any
}