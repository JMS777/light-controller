import { DeviceType } from "../helpers/DeviceType";
import { ILight } from "./Abstract/ILights";
import PwmDevice, { Channel } from "./Abstract/PwmDevice";

export default class Light extends PwmDevice implements ILight {
    type: DeviceType = DeviceType.BasicLight;
    state = false;

    constructor(id: number, pin: number) {
        super(id);
        this.channels.one = new Channel(pin);
    }

    getProperties() {
        const properties: any = super.getProperties();
        properties.state = this.state;

        return properties;
    }

    setState(state: boolean): void {
        this.state = state;
        this.updateChannels();
    }

    updateChannels() {
        const value = this.state;
        this.channels.one.setValue(value ? 1 : 0);
        this.writePins();
    }
}