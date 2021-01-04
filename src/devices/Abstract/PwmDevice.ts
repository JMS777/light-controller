import GpioService from "../../services/GpioService";
import IPinService from "../../services/IPinService";
import Dictionary from "../../models/IDictionary";
import Device from "./Device";

export default abstract class PwmDevice extends Device {
    
    protected channels: Dictionary<Channel> = {};

    protected _pinService: IPinService;

    constructor(id: number) {
        super(id);
        this._pinService = GpioService.getInstance();
        this.id = id;
    }

    abstract updateChannels(): void;

    initialise() {
        this.updateChannels();
    }

    protected writePins(): void {
        Object.keys(this.channels).map(k => {
            const c = this.channels[k] as Channel;
            this._pinService.setPin(c.pin, c.value);
        });
    }

    getProperties(): any {
        const properties = super.getProperties();

        properties.channels = this.channels;

        return properties;
    }
}

export class Channel {
    pin: number;
    value: number;

    constructor(pin: number) {
        this.pin = pin;
        this.value = 0;
    }

    setValue(value: number) {
        if (value > 1 || value < 0) {
            console.log(`Invalid channel value: ${value}. Value should be between 0 and 1.`);
            return;
        }

        this.value = value;
    }
}