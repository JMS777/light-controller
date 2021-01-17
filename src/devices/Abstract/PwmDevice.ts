import GpioService from "../../services/GpioService";
import IPinService from "../../services/IPinService";
import Dictionary from "../../models/IDictionary";
import { IPhysicalDevice } from "./IPhysicalDevice";

export default abstract class PwmDevice implements IPhysicalDevice {
    
    protected channels: Dictionary<Channel> = {};

    protected _pinService: IPinService;

    constructor(pins: any) {
        this._pinService = GpioService.getInstance();

        Object.keys(pins).map(k => {
            const pin = pins[k] as number;
            this.channels[k] = new Channel(pin);
        });
    }

    abstract update(properties: any): void;

    protected writePins(): void {
        Object.keys(this.channels).map(k => {
            const c = this.channels[k] as Channel;
            this._pinService.setPin(c.pin, c.value);
        });
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