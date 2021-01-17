import zerorpc from "zerorpc";
import { IPhysicalDevice } from "./IPhysicalDevice";

export default abstract class MicroserviceDevice implements IPhysicalDevice {

    protected client: any;

    constructor(host: string) {

        this.client = new zerorpc.Client();
        this.client.connect(host);
    }
    
    abstract update(properties: any): void;
}