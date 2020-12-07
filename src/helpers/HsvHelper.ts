export function HsvLerp(a: Hsv, b: Hsv, t: number): Hsv {
    // console.log(`Lerping: Hue=${a.h}, Saturation=${a.s}`)
    let aCoords = HueSaturationToCoords(a);
    let bCoords = HueSaturationToCoords(b);
    // console.log(`A = { x: ${aCoords.x}, y: ${aCoords.y} }, B = { x: ${bCoords.x}, y: ${bCoords.y} }`);

    let cCoords = Lerp(aCoords, bCoords, t);
    // console.log(`x=${cCoords.x}, y=${cCoords.y}`);

    return CoordsToHueSaturation(cCoords);
}

function Lerp(a: Coord, b: Coord, t: number): Coord {
    let dx = b.x - a.x;
    let dy = b.y - a.y;

    let x = a.x + (dx * t);
    let y = a.y + (dy * t);

    return new Coord(x, y);
}

function HueSaturationToCoords(hsv: Hsv): Coord {
    let alpha = DegToRad(hsv.h);
    let x = Math.sin(alpha) * hsv.s;
    let y = Math.cos(alpha) * hsv.s;

    return new Coord(x, y);
}

function CoordsToHueSaturation(coord: Coord): Hsv {
    if (coord.x == 0 && coord.y == 0) {
        return new Hsv(0, 0);
    } else if (coord.x == 0) {
        return new Hsv(coord.y < 0 ? 180 : 0, Math.abs(coord.y));
    } else if (coord.y == 0) {
        return new Hsv(coord.x < 0 ? 270 : 90, Math.abs(coord.x));
    }

    let saturation = Math.round(Math.sqrt(Math.pow(coord.x, 2) + Math.pow(coord.y, 2)));
    let alpha = Math.asin(Math.min(1, Math.max(0, Math.abs(coord.x) / saturation)));

    if (coord.x > 0) {
        if (coord.y < 0) {
            alpha = Math.PI - alpha;
        }
    } else {
        if (coord.y < 0) {
            alpha += Math.PI;
        } else {
            alpha = (2 * Math.PI) - alpha
        }
    }

    let hue = RadToDeg(alpha);

    hue = (hue + 360) % 360;
    // console.log(`Alpha = ${alpha}, h = ${hue}, s = ${saturation}`);

    return new Hsv(hue, saturation);
}

function DegToRad(a: number): number {
    return (a / 180) * Math.PI;
}

function RadToDeg(a: number): number {
    return Math.round((a / Math.PI) * 180);
}

class Coord {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Hsv {
    public h: number;
    public s: number;

    constructor(h: number, s: number) {
        this.h = h;
        this.s = s;
    }
}