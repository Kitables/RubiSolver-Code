import tkinter as tk
from tkinter import ttk

from widgets import cubie


class RubisolverApp(ttk.Frame):
    def __init__(self, master=None):
        super(RubisolverApp, self).__init__(master)

        self.master.title('Rubisolver')
        self.master.option_add('*tearOff', False)

        self.master.geometry('800x600')

        menubar = tk.Menu(self.master)
        self.master.configure(menu=menubar)

        file_menu = tk.Menu(menubar)
        file_menu.add_command(label='Quit', command=lambda: self.master.quit())
        menubar.add_cascade(menu=file_menu, label='File')

        main_frame = ttk.Frame(self.master, width=800, height=600, padding=25)

        red_picker = cubie.RedCubieColorPicker(main_frame)
        white_picker = cubie.WhiteCubieColorPicker(main_frame)
        orange_picker = cubie.OrangeCubieColorPicker(main_frame)
        blue_picker = cubie.BlueCubieColorPicker(main_frame)
        green_picker = cubie.GreenCubieColorPicker(main_frame)
        yellow_picker = cubie.YellowCubieColorPicker(main_frame)

        main_frame.grid(column=0, row=0)

        red_picker.grid(column=1, row=0, pady=5)
        white_picker.grid(column=1, row=1, pady=5)
        orange_picker.grid(column=1, row=2, pady=5)
        blue_picker.grid(column=1, row=3, pady=5)
        green_picker.grid(column=1, row=4, pady=5)
        yellow_picker.grid(column=1, row=5, pady=5)


def main():
    app = RubisolverApp()
    app.mainloop()

if __name__ == '__main__':
    main()
