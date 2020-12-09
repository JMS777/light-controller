export function DegToRad(a: number): number {
    return (a / 180) * Math.PI;
}

export function RadToDeg(a: number): number {
    return (a / Math.PI) * 180;
}

export function NormaliseDeg(a: number): number {
    a %= 360;
    return a + (a < 0 ? 360 : 0);
}

export function NormaliseRad(a: number): number {
    a %= (Math.PI * 2);
    return a + (a < 0 ? Math.PI * 2 : 0);
}

export function Lerp(a: number, b: number, t: number): number {
    let delta = b - a;

    let c = a + (delta * t);

    return c;
}

export function LerpCoord(a: Coord, b: Coord, t: number): Coord {
    return new Coord(Lerp(a.x, b.x, t), Lerp(a.y, b.y, t));
}

export function Round(num: number, dp = 0): number {
    let factor = 10 ** dp;

    return Math.round((num + Number.EPSILON) * factor) / factor;
}

export class Coord {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}