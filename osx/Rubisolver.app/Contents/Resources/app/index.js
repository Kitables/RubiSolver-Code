var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var MenuItem = require('menu-item');
var dialog = require('dialog');

var mainWindow = null;

var menu = new Menu();

var fileMenu = new Menu();
fileMenu.append(new MenuItem({
    label: 'Quit',
    click: app.quit,
    accelerator: 'Command+Q'
}));

menu.append(new MenuItem({
    label: 'File',
    submenu: fileMenu
}));

var helpMenu = new Menu();
helpMenu.append(new MenuItem({
    label: 'About',
    accelerator: 'Command+I',
    click: function() {
        dialog.showMessageBox(
            mainWindow,
            {
                type: 'info',
                title: 'About',
                message: 'Rubisolver v1.0\nKitables',
                buttons: ['Ok'],
                icon: './assets/images/icon.png'
            }
        );
    }
}));

menu.append(new MenuItem({
    label: 'Help',
    submenu: helpMenu
}));

Menu.setApplicationMenu(menu);

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        title: 'Rubisolver',

        resizable: false,
        width: 800,
        height: 600,

        'min-width': 800,
        'max-width': 800,
        'min-height': 600,
        'max-height': 600,

        center: true,

        icon: './assets/images/icon.png',

        'web-preferences': {
            'text-areas-are-resizable': false
        }
    });

    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
