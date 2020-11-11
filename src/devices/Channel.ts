export default class Channel {
    pin: number;
    value: number;

    constructor(pin: number) {
        this.pin = pin;
        this.value = 0;
    }

    setValue(value: number) {
        if (value > 1 || value < 0) {
            console.log(`Invalid channel value: ${value}. Value should be between 0 and 1.`);
            return;
        }

        this.value = value;
    }
}