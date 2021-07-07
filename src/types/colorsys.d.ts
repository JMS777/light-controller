import Rgb from "../models/Rgb";

declare module 'colorsys' {
    export function hsv2Rgb(h: number, s: number, v: number): Rgb;
    export function rgb_to_hsv(rgb: Rgb): Hsv;
}
