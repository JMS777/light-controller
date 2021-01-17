import zerorpc
import board
import neopixel
import time
import multiprocessing


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


class Controller(object):
    def TurnOn(self):
        ledStrip.turnOn()

    def TurnOff(self):
        ledStrip.turnOff()

    def SetColour(self, colour):
        ledStrip.setColour((colour['r'], colour['g'], colour['b']))

    def SetEffect(self, effectName):
        ledStrip.setEffect(effectName)

    def GetPixelCount(self):
        return ledStrip.num_pixels

    def GetEffects(self):
        return ledStrip.effects

    def SetPixels(self, pixels):
        ledStrip.setPixels(pixels)


ledStrip = LEDStrip(96, board.D18)
ledStrip.turnOff()
server = zerorpc.Server(Controller())
server.bind("tcp://0.0.0.0:8347")
server.run()
