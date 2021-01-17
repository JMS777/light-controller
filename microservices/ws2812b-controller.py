import zerorpc
import board
import neopixel

class LEDStrip:
    def __init__(self, num_pixels, pin):
        self.num_pixels = num_pixels
        self.pixels = neopixel.NeoPixel(pin, self.num_pixels, brightness=0.2, auto_write=False, pixel_order=neopixel.GRB)

    def turnOn(self):
        self.pixels.fill((255,0,0))
        self.pixels.show()

    def turnOff(self):
        self.pixels.fill((0,0,0))
        self.pixels.show()

    def setColour(self, colour):
        self.pixels.fill(colour)
        self.pixels.show()

    def setEffect(self, effectName):
        self.pixels.fill((0,0,0))
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

ledStrip = LEDStrip(96, board.D18)
ledStrip.turnOff()
server = zerorpc.Server(Controller())
server.bind("tcp://0.0.0.0:8347")
server.run()