import IDeviceManager from "./IDeviceManager";
import fs from 'fs';
import Devices from "../models/Devices";
import Device from "../devices/Abstract/Device";
import DeviceFactory from "../helpers/DeviceFactory";
import GroupFactory from "../helpers/GroupFactory";

export default class JsonDeviceManager implements IDeviceManager {
    devices: Device[] = [];
    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    getDevice<T extends Device>(id: number): T {
        return this.devices.find(d => d.id === id) as T;
    }

    loadDevices(callback: (devices: Device[]) => any) {
        fs.readFile(this.filename, 'utf8', (err, data) => {
            if (err) throw err;

            const devicesDetails = JSON.parse(data) as Devices;

            devicesDetails.devices.map(info => {
                const device = DeviceFactory.Create(info.type, info.id, info.pins);

                if (device) {
                    device.initialise();
                    this.devices.push(device);
                } else {
                    console.log(`Failed to create device from: ${info}`);
                }
            });

            devicesDetails.groups.map(info => {
                const group = GroupFactory.Create(info.type, info.id, this.devices.filter(d => info.devices.includes(d.id)));

                if (group) {
                    group.initialise();
                    this.devices.push(group);
                } else {
                    console.log(`Failed to create group from: ${info}`);
                }
            })

            if (callback) {
                callback(this.devices);
            }
        });
    }
}