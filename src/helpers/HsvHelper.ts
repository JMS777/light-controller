import { Coord } from "./MathHelper";
import * as MathHelper from "./MathHelper";
import Hsv from "../models/Hsv";

/**
 * Linearly interpolates between two colours in the HSV colourspace.
 * @param a First colour
 * @param b Second colour
 * @param t Interpolation factor (0 - 1)
 */
export function HsvLerp(a: Hsv, b: Hsv, t: number): Hsv {
    const aCoords = HueSaturationToCartesian(a);
    const bCoords = HueSaturationToCartesian(b);

    const cCoords = MathHelper.LerpCoord(aCoords, bCoords, t);
    const hsv = CartesianToHueSaturation(cCoords);

    hsv.v = MathHelper.Lerp(a.v, b.v, t);
    return hsv;
}

/**
 * Transforms hue and saturation values into a Cartisian coordinate system. (Imagine an HSV colour picker with a 200x200 grid laid over it with 
 * x/y values ranging from -100 to 100. A saturation of 0 is located at the origin).
 * @param hsv Colour to convert
 */
export function HueSaturationToCartesian(hsv: Hsv): Coord {
    const alpha = MathHelper.DegToRad(hsv.h);
    const x = Math.sin(alpha) * hsv.s;
    const y = Math.cos(alpha) * hsv.s;

    return new Coord(x, y);
}

export function CartesianToHueSaturation(coord: Coord): Hsv {
    let saturation = Math.sqrt((coord.x ** 2) + (coord.y ** 2));

    if (saturation == 0) return new Hsv(0, 0, 0);

    let alpha = Math.asin(coord.x / saturation);

    // alpha will be correct for angles ranging from -90 to 90 degrees (i.e. when y >= 0). This is because 45d and 135d for example have the same value
    // on a sine graph. So when y < 0, we can get the "alternate" angle for the given value by doing 180 - alpha (or -180 - alpha if alpha is negative).
    if (coord.y < 0) {
        alpha = (alpha > 0 ? Math.PI : -Math.PI) - alpha;
    }

    // JavaScript's maths module works in radians, so convert back to degrees (which is typically used for representing HSV).
    let hue = MathHelper.Round(MathHelper.RadToDeg(alpha), 10);

    // Convert any negative angles back to the positive equivalent (i.e -30d would be 330d).
    hue = MathHelper.NormaliseDeg(hue);
    saturation = MathHelper.Round(saturation, 10);

    return new Hsv(hue, saturation, 0);
}