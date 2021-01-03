import { DeviceType } from "../helpers/DeviceType";
import Channel from "./Channel";
import Device from "./Device";

export default class Light extends Device {
    type: DeviceType = DeviceType.BasicLight;
    state = 0;
    currentState = 0;

    constructor(id: number, pin: number) {
        super(id);
        this.channels.one = new Channel(pin);
    }

    getProperties() {
        const properties: any = super.getProperties();
        properties.state = this.state > 0;

        return properties;
    }

    setState(state: boolean) {
        this.state = state ? 1 : 0;
        this.currentState = this.state;
        this.updateChannels();
    }

    updateChannels() {
        const value = this.currentState;
        this.channels.one.setValue(value);
        this.writePins();
    }
}