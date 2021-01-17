import Effect from "../../models/Effects/Effect";
import VirtualDevice from "./VirtualDevice";

export default abstract class DeviceGroup<T extends VirtualDevice> extends VirtualDevice {
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

    public setEffect(effectName: string): boolean {
        this.devices.map(d => d.setEffect(effectName));
        return true;
    }

    public stopEffect(): void {
        this.devices.map(d => d.stopEffect());
    }
}