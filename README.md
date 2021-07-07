# Light Controller
## Overview
Provides a Web API interface for controlling devices attached to the GPIO pins on the Raspberry Pi.

Currently 4 types of light are supported:
-   light-basic (simple on/off)
-   light-dimmable (Single channel PWM light)
-   light-rgb (RGB Channel PWM light)
-   light-ws2812b (Addressable LED Light Strip (WS2812B chip))

## Run as service (Raspberry Pi - systemctl)
Run the following commands to register the service with systemd so allow it to start with the OS:

``` bash
# Create a symbolic link between the service definition and the systemd folder.
sudo ln -s /usr/lib/node_modules/@jms777/light-controller/install/light-controller.service /etc/systemd/system/

# Register then start then service
sudo systemctl enable light-controller.service
sudo systemctl start light-controller.service
```

## Device File
A json file containing the devices and the corresponding pins needs to be present in order for the web service to setup the requried devices.

The filepath relative to root directory (`__dirname`) should be specified in a `.env` file (this should be located in the root folder, note this is the `./dist` folder when running via systemd). Please use the format `DEVICE_FILE=<filename>`.

### Layout
The device file should follow this format of this example:

``` json
{
    "devices": [
        {
            "id": 1,
            "type": "light-basic",
            "pins": {
                "main": 1
            }
        },
        {
            "id": 2,
            "type": "light-dimmable",
            "pins": {
                "main": 2
            }
        },
        {
            "id": 3,
            "type": "light-rgb",
            "pins": {
                "red": 3,
                "green": 4,
                "blue": 5
            }
        },
        {
            "id": 4,
            "type": "light-ws2812b",
            "physicalInfo": {
                "pin": 18, // Allowed values are 10, 12, 18 and 21
                "pixelCount": 100 // The number of LEDs on your LED strip
            }
        }
    ]
}
```

## Endpoints (v2)

### Device Info
Get all devices and their properties:
``` json
GET /api/v2/devices

response.body: {
    "success": boolean,
    "message": string,
    "devices": [
        {
            "id": number,
            "type": string, // Should match one the available types
            "state": boolean, // (any light)
            "brightness": number, // (0 - 100)(light-dimmable and light-rgb)
            "hsv": { // (light-rgb only)
                "h": number, // Hue in degrees
                "s": number, // Saturation (0 - 100)
                "v": number, // Brightness (0 - 100)
            },
            "channels": {
                "<channel name>": { // Channel will typically be 'main', 'red', 'green' or 'blue'
                    "pin": number,
                    "value": number // (0 - 1)
                },
                "<channel name>": { // Channel will typically be 'main', 'red', 'green' or 'blue'
                    "pin": number,
                    "value": number // (0 - 1)
                }
            }
        }
    ]
}
```

Get a specific device's properties:
``` json
GET /api/v2/devices/{id}

response.body: {
    "success": boolean,
    "message": string,
    "device": {
        "id": number,
        "type": string, // Should match one the available types
        "state": boolean, // (any light)
        "brightness": number, // (0 - 100)(light-dimmable and light-rgb)
        "hsv": { // (light-rgb only)
            "h": number, // Hue (0 - 360)
            "s": number, // Saturation (0 - 100)
            "v": number, // Brightness (0 - 100)
        },
        "channels": {
            "<channel name>": { // Channel will typically be 'main', 'red', 'green' or 'blue'
                "pin": number,
                "value": number // (0 - 1)
            },
            "<channel name>": { // Channel will typically be 'main', 'red', 'green' or 'blue'
                "pin": number,
                "value": number // (0 - 1)
            }
        }
    }
}
```

### State

``` json
PUT /api/v2/lights/state/{id}

request.body: {
    "state": boolean
}

response.body: {
    "success": boolean,
    "message": string
}
```

### Brightness
``` json
PUT /api/v2/lights/brightness/{id}

request.body: {
    "brightness": number // (0 - 100)
}

response.body: {
    "success": boolean,
    "message": string
}
```

### Colour
``` json
PUT /api/v2/lights/colour/{id}

request.body: {
    "hsv": {
        "h": number, // (0 - 360)
        "s": number, // (0 - 100)
        "v": number, // (0 - 100)
    }
}

response.body: {
    "success": boolean,
    "message": string
}
```

### General Purpose **(WIP)** - WS2812B only
Currently includes more advanced colour selection, which will automatically apply a gradient across the strip if mulitple colours are supplied.
``` json
PUT /api/v3/lights/{id}

request.body: {
    "colours": [ // Colour and brightness of the light, include multiple colours to add a gradient effect.
        { "h": 360, "s": 100, "v": 100 },
        { "h": 120, "s": 100, "v": 100 },
        { "h": 240, "s": 100, "v": 100 }
    ],
    "animation": null // NOT YET IMPLEMENTED (Possible future feature) - Values: null / "scroll" / "bounce" / "random" - (Randomly pick out of the available colours. Maybe include a segment size to break the LED strip into segments)
}
```