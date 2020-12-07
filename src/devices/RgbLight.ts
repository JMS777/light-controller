import Channel from "./Channel";
import DimmableLight from "./DimmableLight";
import colorsys from 'colorsys';
import { DeviceType } from "../helpers/DeviceType";
import CancellationToken from "../helpers/CancellationToken";

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

    setColour(hue: number, saturation: number) {
        if (hue < 0 || hue > 360) {
            console.log("Hue must be between 0 and 360.");
            return;
        }

        if (saturation < 0 || saturation > 100) {
            console.log("Saturation must be between 0 and 100.");
            return;
        }

        this.hue = hue;
        this.saturation = saturation;

        if (this.currentColourTask && this.currentColourToken) {
            this.currentColourToken?.cancel();
        }
        
        this.currentColourToken = new CancellationToken();
        this.currentColourTask = this.setColourAsync(this.currentColourToken);
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
        let dHue = this.hue - this.currentHue;
        dHue += ((Math.abs(dHue) > 180) ? ((dHue < 0) ? 360 : -360) : 0);
        dHue /= this.STEPS;

        let dSaturation = (this.saturation - this.currentSaturation) / this.STEPS;

        for (let i = 0; i < this.STEPS; i++) {
            if (token.isCancellationRequested) {
                break;
            }

            this.currentHue = (this.currentHue + dHue + 360) % 360
            this.currentSaturation = this.constrain(this.currentSaturation + dSaturation, 0, 100);
            this.updateChannels();
            await this.delay(this.FADE_TIME / this.STEPS);
        }
    }
}