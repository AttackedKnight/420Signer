// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 410,
    height: 468,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    },
    vibrancy: 'dark'
  });

  // and load the index.html of the app.
  mainWindow.loadFile('www/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

ipcMain.on('resizeWindow', (event, arg) => {
  mainWindow.setSize(1180,473);
  mainWindow.center();
});

ipcMain.on('setThemeLight', (event, arg) => {
  mainWindow.setVibrancy('medium-light');
});

ipcMain.on('setThemeMediumLight', (event, arg) => {
  mainWindow.setVibrancy('light');
});

ipcMain.on('setThemeDark', (event, arg) => {
  mainWindow.setVibrancy('dark');
});

ipcMain.on('setThemeUltraDark', (event, arg) => {
  mainWindow.setVibrancy('ultra-dark');
});

// ipcMain.on('resizeWindow2', (event, arg) => {
//   const win = require('electron').remote.getCurrentWindow();
//   win.setSize(410,468);
//   win.center();
// })

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
