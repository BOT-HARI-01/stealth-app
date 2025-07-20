import path from "path";
import { app, BrowserWindow, Tray, Menu, screen } from "electron";
import { captureBlocker } from "../utils/blocker.js";
import getHwndHandle from "../utils/hwnd.js";
import { switchModel } from "../core/modelManager.js";
import { askLLM } from "../api/llmCaller.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow, tray;

//Action function sending context to display
function textDisplayer() {
  /*
    *The mainWindow is your display screen, ~~ you can create many screens
    *The webContents talks or controls what's inside you window i.e screen
    *calling the function send to the mainWindow, which will then send the message to the render through preload,
      the common briging name between preload and window is `channel String`
  */
  mainWindow.webContents.send("displayText", "Hello World");
}

//Call LLM
async function  getLLMResponse(){
  const response = await askLLM();
  console.log(response.output);
}

export function createMainWindow() {
  //Get display size
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  //initiailzing the size of window
  const mainWindowHeight = 800;
  const mainWindowWidth = 1280;

  const centerWindow = Math.floor((screenWidth - mainWindowWidth) / 2);
  mainWindow = new BrowserWindow({
    width: mainWindowWidth,
    height: mainWindowHeight,
    x: centerWindow, //set window coordinate
    y: 0,
    show: true,
    frame: false,// Removes OS chrome — required for full transparent overlay
    alwaysOnTop: true, //set window to always on top
    skipTaskbar: false, // apps does not appear in taskbar
    transparent: true, //making the window transparent
    backgroundColor: "#00000000",
    movable:true,
    focusable: false, //sets interation of mouse & keyboard, if `false` no interaction with the window, `true` allow interaction
    webPreferences: {
      preload: path.join(__dirname, "../Preload/preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "../ui/index.html"));
  
  mainWindow.setVisibleOnAllWorkspaces(true,{
    visibleOnFullScreen:true,
  })
  mainWindow.setAlwaysOnTop(true,"screen-saver",10)
  //Capture blocker & mouse ignorance
  mainWindow.setContentProtection(true);
  mainWindow.setIgnoreMouseEvents(true);

  // Additional screen capture resistance settings
  if (process.platform === "darwin") {
    // Prevent window from being captured in screenshots
    mainWindow.setWindowButtonVisibility(false);
    mainWindow.setHiddenInMissionControl(true);
    mainWindow.setBackgroundColor("#00000000");
    mainWindow.setAlwaysOnTop(true);
    // Prevent window from being included in window switcher
    mainWindow.setSkipTaskbar(true);

    // Disable window shadow
    mainWindow.setHasShadow(false);
  }

  //Tray setup
  const iconPath =
    process.platform === "win32"
      ? path.join(__dirname,"../../assets/icons/win/icon.png")
      : path.join(__dirname,"../../assets/icons/mac/icon.icns");
    tray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
    { label: "Show", click: () => { mainWindow.showInactive() }}, //showInactive open's window without loosing the focus on other apps
    { label: "Hide", click: () => { mainWindow.hide() }},
    { label: "Quit", click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("StealthWindow");
  
  //when window is ready enable capture blocking
  mainWindow.on("ready-to-show", () => {
    const hwnd = getHwndHandle(mainWindow);
    captureBlocker(hwnd);
  });

  //can add more function and return them to make them accessible through shortcuts
  return { mainWindow, textDisplayer, switchModel, getLLMResponse };
}
