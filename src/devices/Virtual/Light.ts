import { DeviceType } from "../../helpers/DeviceType";
import VirtualDevice from "../Abstract/VirtualDevice";
import { ILight } from "../Abstract/IVirtualLights";
import { IPhysicalDevice } from "../Abstract/IPhysicalDevice";

export default class Light extends VirtualDevice implements ILight {
    type: DeviceType = DeviceType.BasicLight;
    state = false;

    physical: IPhysicalDevice;

    constructor(id: number, physical: IPhysicalDevice) {
        super(id);
        this.physical = physical;
    }

    public initialise(): void {
        this.updateChannels()
    }

    getProperties() {
        const properties: any = super.getProperties();
        properties.state = this.state;

        return properties;
    }

    setState(state: boolean): void {
        this.state = state;
        this.updateChannels();
    }

    updateChannels() {
        const properties = {
            brightness: this.state ? 1 : 0
        };

        this.physical.update(properties);
    }
}