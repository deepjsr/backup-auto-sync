const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  startSync: () => ipcRenderer.send("sync:start"),
  onStatus: (cb) => ipcRenderer.on("sync:status", (_, data) => cb(data)),
  onProgress: (cb) => ipcRenderer.on("sync:progress", (_, data) => cb(data)),
});
