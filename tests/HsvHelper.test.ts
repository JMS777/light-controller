import { expect } from "chai";
import * as hsvTools from "../src/helpers/HsvHelper";

describe('hsv helper', () => {
    it('hsv2coordAndBack a=0', () => {
        let result = hsvTools.HsvLerp({ h: 0, s: 100 }, { h: 45, s: 100 }, 0);
        let h = result.h;
        let s = result.s;
        expect(h).equal(0);
        expect(s).equal(100);
    });
    it('hsv2coordAndBack a=90', () => {
        let result = hsvTools.HsvLerp({ h: 90, s: 100 }, { h: 45, s: 100 }, 0);
        let h = result.h;
        let s = result.s;
        expect(h).equal(90);
        expect(s).equal(100);
    });
    it('hsv2coordAndBack a=180', () => {
        let result = hsvTools.HsvLerp({ h: 180, s: 100 }, { h: 45, s: 100 }, 0);
        let h = result.h;
        let s = result.s;
        expect(h).equal(180);
        expect(s).equal(100);
    });
    it('hsv2coordAndBack a=270', () => {
        let result = hsvTools.HsvLerp({ h: 270, s: 100 }, { h: 45, s: 100 }, 0);
        let h = result.h;
        let s = result.s;
        expect(h).equal(270);
        expect(s).equal(100);
    });
    it('hsv2coordAndBack a=45', () => {
        let result = hsvTools.HsvLerp({ h: 45, s: 100 }, { h: 45, s: 100 }, 0);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
    it('hsv2coordAndBack a=135', () => {
        let result = hsvTools.HsvLerp({ h: 135, s: 100 }, { h: 45, s: 100 }, 0);
        let h = result.h;
        let s = result.s;
        expect(h).equal(135);
        expect(s).equal(100);
    });
    it('hsv2coordAndBack a=225', () => {
        let result = hsvTools.HsvLerp({ h: 225, s: 100 }, { h: 45, s: 100 }, 0);
        let h = result.h;
        let s = result.s;
        expect(h).equal(225);
        expect(s).equal(100);
    });
    it('hsv2coordAndBack a=315', () => {
        let result = hsvTools.HsvLerp({ h:315, s: 100 }, { h: 45, s: 100 }, 0);
        let h = result.h;
        let s = result.s;
        expect(h).equal(315);
        expect(s).equal(100);
    });


    it('interpolate a=0', () => {
        let result = hsvTools.HsvLerp({ h: 0, s: 100 }, { h: 45, s: 100 }, 1);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
    it('interpolate a=90', () => {
        let result = hsvTools.HsvLerp({ h: 90, s: 100 }, { h: 45, s: 100 }, 1);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
    it('interpolate a=180', () => {
        let result = hsvTools.HsvLerp({ h: 180, s: 100 }, { h: 45, s: 100 }, 1);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
    it('interpolate a=270', () => {
        let result = hsvTools.HsvLerp({ h: 270, s: 100 }, { h: 45, s: 100 }, 1);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
    it('interpolate a=45', () => {
        let result = hsvTools.HsvLerp({ h: 45, s: 100 }, { h: 45, s: 100 }, 1);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
    it('interpolate a=135', () => {
        let result = hsvTools.HsvLerp({ h: 135, s: 100 }, { h: 45, s: 100 }, 1);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
    it('interpolate a=225', () => {
        let result = hsvTools.HsvLerp({ h: 225, s: 100 }, { h: 45, s: 100 }, 1);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
    it('interpolate a=315', () => {
        let result = hsvTools.HsvLerp({ h:315, s: 100 }, { h: 45, s: 100 }, 1);
        let h = result.h;
        let s = result.s;
        expect(h).equal(45);
        expect(s).equal(100);
    });
});