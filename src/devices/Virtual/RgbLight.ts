import DimmableLight from "./DimmableLight";
import { DeviceType } from "../../helpers/DeviceType";
import CancellationToken from "../../helpers/CancellationToken";
import * as hsvHelper from "../../helpers/HsvHelper";
import Effect from "../../models/Effects/Effect";
import { delay } from "../../helpers/AsyncHelpers";
import { Rainbow } from "../../models/Effects/LightingEffects";
import { IRgbLight } from "../Abstract/IVirtualLights";
import { constrain } from "../../helpers/MathHelper";
import { IPhysicalDevice } from "../Abstract/IPhysicalDevice";

export default class RgbLight extends DimmableLight implements IRgbLight {
    type: DeviceType = DeviceType.RgbLight;
    hue = 30;
    saturation = 100;

    private currentColourTask: Promise<void> | undefined;
    private currentColourToken: CancellationToken | undefined;

    constructor(id: number, physical: IPhysicalDevice) {
        super(id, physical);
    }

    setColour(hue?: number, saturation?: number, value?: number): void {
        if (hue != undefined && (hue < 0 || hue > 359)) {
            console.warn("Hue must be between 0 and 360.");
            hue = constrain(hue, 0, 359);
        }

        if (saturation != undefined && (saturation < 0 || saturation > 100)) {
            console.warn("Saturation must be between 0 and 100.");
            saturation = constrain(saturation, 0, 100);
        }

        if (value != undefined && (value < 0 || value > 100)) {
            console.warn("Value must be between 0 and 100.");
            value = constrain(value, 0, 100);
        }

        if (hue != undefined)
            this.hue = hue;
        if (saturation != undefined)
            this.saturation = saturation;
        if (value != undefined)
            this.brightness = value;
        
        this.updateChannels();
    }

    async setColourSmooth(hue?: number, saturation?: number, value?: number): Promise<void> {
        if (hue != undefined && (hue < 0 || hue > 359)) {
            console.warn("Hue must be between 0 and 360.");
            hue = constrain(hue, 0, 359);
        }

        if (saturation != undefined && (saturation < 0 || saturation > 100)) {
            console.warn("Saturation must be between 0 and 100.");
            saturation = constrain(saturation, 0, 100);
        }

        if (value != undefined && (value < 0 || value > 100)) {
            console.warn("Value must be between 0 and 100.");
            value = constrain(value, 0, 100);
        }

        if (this._currentEffect?.affectsColour) {
            await this._currentEffect.cancel(true);
        }

        if (this.currentColourTask && this.currentColourToken) {
            this.currentColourToken?.cancel(true);
            await this.currentColourTask;
        }

        if (value != undefined)
            this.setBrightnessSmooth(value);

        this.currentColourToken = new CancellationToken();
        this.currentColourTask = this.setColourAsync(hue ?? this.hue, saturation ?? this.saturation, this.currentColourToken);
        await this.currentColourTask;
    }

    async setColourAsync(targetHue: number, targetSaturation: number, token: CancellationToken): Promise<void> {
        let aHsv = { h: this.hue, s: this.saturation };
        let bHsv = { h: targetHue, s: targetSaturation };

        for (let i = 1; i <= this.STEPS; i++) {
            if (token.isCancellationRequested) {
                break;
            }

            let newHsv = hsvHelper.HsvLerp(aHsv, bHsv, i / this.STEPS);

            this.hue = newHsv.h
            this.saturation = newHsv.s

            this.updateChannels();
            await delay(this.FADE_TIME / this.STEPS);
        }
    }

    public getEffects(): Effect[] {
        let effects = super.getEffects();
        effects.push(
            new Rainbow()
        );

        return effects;
    }

    setEffect(effectName: string): boolean {
        let effect = this.CreateEffect(effectName);

        if (effect?.affectsColour ?? true) {
            this.currentColourToken?.cancel();
        }

        return super.setEffect(effectName);
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
        const properties = {
            hue: this.hue,
            saturation: this.saturation,
            brightness: this.brightness * this.stateTransition
        };

        this.physical.update(properties);

        // const rgb = colorsys.hsv2Rgb(this.hue, this.saturation, this.brightness);
        // // console.log(`[Device ${this.id}] State: ${this.currentState}:${this.state}, Hue: ${this.currentHue}:${this.hue}, Saturation: ${this.currentSaturation}:${this.saturation}, Brightness:${this.currentBrightness}:${this.brightness}`);

        // const rValue = this.stateTransition * rgb.r / 255;
        // const gValue = this.stateTransition * rgb.g / 255;
        // const bValue = this.stateTransition * rgb.b / 255;

        // this.channels.one.setValue(rValue);
        // this.channels.two.setValue(gValue);
        // this.channels.three.setValue(bValue);

        // this.writePins();
    }
}