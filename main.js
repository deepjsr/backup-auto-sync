const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile("index.html");
}

ipcMain.on("sync:start", () => {
  console.log("Sync requested");

  if (!mainWindow) return;

  mainWindow.webContents.send("sync:status", "SCANNING");

  setTimeout(() => {
    mainWindow.webContents.send("sync:progress", {
      compared: 1240,
      updated: 32,
    });

    mainWindow.webContents.send("sync:status", "DONE");
  }, 1500);
});

app.whenReady().then(createWindow);
