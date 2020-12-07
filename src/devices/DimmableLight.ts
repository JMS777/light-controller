import CancellationToken from "../helpers/CancellationToken";
import { DeviceType } from "../helpers/DeviceType";
import Light from "./Light";

export default class DimmableLight extends Light {
    protected STEPS: number = 50;
    protected FADE_TIME: number = 500; // Milliseconds

    brightness = 100;
    currentBrightness = 100;
    type: DeviceType = DeviceType.DimmableLight;

    private currentStateTask: Promise<void> | undefined;
    private currentStateToken: CancellationToken | undefined;

    private currentBrightnessTask: Promise<void> | undefined;
    private currentBrightnessToken: CancellationToken | undefined;

    constructor(id: number, pin: number) {
        super(id, pin);
    }

    setState(state: boolean) {
        this.state = state ? 1 : 0;

        if (this.currentStateTask && this.currentStateToken) {
            this.currentStateToken.cancel();
        }

        this.currentStateToken = new CancellationToken();
        this.currentStateTask = this.setStateAsync(this.currentStateToken);
    }

    async setStateAsync(token: CancellationToken): Promise<void> {
        var stateIncrement = (this.state - this.currentState) / this.STEPS;        

        for (let i = 0; i < this.STEPS; i++) {
            if (token.isCancellationRequested) {
                break;
            }

            this.currentState = this.constrain(this.currentState + stateIncrement, 0, 1);
            this.updateChannels();
            await this.delay(this.FADE_TIME / this.STEPS);
        }
    }

    setBrightness(value: number) {
        if (value < 0 || value > 100) {
            console.log("Value must be between 0 and 100.");
            return;
        }

        this.brightness = value;

        if (this.currentBrightnessTask && this.currentBrightnessToken) {
            this.currentBrightnessToken?.cancel();
        }
        
        this.currentBrightnessToken = new CancellationToken();
        this.currentBrightnessTask = this.setBrightnessAsync(this.currentBrightnessToken);
    }

    getProperties() {
        const properties: any = super.getProperties();
        properties.brightness = this.brightness;

        return properties;
    }

    updateChannels() {
        const value = this.currentState * this.currentBrightness / 100;
        this.channels.one.setValue(value);
        this.writePins();
    }

    async setBrightnessAsync(token: CancellationToken): Promise<void> {
        var brightnessIncrement = (this.brightness - this.currentBrightness) / this.STEPS;

        for (let i = 0; i < this.STEPS; i++) {
            if (token.isCancellationRequested) {
                // this.brightness = this.currentBrightness;
                break;
            }

            this.currentBrightness = this.constrain(this.currentBrightness + brightnessIncrement, 0, 100);
            this.updateChannels();
            await this.delay(this.FADE_TIME / this.STEPS);
        }
    }
}