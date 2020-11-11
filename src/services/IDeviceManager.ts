import Device from "../devices/Device";

export default interface IDeviceManager {
    devices: Device[];
    loadDevices(callback?: (devices: Device[]) => any): void;
    getDevice<T extends Device>(id: number): T;
}