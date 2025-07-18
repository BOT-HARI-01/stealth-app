import fs from "fs";
import path from "path";
import { globalShortcut, app } from "electron";

export function registerShortCuts(

  mainWindow,
  textDisplayer,
) {
  const step = 50;
  //movement
  globalShortcut.register("Control+Up", () => {
    const [mainX, mainY] = mainWindow.getPosition();
    mainWindow.setPosition(mainX, mainY - step);
  });

  globalShortcut.register("Control+Down", () => {
    const [mainX, mainY] = mainWindow.getPosition();
    mainWindow.setPosition(mainX, mainY + step);
  });

  globalShortcut.register("Control+Left", () => {
    const [mainX, mainY] = mainWindow.getPosition();
    mainWindow.setPosition(mainX - step, mainY);
  });

  globalShortcut.register("Control+Right", () => {
    const [mainX, mainY] = mainWindow.getPosition();
    mainWindow.setPosition(mainX + step, mainY);
  });

  //scroll page
  globalShortcut.register("Control+Shift+Up", () => {
    scrollControl("Up");
  });
  globalShortcut.register("Control+Shift+Down", () => {
    scrollControl("Down");
  });

  //off or on
  globalShortcut.register("Control+H", () => {
    mainWindow.hide();
  });
  globalShortcut.register("Control+S", () => {
    mainWindow.showInactive();
  });
  globalShortcut.register("Control+Q", () => {
    app.quit();
  });

  //display Text
  globalShortcut.register("Control+T", () =>{
    textDisplayer();
  });
}
//Unregister all shortcuts
export function unregisterShortcuts() {
  globalShortcut.unregisterAll();
}
