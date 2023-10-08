const {app, BrowserWindow, screen} = require('electron');
const url = require('node:url');
const fs = require('node:fs')
const path = require('node:path')
const {ipcMain} = require('electron')



createWindow = () => {
  // try {
  //   require('electron-reloader')(module)
  // } catch (_) {}

  const size = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // win.webContents.openDevTools();

  win.loadURL(url.format({
    pathname: path.join(
      __dirname,
      'dist/angular-electron-app/index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow);

ipcMain.on('save-text', (event, text) => {
  fs.writeFileSync('data.txt', text);
});

ipcMain.handle('get-text', (event) => {
  try {
    return fs.readFileSync('data.txt', 'utf-8');
  } catch (error) {
    return ''; // Return an empty string if the file doesn't exist
  }
});
