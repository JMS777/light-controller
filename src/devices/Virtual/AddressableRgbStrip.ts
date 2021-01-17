import Effect, { ExternalEffect } from "../../models/Effects/Effect";
import Rgb from "../../models/Rgb";
import { IAddressableRgbLight as IAddressableRgbLight } from "../Abstract/IVirtualLights";
import WS2812B from "../Physical/WS2812B";
import RgbLight from "./RgbLight";

export default class AddressableRgbStrip extends RgbLight implements IAddressableRgbLight {

    physical: WS2812B;

    pixelCount: number = 0;
    pixels: Rgb[] = [];

    effects: string[] = [];

    constructor(id: number, physical: WS2812B) {
        super(id, physical)

        this.physical = physical;
    }

    setPixels(pixels: Rgb[]): void {
        if (this.pixels.length != this.pixelCount) {
            this.pixels = new Array<Rgb>(this.pixelCount)
            for (let i = 0; i < this.pixels.length; i++) {
                this.pixels[i] = new Rgb(0, 0, 0);
            }
        }

        for (let i = 0; i < Math.min(this.pixelCount, pixels.length); i++) {
            this.pixels[i] = pixels[i]
        }

        this.physical.setPixels(this.pixels);
    }

    initialise(): void {
        super.initialise();

        this.physical.getPixelCount((pixels: number) => {
            this.pixelCount = pixels;
            this.pixels = new Array<Rgb>(this.pixelCount);
            for (let i = 0; i < this.pixels.length; i++) {
                this.pixels[i] = new Rgb(0, 0, 0);
            }
        });

        this.physical.getEffects((effects: string[]) => {
            this.effects = effects;
        });
    }

    getProperties(): any {
        const properties = super.getProperties();
        properties.pixelCount = this.pixelCount;
        properties.pixels = this.pixels;

        return properties;
    }

    getEffects(): Effect[] {
        const effects = super.getEffects();

        this.effects.map(e => effects.push(new ExternalEffect(e)));

        return effects
    }

    setEffect(effectName: string): boolean {
        this.physical.setEffect("no effect");
        if (super.setEffect(effectName)) {
            return true;
        }

        this.physical.setEffect(effectName);
        return true;
    }
}