import path from 'path';
import { app } from "electron";
import { fileURLToPath } from "url";
import { createEnvFile } from './src/core/envManager.js';
import { createMainWindow } from './src/main/windows.js';
import { registerShortCuts, unregisterShortcuts } from "./src/core/shortcutsManager.js";
import { setupLogger, logNativeModules, logAsarContents } from './src/utils/logger.js'
//Locating dir in dev env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Load env file
createEnvFile();

// App startup
app.whenReady().then(() => {
  const  {mainWindow , textDisplayer}  = createMainWindow();
  setupLogger(app, __dirname);
  logNativeModules(__dirname, app);
  //not dev env _ log asar
  if (!app.isPackaged) logAsarContents(__dirname, app);

  registerShortCuts(mainWindow,textDisplayer);
})

app.commandLine.appendSwitch("force-device-scale-factor", "1");
//Prevent app from closing on mac
app.on("window-all-closed", () => {
  unregisterShortcuts()
  if (process.platform !== "darwin") app.quit()
})