declare module 'colorsys' {
    export function hsv2Rgb(h: number, s: number, v: number): ColorRgb;
}

class ColorRgb {
    r: number;
    g: number;
    b: number;
}