import board
import neopixel
import time
import multiprocessing
import sys
import json

def wheel(pos):
    if pos < 0 or pos > 255:
        r = g = b = 0
    elif pos < 85:
        r = int(pos * 3)
        g = int(255 - pos * 3)
        b = 0
    elif pos < 170:
        pos -= 85
        r = int(255 - pos * 3)
        g = 0
        b = int(pos * 3)
    else:
        pos -= 170
        r = 0
        g = int(pos * 3)
        b = int(255 - pos * 3)
    return (r, g, b)


def rainbow_cycle():
    while True:
        for j in range(255):
            for i in range(ledStrip.num_pixels):
                pixel_index = (i * 256 // ledStrip.num_pixels) + j
                ledStrip.pixels[i] = wheel(pixel_index & 255)
            ledStrip.pixels.show()
            time.sleep(0.001)


def stack():
    while True:
        ledStrip.pixels.fill((0, 0, 0))

        for j in range(ledStrip.num_pixels):
            colour = wheel(j * 255//ledStrip.num_pixels)
            for i in range(ledStrip.num_pixels - j):
                if i > 0:
                    ledStrip.pixels[ledStrip.num_pixels - i] = (0, 0, 0)
                ledStrip.pixels[ledStrip.num_pixels - 1 - i] = colour
                ledStrip.pixels.show()
                time.sleep(0.0001)

class LEDStrip:
    def __init__(self, num_pixels, pin):
        self.num_pixels = num_pixels
        self.pixels = neopixel.NeoPixel(
            pin, self.num_pixels, auto_write=False, pixel_order=neopixel.GRB)
        self.currentEffect = None
        self.stopFlag = False
        self.effects = ["Rainbow Wheel", "Stack"]

    def turnOn(self):
        try:
            self.currentEffect.terminate()
        except:
            pass
        self.pixels.fill((255, 0, 0))
        self.pixels.show()

    def turnOff(self):
        try:
            self.currentEffect.terminate()
        except:
            pass
        self.pixels.fill((0, 0, 0))
        self.pixels.show()

    def setColour(self, colour):
        try:
            self.currentEffect.terminate()
        except:
            pass
        self.pixels.fill(colour)
        self.pixels.show()

    def setEffect(self, effectName):
        try:
            self.currentEffect.terminate()
            print("Stopping effect")
        except:
            print("No effect running")

        if effectName == "Rainbow Wheel":
            self.currentEffect = multiprocessing.Process(target=rainbow_cycle)
            self.currentEffect.start()
        elif effectName == "Stack":
            self.currentEffect = multiprocessing.Process(target=stack)
            self.currentEffect.start()

    def setPixels(self, pixels):
        try:
            self.currentEffect.terminate()
        except:
            pass
        for i in range(min(self.num_pixels, len(pixels))):
            if pixels[i] is not None:
                self.pixels[i] = (pixels[i]['r'], pixels[i]
                                  ['g'], pixels[i]['b'])
        self.pixels.show()

def TurnOn():
    ledStrip.turnOn()

def TurnOff():
    ledStrip.turnOff()

def SetColour(colour):
    ledStrip.setColour((colour['r'], colour['g'], colour['b']))

def SetEffect(effectName):
    ledStrip.setEffect(effectName)

def GetPixelCount():
    return ledStrip.num_pixels

def GetEffects():
    return ledStrip.effects

def SetPixels(pixels):
    ledStrip.setPixels(pixels)

def ProcessCommand(line):
    data = json.loads(line)
    command = data['command']
    args = data['args']

    if command == 'TurnOn':
        TurnOn()
    elif command == 'TurnOff':
        TurnOff()
    if command == 'SetColour':
        SetColour(args['colour'])
    elif command == 'SetPixels':
        SetPixels(args['pixels'])
    elif command == 'SetEffect':
        SetEffect(args['effect'])

def GetBoardPin(pinRef):
    if pinRef == "10":
        return board.D10
    elif pinRef == "12":
        return board.D12
    elif pinRef == "18":
        return board.D18
    elif pinRef == "21":
        return board.D21

if __name__ == "__main__":
    pin = GetBoardPin(sys.argv[1])
    ledCount = int(sys.argv[2])
    ledStrip = LEDStrip(ledCount, pin)
    ledStrip.turnOff()
    for line in sys.stdin:
        ProcessCommand(line)

