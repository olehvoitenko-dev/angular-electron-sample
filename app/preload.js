const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  saveText: (text) => {
    ipcRenderer.send('save-text', text);
  },
  getText: () => {
    return ipcRenderer.invoke('get-text');
  },
});
