import { DeviceType } from "../helpers/DeviceType";
import Channel from "./Channel";
import Device from "./Device";

export default class Light extends Device {
    type: DeviceType = DeviceType.BasicLight;
    state = false;

    constructor(id: number, pin: number) {
        super(id);
        this.channels.one = new Channel(pin);
    }

    toggle(): boolean {
        this.state = !this.state;

        this.onUpdate();

        return this.state;
    }

    getProperties() {
        const properties: any = super.getProperties();
        properties.state = this.state;

        return properties;
    }

    setState(state: boolean) {
        this.state = state;
        this.onUpdate();
    }

    onUpdate() {
        const value = this.state ? 1 : 0;
        this.channels.one.setValue(value);
        this.writePins();
    }
}