//electron app always expect the preload to be commonjs, so even if whole project is module ESM use require in preload
const { contextBridge, ipcRenderer } = require ("electron");

//expose the functions of render to the main file of window for actions
contextBridge.exposeInMainWorld('api',{
    
    /*
        *syntax for preload : functionName : (callback) =>ipcRenderer.on("channel String", callback)
        *example : displayText: (callback) => ipcRender.on("displayText", callback)  ~~~ refer /src/main/window.js  LineNo: 10-19
    */
    displayText: (callback) => ipcRenderer.on("displayText", callback),
});