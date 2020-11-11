import { DeviceType } from "../helpers/DeviceType";
import IDictionary from "./IDictionary";

export default class Device {
    id!: number;
    type!: DeviceType;
    pins!: IDictionary<number>
}