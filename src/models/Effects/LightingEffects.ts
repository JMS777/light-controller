import DimmableLight from "../../devices/DimmableLight";
import Light from "../../devices/Light";
import RgbLight from "../../devices/RgbLight";
import { delay } from "../../helpers/AsyncHelpers";
import CancellationToken from "../../helpers/CancellationToken"
import Effect from "./Effect"

export class Blink extends Effect {
    public affectsBrightness: boolean = true;
    public affectsColour: boolean = false;

    constructor() {
        super("Blink");
    }

    protected async doWork(device: DimmableLight, cst: CancellationToken): Promise<void> {
        let originalBrightness = device.brightness;
        
        while (!cst.isCancellationRequested) {
            device.setBrightness(100, undefined, true);

            await delay(1000);
            if (cst.isCancellationRequested) break;
            
            device.setBrightness(0, undefined, true);
            await delay(1000);
        }

        device.setBrightness(originalBrightness, true, true);
    }

}

export class Pulse extends Effect {
    public affectsBrightness: boolean = true;
    public affectsColour: boolean = false;

    private PULSE_DELAY = (2.0 / 100.0) * 1000;

    constructor() {
        super("Pulse");
    }

    protected async doWork(device: DimmableLight, cst: CancellationToken): Promise<void> {
        let originalBrightness = device.brightness;
        let direction = 1;
        while (!cst.isCancellationRequested) {
            if (direction > 0 && device.currentBrightness >= 100) {
                direction = -1
            } else if (direction < 0 && device.currentBrightness <= 0) {
                direction = 1;
            }

            device.setBrightness(device.currentBrightness + direction, undefined, true);
            await delay(this.PULSE_DELAY);
        }
        
        if (!this.cst?.immediate)
            device.setBrightness(originalBrightness, true, true);
        else
            device.brightness = originalBrightness;
    }
}

export class Rainbow extends Effect {
    public affectsBrightness: boolean = false;
    public affectsColour: boolean = true;

    private HUE_DELAY = (10.0 / 360.0) * 1000;

    constructor() {
        super("Rainbow");
    }

    protected async doWork(device: RgbLight, cst: CancellationToken): Promise<void> {
        let originalHue = device.hue;
        let originalSaturation = device.saturation;

        await device.setColour(device.currentHue, 100, true, true);

        while (!cst.isCancellationRequested) {
            if (device.currentHue >= 359) {
                device.setColour(0, 100, undefined, true)
            } else {
                device.setColour(device.currentHue + 1, 100, undefined, true);
            }

            await delay(this.HUE_DELAY);
        }

        if (!this.cst?.immediate)
            device.setColour(originalHue, originalSaturation, true, true);
        else {
            device.hue = originalHue;
            device.saturation = originalSaturation;
        }
    }

}