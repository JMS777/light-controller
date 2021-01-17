import { IAddressableRgbLight as IAddressableRgbLight } from "../Abstract/IVirtualLights";
import WS2812B from "../Physical/WS2812B";
import RgbLight from "./RgbLight";

export default class AddressableRgbStrip extends RgbLight implements IAddressableRgbLight {

    physical: WS2812B;

    pixelCount: number = 0;

    constructor(id: number, physical: WS2812B) {
        super(id, physical)

        this.physical = physical;
    }

    initialise(): void {
        super.initialise();

        this.physical.getPixelCount((pixels: number) => {
            this.pixelCount = pixels;
        });
    }

    setEffect(effectName: string): boolean {
        if (super.setEffect(effectName)) {
            return true;
        }
        
        this.physical.setEffect(effectName);
        return true;
    }
}