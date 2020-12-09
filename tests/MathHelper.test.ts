import { expect } from "chai";
import * as MathHelper from "../src/helpers/MathHelper";

describe('MathHelper.Round', () => {
    //#region Round
    it('Round - 1.23 dp:0', () => {
        let result = MathHelper.Round(1.23, 0);
        expect(result).equal(1);
    });
    it('Round - 1.51 dp:0', () => {
        let result = MathHelper.Round(1.51, 0);
        expect(result).equal(2);
    });
    it('Round - 1.9 dp:0', () => {
        let result = MathHelper.Round(1.9, 0);
        expect(result).equal(2);
    });
    it('Round - 1.05 dp:1', () => {
        let result = MathHelper.Round(1.05, 1);
        expect(result).equal(1.1);
    });
    it('Round - 1.04 dp:1', () => {
        let result = MathHelper.Round(1.005, 1);
        expect(result).equal(1);
    });
    it('Round - 1.5 dp:2', () => {
        let result = MathHelper.Round(1.5, 2);
        expect(result).equal(1.5);
    });
    it('Round - 1.00000000005 dp:10', () => {
        let result = MathHelper.Round(1.00000000005, 10);
        expect(result).equal(1.0000000001);
    });
    //#endregion
});

describe('MathHelper.DegToRad', () => {
    //#region  Deg to Rad

    it('Deg to Rad - 0', () => {
        let result = MathHelper.DegToRad(0);
        expect(result).equal(0);
    });
    it('Deg to Rad - 30', () => {
        let result = MathHelper.DegToRad(30);
        expect(result).equal(Math.PI / 6);
    });
    it('Deg to Rad - 45', () => {
        let result = MathHelper.DegToRad(45);
        expect(result).equal(Math.PI / 4);
    });
    it('Deg to Rad - 60', () => {
        let result = MathHelper.DegToRad(60);
        expect(result).equal(Math.PI / 3);
    });
    it('Deg to Rad - 90', () => {
        let result = MathHelper.DegToRad(90);
        expect(result).equal(Math.PI / 2);
    });
    it('Deg to Rad - 120', () => {
        let result = MathHelper.DegToRad(120);
        expect(result).equal(2 * Math.PI / 3);
    });
    it('Deg to Rad - 180', () => {
        let result = MathHelper.DegToRad(180);
        expect(result).equal(Math.PI);
    });
    it('Deg to Rad - 215', () => {
        let result = MathHelper.DegToRad(215);
        expect(result).equal(43 * Math.PI / 36);
    });
    it('Deg to Rad - 245.5', () => {
        let result = MathHelper.DegToRad(245.5);
        expect(result).equal(491 * Math.PI / 360);
    });
    it('Deg to Rad - 270', () => {
        let result = MathHelper.DegToRad(270);
        expect(result).equal(3 * Math.PI / 2);
    });
    it('Deg to Rad - 360', () => {
        let result = MathHelper.DegToRad(360);
        expect(result).equal(Math.PI * 2);
    });
});
//#endregion

describe('MathHelper.RadToDeg', () => {
    //#region  Rad to Deg

    it('Rad to Deg - 0', () => {
        let result = MathHelper.RadToDeg(0);
        expect(result).equal(0);
    });
    it('Rad to Deg - 30', () => {
        let result = MathHelper.RadToDeg(Math.PI / 6);
        expect(result).equal(30);
    });
    it('Rad to Deg - 45', () => {
        let result = MathHelper.RadToDeg(Math.PI / 4);
        expect(result).equal(45);
    });
    it('Rad to Deg - 60', () => {
        let result = MathHelper.RadToDeg(Math.PI / 3);
        expect(result).equal(60);
    });
    it('Rad to Deg - 90', () => {
        let result = MathHelper.RadToDeg(Math.PI / 2);
        expect(result).equal(90);
    });
    it('Rad to Deg - 120', () => {
        let result = MathHelper.RadToDeg(2 * Math.PI / 3);
        expect(result).equal(120);
    });
    it('Rad to Deg - 180', () => {
        let result = MathHelper.RadToDeg(Math.PI);
        expect(result).equal(180);
    });
    it('Rad to Deg - 215', () => {
        let result = MathHelper.RadToDeg(43 * Math.PI / 36);
        expect(result).equal(215);
    });
    it('Rad to Deg - 245.5', () => {
        let result = MathHelper.RadToDeg(491 * Math.PI / 360);
        expect(result).equal(245.5);
    });
    it('Rad to Deg - 270', () => {
        let result = MathHelper.RadToDeg(3 * Math.PI / 2);
        expect(result).equal(270);
    });
    it('Rad to Deg - 360', () => {
        let result = MathHelper.RadToDeg(Math.PI * 2);
        expect(result).equal(360);
    });

    //#endregion
});

describe('MathHelper.NormaliseDeg', () => {
    //#region Normalised Values (Positive)

    it('Normalise - 0', () => {
        let result = MathHelper.NormaliseDeg(0);
        expect(result).equal(0);
    });
    it('Normalise - 30', () => {
        let result = MathHelper.NormaliseDeg(30);
        expect(result).equal(30);
    });
    it('Normalise - 180', () => {
        let result = MathHelper.NormaliseDeg(180);
        expect(result).equal(180);
    });
    it('Normalise - 278.782', () => {
        let result = MathHelper.NormaliseDeg(278.782);
        expect(result).equal(278.782);
    });
    it('Normalise - 359', () => {
        let result = MathHelper.NormaliseDeg(359);
        expect(result).equal(359);
    });

    //#endregion

    //#region Non-Normalised (Positive)

    it('Normalise - 360', () => {
        let result = MathHelper.NormaliseDeg(360);
        expect(result).equal(0);
    });
    it('Normalise - 361', () => {
        let result = MathHelper.NormaliseDeg(361);
        expect(result).equal(1);
    });
    it('Normalise - 390', () => {
        let result = MathHelper.NormaliseDeg(390);
        expect(result).equal(30);
    });
    it('Normalise - 540', () => {
        let result = MathHelper.NormaliseDeg(540);
        expect(result).equal(180);
    });
    it('Normalise - 720', () => {
        let result = MathHelper.NormaliseDeg(720);
        expect(result).equal(0);
    });
    it('Normalise - 3239', () => {
        let result = MathHelper.NormaliseDeg(3239);
        expect(result).equal(359);
    });

    //#endregion

    //#region Normalised Values (Negative)

    it('Normalise - -1', () => {
        let result = MathHelper.NormaliseDeg(-1);
        expect(result).equal(359);
    });
    it('Normalise - -120', () => {
        let result = MathHelper.NormaliseDeg(-120);
        expect(result).equal(240);
    });
    it('Normalise - -359', () => {
        let result = MathHelper.NormaliseDeg(-359);
        expect(result).equal(1);
    });

    //#endregion

    //#region Non-Nomalised Values (Negative)

    it('Normalise - -360', () => {
        let result = MathHelper.NormaliseDeg(-360);
        expect(result).equal(0);
    });
    it('Normalise - -361', () => {
        let result = MathHelper.NormaliseDeg(-361);
        expect(result).equal(359);
    });
    it('Normalise - -390', () => {
        let result = MathHelper.NormaliseDeg(-390);
        expect(result).equal(330);
    });
    it('Normalise - -540', () => {
        let result = MathHelper.NormaliseDeg(-540);
        expect(result).equal(180);
    });
    it('Normalise - -720', () => {
        let result = MathHelper.NormaliseDeg(-720);
        expect(result).equal(0);
    });
    it('Normalise - -3239', () => {
        let result = MathHelper.NormaliseDeg(-3239);
        expect(result).equal(1);
    });

    //#endregion
});

describe('MathHelper.NormaliseRad', () => {
    //#region Normalised Values (Positive)

    it('Normalise - 0', () => {
        let result = MathHelper.NormaliseRad(0);
        expect(result).equal(0);
    });
    it('Normalise - 2(Pi) / 3', () => {
        let result = MathHelper.NormaliseRad(2 * Math.PI / 3);
        expect(result).equal(2 * Math.PI / 3);
    });
    it('Normalise - Pi', () => {
        let result = MathHelper.NormaliseRad(Math.PI);
        expect(result).equal(Math.PI);
    });

    //#endregion

    //#region Non-Normalised (Positive)

    it('Normalise - 2(Pi)', () => {
        let result = MathHelper.NormaliseRad(2 * Math.PI);
        expect(result).equal(0);
    });
    it('Normalise - 3(PI)', () => {
        let result = MathHelper.NormaliseRad(3 * Math.PI);
        expect(result).equal(Math.PI);
    });
    it('Normalise - 8(PI)', () => {
        let result = MathHelper.NormaliseRad(8 * Math.PI);
        expect(result).equal(0);
    });

    //#endregion

    //#region Normalised Values (Negative)

    it('Normalise - -Pi / 180', () => {
        let result = MathHelper.NormaliseRad(-Math.PI / 180);
        expect(MathHelper.Round(result, 14)).equal(MathHelper.Round(359 * Math.PI / 180, 14));
    });
    it('Normalise - -2(Pi) / 3', () => {
        let result = MathHelper.NormaliseRad(-2 * Math.PI / 3);
        expect(MathHelper.Round(result, 14)).equal(MathHelper.Round(4 * Math.PI / 3, 14));
    });
    it('Normalise - -Pi', () => {
        let result = MathHelper.NormaliseRad(-Math.PI);
        expect(result).equal(Math.PI);
    });

    //#endregion

    //#region Non-Nomalised Values (Negative)

    it('Normalise - -2(Pi)', () => {
        let result = MathHelper.NormaliseRad(-2 * Math.PI);
        expect(result).equal(0);
    });
    it('Normalise - -3(PI)', () => {
        let result = MathHelper.NormaliseRad(-3 * Math.PI);
        expect(result).equal(Math.PI);
    });
    it('Normalise - -8(PI)', () => {
        let result = MathHelper.NormaliseRad(-8 * Math.PI);
        expect(result).equal(0);
    });

    //#endregion
});

describe('MathHelper.Lerp', () => {
    //#region Lerp

    it('Lerp - 0 to 1 t=0', () => {
        let result = MathHelper.Lerp(0, 1, 0);
        expect(result).equal(0);
    });
    it('Lerp - 0 to 1 t=0.25', () => {
        let result = MathHelper.Lerp(0, 1, 0.25);
        expect(result).equal(0.25);
    });
    it('Lerp - 0 to 1 t=0.5', () => {
        let result = MathHelper.Lerp(0, 1, 0.5);
        expect(result).equal(0.5);
    });
    it('Lerp - 0 to 1 t=1', () => {
        let result = MathHelper.Lerp(0, 1, 1);
        expect(result).equal(1);
    });


    it('Lerp - 0 to 2 t=0', () => {
        let result = MathHelper.Lerp(0, 2, 0);
        expect(result).equal(0);
    });
    it('Lerp - 0 to 2 t=0.25', () => {
        let result = MathHelper.Lerp(0, 2, 0.25);
        expect(result).equal(0.5);
    });
    it('Lerp - 0 to 2 t=0.5', () => {
        let result = MathHelper.Lerp(0, 2, 0.5);
        expect(result).equal(1);
    });
    it('Lerp - 0 to 2 t=1', () => {
        let result = MathHelper.Lerp(0, 2, 1);
        expect(result).equal(2);
    });


    it('Lerp - -2 to 2 t=0', () => {
        let result = MathHelper.Lerp(-2, 2, 0);
        expect(result).equal(-2);
    });
    it('Lerp - -2 to 2 t=0.25', () => {
        let result = MathHelper.Lerp(-2, 2, 0.25);
        expect(result).equal(-1);
    });
    it('Lerp - -2 to 2 t=0.5', () => {
        let result = MathHelper.Lerp(-2, 2, 0.5);
        expect(result).equal(0);
    });
    it('Lerp - -2 to 2 t=1', () => {
        let result = MathHelper.Lerp(-2, 2, 1);
        expect(result).equal(2);
    });

    //#endregion
});

describe('MathHelper.LerpCoord', () => {
    //#region LerpCoord

    it('Lerp - 0,0 to 1,2 t=0', () => {
        let result = MathHelper.LerpCoord({ x: 0, y: 0 }, { x: 1, y: 2 }, 0);
        expect(result).to.deep.equal({ x: 0, y: 0 });
    });
    it('Lerp - 0,-1 to 1,1 t=0.25', () => {
        let result = MathHelper.LerpCoord({ x: 0, y: -1 }, { x: 1, y: 1 }, 0.25);
        expect(result).to.deep.equal({ x: 0.25, y: -0.5 });
    });
    it('Lerp - -2,-3 to 0,3 t=0.5', () => {
        let result = MathHelper.LerpCoord({ x: -2, y: -3 }, { x: 0, y: 3 }, 0.5);
        expect(result).to.deep.equal({ x: -1, y: 0 });
    });
    it('Lerp - 2,2 to -2,-2 t=0.75', () => {
        let result = MathHelper.LerpCoord({ x: 2, y: 2 }, { x: -2, y: -2 }, 0.75);
        expect(result).to.deep.equal({ x: -1, y: -1 });
    });

    //#endregion
});