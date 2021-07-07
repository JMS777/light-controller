import { InterpolateHsv, InterpolateHsvLong, InterpolateHsvShort, InterpolateRgb } from "../../helpers/GradientHelper";
import Effect, { ExternalEffect } from "../../models/Effects/Effect";
import Hsv from "../../models/Hsv";
import Rgb from "../../models/Rgb";
import { IAddressableRgbLight as IAddressableRgbLight } from "../Abstract/IVirtualLights";
import WS2812B from "../Physical/WS2812B";
import RgbLight from "./RgbLight";
import colorsys from 'colorsys';
import { Animations } from "src/models/Animations";
import fs from "fs";
import path from "path";

export default class AddressableRgbStrip extends RgbLight implements IAddressableRgbLight {

    physical: WS2812B;

    pixelCount = 0;
    pixels: Rgb[] = [];

    effects: string[] = [];

    usingPixels = false;

    presetPath!: string;

    constructor(id: number, physical: WS2812B) {
        super(id, physical);

        this.physical = physical;
        this.initializePresets();
    }

    initializePresets(): void {
        this.presetPath = path.join("presets", this.id.toString());
        fs.mkdir("presets", err => {
            if (err) console.log(err);
        });
        fs.mkdir(this.presetPath, err => {
            if (err) console.log(err);
        });
    }

    setColour(hue?: number, saturation?: number, value?: number): void {
        this.usingPixels = false;
        super.setColour(hue, saturation, value);
    }

    async setColourSmooth(hue?: number, saturation?: number, value?: number): Promise<void> {
        this.usingPixels = false;
        super.setColourSmooth(hue, saturation, value);
    }


    setPixels(pixels: Rgb[]): void {
        if (this.pixels.length != this.pixelCount) {
            this.pixels = new Array<Rgb>(this.pixelCount);
            for (let i = 0; i < this.pixels.length; i++) {
                this.pixels[i] = new Rgb(0, 0, 0);
            }
        }

        for (let i = 0; i < Math.min(this.pixelCount, pixels.length); i++) {
            this.pixels[i] = pixels[i];
        }

        this.usingPixels = true;

        this.physical.setPixels(this.pixels);
    }

    initialise(): void {
        super.initialise();

        this.pixelCount = this.physical.pixelCount;
        this.pixels = new Array<Rgb>(this.pixelCount);
        for (let i = 0; i < this.pixels.length; i++) {
            this.pixels[i] = new Rgb(0, 0, 0);
        }

        this.effects = this.physical.effects;
    }

    getProperties(): unknown {
        const properties = super.getProperties();
        properties.pixelCount = this.pixelCount;
        properties.pixels = this.pixels;

        return properties;
    }

    getEffects(): Effect[] {
        const effects = super.getEffects();

        this.effects.map(e => effects.push(new ExternalEffect(e)));

        return effects;
    }

    setEffect(effectName: string): boolean {
        this.physical.setEffect("no effect");
        if (super.setEffect(effectName)) {
            return true;
        }

        this.physical.setEffect(effectName);
        return true;
    }

    setColours(colours: Hsv[], interpolationType = "rgb"): void {
        if (colours.length > 1) {
            this.pixels = new Array<Rgb>(this.pixelCount);

            for (let i = 0; i < this.pixels.length; i++) {
                const t = i / (this.pixels.length);
                const hsv = this.interpolate(colours, t, interpolationType);
                const rgb = colorsys.hsv2Rgb(hsv.h, hsv.s, hsv.v);
                // console.log(`Pixel: ${i}, t: ${t}, hsv: {${hsv.h}, ${hsv.s}, ${hsv.v}}, rgb: {${rgb.r}, ${rgb.g}, ${rgb.b}}`);

                this.pixels[i] = rgb;
            }

            this.usingPixels = true;
            this.physical.setPixels(this.pixels);
        }
        else if (colours.length == 1) {
            this.setColour(colours[0].h, colours[0].s, colours[0].v);
        }
    }

    interpolate(colours: Hsv[], t: number, interpolationType: string): Hsv {
        switch (interpolationType) {
            case "rgb":
                return InterpolateRgb(colours, t);
            case "hsv":
                return InterpolateHsv(colours, t);
            case "hsv-short":
                return InterpolateHsvShort(colours, t);
            case "hsv-long":
                return InterpolateHsvLong(colours, t);
            default:
                return InterpolateRgb(colours, t);
        }
    }

    setAnimation(animation: Animations): void {
        throw new Error("Method not implemented.");
    }

    updateChannels(): void {
        if (this.usingPixels) {
            const pixels = new Array<Rgb>(this.pixelCount);
            for (let i = 0; i < this.pixels.length; i++) {
                pixels[i] = new Rgb(
                    Math.round(this.pixels[i].r * (this.brightness / 100) * this.stateTransition),
                    Math.round(this.pixels[i].g * (this.brightness / 100) * this.stateTransition),
                    Math.round(this.pixels[i].b * (this.brightness / 100) * this.stateTransition));
            }

            this.physical.setPixels(pixels);
        }
        else {
            const properties = {
                hue: this.hue,
                saturation: this.saturation,
                brightness: this.brightness * this.stateTransition
            };

            this.physical.update(properties);
        }
    }

    getPresets(): string[] {
        const files = fs.readdirSync(this.presetPath);
        for (let i = 0; i < files.length; i++) {
            files[i] = files[i].replace(".json", "");
        }

        return files;
    }

    savePreset(name: string): void {
        if (name == null || name == "") return;

        const filename = path.join(this.presetPath, name + ".json");
        fs.writeFile(filename, JSON.stringify(this.pixels), err => console.log(err));
    }

    loadPreset(name: string): void {
        if (name == null || name == "") return;

        const filename = path.join(this.presetPath, name + ".json");
        fs.readFile(filename, (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setPixels(JSON.parse(data.toString()));

            }
        });
    }

    deletePreset(name: string): void {
        if (name == null || name == "") return;

        const filename = path.join(this.presetPath, name + ".json");
        fs.rm(filename, err => console.log(err));
    }
}