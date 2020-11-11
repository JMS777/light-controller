import IPinService from './IPinService';
import { Gpio } from 'pigpio';
import Dictionary from '../models/IDictionary';

export default class GpioService implements IPinService {
    private MAX_VALUE = 255;
    private pins: Dictionary<Gpio>;

    private static _instance: GpioService;

    public static getInstance(): GpioService {
        if (!this._instance) {
            this._instance = new GpioService();
        }

        return this._instance;
    }

    private constructor() {
        this.pins = {};
    }

    initialisePin(id: number): void {
        if (!this.pins[id]) {
            console.log(`Initialising pin: ${id}`);
            this.pins[id] = new Gpio(id, { mode: Gpio.OUTPUT });
        }
    }

    setPin(id: number, value: number): void {
        if (!this.pins[id]) {
            this.initialisePin(id);
            // console.log(`Pin: ${id} is not initialised.`);
        }

        if (value < 0 || value > 1) {
            console.log("Value should be between 0 and 1.");
        }

        value = Math.min(1, Math.max(0, value));
        // console.log(`Setting pin '${id}' to '${value}'`);
        this.pins[id].pwmWrite(value * this.MAX_VALUE);
    }

}