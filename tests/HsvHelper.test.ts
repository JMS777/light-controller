import { expect } from "chai";
import * as HsvHelper from "../src/helpers/HsvHelper";

describe('HsvHelper.HueSaturationToCartisian', () => {
    it('H:0 S:0', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 0, s: 0 });
        expect(result.x).to.approximately(0, 1e-10)
        expect(result.y).to.approximately(0, 1e-10)
        expect(result).to.deep.equal({ x: 0, y: 0 });
    });
    it('H:0 S:100', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 0, s: 100 });
        expect(result.x).to.approximately(0, 1e-10)
        expect(result.y).to.approximately(100, 1e-10)
    });
    it('H:90 S:100', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 90, s: 100 });
        expect(result.x).to.approximately(100, 1e-10)
        expect(result.y).to.approximately(0, 1e-10)
    });
    it('H:180 S:100', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 180, s: 100 });
        expect(result.x).to.approximately(0, 1e-10)
        expect(result.y).to.approximately(-100, 1e-10)
    });
    it('H:270 S:100', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 270, s: 100 });
        expect(result.x).to.approximately(-100, 1e-10)
        expect(result.y).to.approximately(0, 1e-10)
    });

    it('H:45 S:100', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 45, s: 100 });
        expect(result.x).to.approximately(70.71067811, 1e-8)
        expect(result.y).to.approximately(70.71067811, 1e-8)
    });
    it('H:135 S:100', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 135, s: 100 });
        expect(result.x).to.approximately(70.71067811, 1e-8)
        expect(result.y).to.approximately(-70.71067811, 1e-8)
    });
    it('H:225 S:100', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 225, s: 100 });
        expect(result.x).to.approximately(-70.71067811, 1e-8)
        expect(result.y).to.approximately(-70.71067811, 1e-8)
    });
    it('H:315 S:100', () => {
        let result = HsvHelper.HueSaturationToCartesian({ h: 315, s: 100 });
        expect(result.x).to.approximately(-70.71067811, 1e-8)
        expect(result.y).to.approximately(70.71067811, 1e-8)
    });
});

describe('HsvHelper.CartisianToHueSaturation', () => {
    it('x:0 y:0', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: 0, y: 0 });
        expect(result).to.deep.equal({ h: 0, s: 0 });
    });
    it('x:0 y:100', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: 0, y: 100 });
        expect(result).to.deep.equal({ h: 0, s: 100 });
    });
    it('x:100 y:0', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: 100, y: 0 });
        expect(result).to.deep.equal({ h: 90, s: 100 });
    });
    it('x:0 y:-100', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: 0, y: -100 });
        expect(result).to.deep.equal({ h: 180, s: 100 });
    });
    it('x:-100 y:0', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: -100, y: 0 });
        expect(result).to.deep.equal({ h: 270, s: 100 });
    });

    it('x:70.71 y:70.71', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: 70.7106781186548, y: 70.7106781186548 });
        expect(result).to.deep.equal({ h: 45, s: 100 });
    });
    it('x:70.71 y:-70.71', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: 70.7106781186548, y: -70.7106781186548 });
        expect(result).to.deep.equal({ h: 135, s: 100 });
    });
    it('x:-70.71 y:-70.71', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: -70.7106781186548, y: -70.7106781186548 });
        expect(result).to.deep.equal({ h: 225, s: 100 });
    });
    it('x:-70.71 y:70.71', () => {
        let result = HsvHelper.CartesianToHueSaturation({ x: -70.7106781186548, y: 70.7106781186548 });
        expect(result).to.deep.equal({ h: 315, s: 100 });
    });
});