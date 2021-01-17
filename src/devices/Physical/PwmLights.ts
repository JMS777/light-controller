import colorsys from 'colorsys';
import PwmDevice from '../Abstract/PwmDevice';

export class PwmLight extends PwmDevice {
    update(properties: any): void {
        this.channels.main = properties.brightness;
        this.writePins();
    }
}

export class PwmRgbLight extends PwmDevice {
    update(properties: any): void {
        const rgb = colorsys.hsv2Rgb(properties.hue, properties.saturation, properties.brightness);

        this.channels.red.setValue(rgb.r / 255);
        this.channels.green.setValue(rgb.g / 255);
        this.channels.blue.setValue(rgb.b / 255);

        this.writePins();
    }
}