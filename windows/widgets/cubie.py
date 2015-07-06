import tkinter
from tkinter import ttk

COLOR_RED = 'COLOR_RED'
COLOR_WHITE = 'COLOR_WHITE'
COLOR_ORANGE = 'COLOR_ORANGE'
COLOR_BLUE = 'COLOR_BLUE'
COLOR_GREEN = 'COLOR_GREEN'
COLOR_YELLOW = 'COLOR_YELLOW'

COLORS = {
    COLOR_RED: '#AD4444',
    COLOR_WHITE: '#FFFFFF',
    COLOR_ORANGE: '#D17A00',
    COLOR_BLUE: '#4477AD',
    COLOR_GREEN: '#5EAD44',
    COLOR_YELLOW: '#FFD900',
}

s = ttk.Style()

s.configure(
    'Cubie.TFrame',
    background='#000000'
)

s.configure('Yellow.Cubie.TFrame', background=COLORS[COLOR_YELLOW])
s.configure('Orange.Cubie.TFrame', background=COLORS[COLOR_ORANGE])
s.configure('Blue.Cubie.TFrame', background=COLORS[COLOR_BLUE])
s.configure('Green.Cubie.TFrame', background=COLORS[COLOR_GREEN])
s.configure('Red.Cubie.TFrame', background=COLORS[COLOR_RED])
s.configure('White.Cubie.TFrame', background=COLORS[COLOR_WHITE])


class CubieColorPicker(ttk.Frame):
    STYLE = 'Cubie.TFrame'

    def __init__(self, *args, **kwargs):
        super(CubieColorPicker, self).__init__(
            *args,
            relief=tkinter.GROOVE,
            borderwidth=2,
            width=50,
            height=50,
            padding=5,
            style=self.STYLE,
            **kwargs
        )

    def pick(self):
        return ttk.Style().lookup(self.STYLE, 'background')


class RedCubieColorPicker(CubieColorPicker):
    STYLE = 'Red.Cubie.TFrame'

class WhiteCubieColorPicker(CubieColorPicker):
    STYLE = 'White.Cubie.TFrame'

class OrangeCubieColorPicker(CubieColorPicker):
    STYLE = 'Orange.Cubie.TFrame'

class BlueCubieColorPicker(CubieColorPicker):
    STYLE = 'Blue.Cubie.TFrame'

class GreenCubieColorPicker(CubieColorPicker):
    STYLE = 'Green.Cubie.TFrame'

class YellowCubieColorPicker(CubieColorPicker):
    STYLE = 'Yellow.Cubie.TFrame'


class Cubie(ttk.Frame):
    def __init__(self):
        pass
