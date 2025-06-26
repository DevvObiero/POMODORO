const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const url = require('url');

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

 const mainWindow = new BrowserWindow({
  width,
  height,
  resizable: true,
  autoHideMenuBar: true,
  icon: path.join(__dirname, '../public/icon.ico'), // 👈  this is the path to my icon
  webPreferences: {
    nodeIntegration: false,
  },
});

  const startUrl = url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
