import colorsys from 'colorsys';
import Rgb from '../../models/Rgb';
import MicroserviceDevice from "../Abstract/MicroserviceDevice";

export default class WS2812B extends MicroserviceDevice {
    pixelCount: number;
    effects: string[];

    constructor(dataPin: number, pixelCount: number) {
        super('processes/ws2812b-controller.py', [dataPin.toString(), pixelCount.toString()]);
        
        if (!(dataPin in [10, 12, 18, 21]))
            console.error('WS2812B lights must be connected via one of the following pins, 10, 12, 18, 21. Please update the "pin" value in devices.json as necessary.');

        this.pixelCount = pixelCount;

        this.effects = ["Rainbow Wheel", "Stack"];
    }
    update(properties: any): void {
        const rgb = colorsys.hsv2Rgb(properties.hue, properties.saturation, properties.brightness);

        this.command("SetColour", { colour: rgb }, undefined);
    }

    setEffect(effectName: string): void {
        this.command("SetEffect", { effect: effectName }, undefined);
    }

    getPixelCount(callback: (pixels: number) => void): void {
        this.command("GetPixelCount", null, callback);
    }

    setPixels(pixels: Rgb[]): void {
        this.command("SetPixels", { pixels: pixels }, undefined);
    }
}