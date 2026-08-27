const {contextBridge, ipcRenderer }= require('electron')

contextBridge.exposeInMainWorld('api',{
    calcular: (datos) => ipcRenderer.invoke('calcular', datos)
    
})