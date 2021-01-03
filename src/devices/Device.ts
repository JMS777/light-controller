import GpioService from "../services/GpioService";
import IPinService from "../services/IPinService";
import Channel from "./Channel";
import Dictionary from "../models/IDictionary";
import { DeviceType } from "../helpers/DeviceType";
import Effect, { NoEffect } from "../models/Effects/Effect";

export default abstract class Device {
    public id: number;
    abstract type: DeviceType;
    protected channels: Dictionary<Channel> = {};

    protected _pinService: IPinService;

    protected _currentEffect: Effect | undefined;

    constructor(id: number) {
        this._pinService = GpioService.getInstance();
        this.id = id;
    }

    abstract updateChannels(): void;

    public getEffects(): Effect[] {
        return [new NoEffect()];
    }

    public setEffect(effect: Effect): void {
        if (this._currentEffect) {
            this._currentEffect.cancel(undefined,
                () => effect.execute(this)
            );
        } else {
            effect.execute(this);
        }

        this._currentEffect = effect;
    }

    public stopEffect(): void {
        this._currentEffect?.cancel();
    }

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

    protected constrain(a: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, a));
    }
}