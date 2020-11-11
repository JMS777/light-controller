import GpioService from "../services/GpioService";
import IPinService from "../services/IPinService";
import Channel from "./Channel";
import Dictionary from "../models/IDictionary";
import { DeviceType } from "../helpers/DeviceType";

export default abstract class Device {
    public id: number;
    abstract type: DeviceType;
    protected channels: Dictionary<Channel> = {};

    protected _pinService: IPinService;

    constructor(id: number) {
        this._pinService = GpioService.getInstance();
        this.id = id;
    }

    abstract onUpdate(): void;
    getProperties(): any {
        return {
            id: this.id,
            type: this.type,
            channels: this.channels
        };
    }

    protected writePins(): void {
        Object.keys(this.channels).map(k => {
            const c = this.channels[k] as Channel;
            this._pinService.setPin(c.pin, c.value);
        });
    }
}