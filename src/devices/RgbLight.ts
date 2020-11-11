import Channel from "./Channel";
import DimmableLight from "./DimmableLight";
import colorsys from 'colorsys';
import { DeviceType } from "../helpers/DeviceType";

export default class RgbLight extends DimmableLight {
    type: DeviceType = DeviceType.RgbLight;
    hue = 0;
    saturation = 0;

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
        this.onUpdate();
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

    onUpdate() {
        const rgb = colorsys.hsv2Rgb(this.hue, this.saturation, this.brightness);
        // console.log(`Hue: ${this.hue}, Saturation: ${this.saturation}, Brightness:${this.brightness}`);        

        const rValue = this.state ? rgb.r / 255 : 0;
        const gValue = this.state ? rgb.g / 255 : 0;
        const bValue = this.state ? rgb.b / 255: 0;

        this.channels.one.setValue(rValue);
        this.channels.two.setValue(gValue);
        this.channels.three.setValue(bValue);
        
        this.writePins();
    }
}