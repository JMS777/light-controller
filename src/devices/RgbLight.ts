import Channel from "./Channel";
import DimmableLight from "./DimmableLight";
import colorsys from 'colorsys';
import { DeviceType } from "../helpers/DeviceType";
import CancellationToken from "../helpers/CancellationToken";
import * as hsvHelper from "../helpers/HsvHelper";
import Effect from "../models/Effects/Effect";
import { delay } from "../helpers/AsyncHelpers";
import { Rainbow } from "../models/Effects/LightingEffects";

export default class RgbLight extends DimmableLight {
    type: DeviceType = DeviceType.RgbLight;
    hue = 0;
    currentHue = 0;
    saturation = 0;
    currentSaturation = 0;

    private currentColourTask: Promise<void> | undefined;
    private currentColourToken: CancellationToken | undefined;

    constructor(id: number, pinR: number, pinG: number, pinB: number) {
        super(id, pinR);
        this.channels.two = new Channel(pinG);
        this.channels.three = new Channel(pinB);
    }

    setColour(hue: number, saturation: number, fade: boolean = false, calledFromEffect: boolean = false): Promise<void> {
        if (hue < 0 || hue > 360) {
            console.log("Hue must be between 0 and 360.");
            return Promise.resolve();
        }

        if (saturation < 0 || saturation > 100) {
            console.log("Saturation must be between 0 and 100.");
            return Promise.resolve();
        }

        if (this._currentEffect?.affectsColour && !calledFromEffect) {
            this._currentEffect.cancel(true);
        }

        this.hue = hue;
        this.saturation = saturation;

        if (this.currentColourTask && this.currentColourToken) {
            this.currentColourToken?.cancel();
        }

        if (fade) {
            this.currentColourToken = new CancellationToken();
            this.currentColourTask = this.setColourAsync(this.currentColourToken);
            return this.currentColourTask;
        } else {
            this.currentHue = this.hue;
            this.currentSaturation = this.saturation;
            this.updateChannels();
            return Promise.resolve();
        }
    }

    public getEffects(): Effect[] {
        let effects = super.getEffects();
        effects.push(
            new Rainbow()
        );

        return effects;
    }

    setEffect(effect: Effect): void {
        if (effect.affectsColour) {
            this.currentColourToken?.cancel();
        }

        super.setEffect(effect);
    }

    getProperties() {
        const properties: any = super.getProperties();
        properties.hsv = {
            h: this.hue,
            s: this.saturation,
            v: this.brightness
        };

        return properties;
    }

    updateChannels() {
        const rgb = colorsys.hsv2Rgb(this.currentHue, this.currentSaturation, this.currentBrightness);
        // console.log(`[Device ${this.id}] State: ${this.currentState}:${this.state}, Hue: ${this.currentHue}:${this.hue}, Saturation: ${this.currentSaturation}:${this.saturation}, Brightness:${this.currentBrightness}:${this.brightness}`);

        const rValue = this.currentState * rgb.r / 255;
        const gValue = this.currentState * rgb.g / 255;
        const bValue = this.currentState * rgb.b / 255;

        this.channels.one.setValue(rValue);
        this.channels.two.setValue(gValue);
        this.channels.three.setValue(bValue);

        this.writePins();
    }

    async setColourAsync(token: CancellationToken): Promise<void> {
        let aHsv = { h: this.currentHue, s: this.currentSaturation };
        let bHsv = { h: this.hue, s: this.saturation };

        for (let i = 1; i <= this.STEPS; i++) {
            if (token.isCancellationRequested) {
                break;
            }

            let newHsv = hsvHelper.HsvLerp(aHsv, bHsv, i / this.STEPS);

            this.currentHue = newHsv.h
            this.currentSaturation = newHsv.s

            this.updateChannels();
            await delay(this.FADE_TIME / this.STEPS);
        }
    }
}