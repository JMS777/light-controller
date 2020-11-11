import { DeviceType } from "../helpers/DeviceType";
import Light from "./Light";

export default class DimmableLight extends Light {
    brightness = 100;
    type: DeviceType = DeviceType.DimmableLight;
    
    constructor(id: number, pin: number) {
        super(id, pin);
    }

    setBrightness(value: number) {
        if (value < 0 || value > 100) {
            console.log("Value must be between 0 and 100.");
            return;
        }
        
        this.brightness = value;
        this.onUpdate();
    }

    getProperties() {
        const properties: any = super.getProperties();
        properties.brightness = this.brightness;

        return properties;
    }

    onUpdate() {
        const value = this.state ? this.brightness / 100 : 0;
        this.channels.one.setValue(value);
        this.writePins();
    }
}