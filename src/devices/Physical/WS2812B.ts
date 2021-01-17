import colorsys from 'colorsys';
import Rgb from '../../models/Rgb';
import MicroserviceDevice from "../Abstract/MicroserviceDevice";

export default class WS2812B extends MicroserviceDevice {

    update(properties: any): void {
        const rgb = colorsys.hsv2Rgb(properties.hue, properties.saturation, properties.brightness);

        this.client.invoke("SetColour", rgb);
    }

    setEffect(effectName: string): void {
        this.client.invoke("SetEffect", effectName);
    }

    getPixelCount(callback: (pixels: number) => void): void {
        this.client.invoke("GetPixelCount", (error: any, res: any, more: any) => {
            if (callback)
                callback(res);
        });
    }

    getEffects(callback: (effects: string[]) => void): void {
        this.client.invoke("GetEffects", (error: any, res: any, more: any) => {
            if (callback)
                callback(res);
        });
    }

    setPixels(pixels: Rgb[]) {
        this.client.invoke("SetPixels", pixels);
    }
}