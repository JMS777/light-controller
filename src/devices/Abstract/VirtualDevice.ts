import { DeviceType } from "../../helpers/DeviceType";
import Effect, { NoEffect } from "../../models/Effects/Effect";

export default abstract class VirtualDevice {
    public id: number;
    abstract type: DeviceType;
    
    protected _currentEffect: Effect | undefined;

    constructor(id: number) {
        this.id = id;
    }

    public abstract initialise(): void;

    public getEffects(): Effect[] {
        return [new NoEffect()];
    }

    public setEffect(effectName: string): boolean {
        let effect = this.CreateEffect(effectName);

        if (effect) {
            if (this._currentEffect) {
                this._currentEffect.cancel(undefined,
                    () => effect.execute(this)
                );
            } else {
                effect.execute(this);
            }

            this._currentEffect = effect;
            return true;
        } else {
            console.warn(`Effect '${effectName}' not found`);
            return false;
        }
    }

    public stopEffect(): void {
        this._currentEffect?.cancel();
    }

    protected CreateEffect(effectName: string) {
        return this.getEffects().filter(eff => eff.id == effectName)[0];
    }

    getProperties(): any {
        return {
            id: this.id,
            type: this.type
        };
    }
}