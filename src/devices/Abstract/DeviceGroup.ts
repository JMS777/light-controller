import Devices from "../../models/Devices";
import Effect from "../../models/Effects/Effect";
import Device from "./Device";

export default abstract class DeviceGroup<T extends Device> extends Device {
    devices: T[];

    constructor(id: number, devices: T[]) {
        super(id);

        this.devices = devices;
    }

    getProperties(): any {
        const properties = super.getProperties();
        properties.devices = this.devices.map(d => d.getProperties());

        return properties;
    }

    public getEffects(): Effect[] {
        return this.devices[0].getEffects();
    }

    public setEffect(effectName: string): void {
        this.devices.map(d => d.setEffect(effectName));
    }

    public stopEffect(): void {
        this.devices.map(d => d.stopEffect());
    }
}