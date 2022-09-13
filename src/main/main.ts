import {
  app,
  BrowserWindow,
  Menu,
  shell,
  globalShortcut,
  ipcMain,
  nativeTheme,
} from "electron";
import { join } from "path";
import * as os from "os";
import * as fs from "fs";
import * as isDev from "electron-is-dev";
import * as log from "electron-log";
import * as remote from "@electron/remote/main";
import { makeUniversalApp } from "@electron/universal";
import * as autoUpdate from "./updater"

const isMac = process.platform === "darwin";
remote.initialize();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1000,
    minHeight: 700,
    fullscreenable: true,
    titleBarStyle: "hiddenInset",
    frame: isMac,
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }

  // MARK: - Frameless Window Function
  ipcMain.on("closeApp", () => {
    console.log("Clicked on Close button");
    mainWindow.close();
  });

  ipcMain.on("minimizeApp", () => {
    console.log("Clicked on Minimize button");
    mainWindow.minimize();
  });

  ipcMain.on("maximizeRestoreApp", () => {
    if (mainWindow.isMaximized()) {
      console.log("Clicked on Maximize button");
      mainWindow.restore();
    } else {
      console.log("Clicked on Maximize button");
      mainWindow.maximize();
    }
  });

  // MARK: - Check Window Status
  mainWindow.on("maximize", () => {
    // Check Maximized
    mainWindow.webContents.send("isMaximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("isRestored");
  });

  // MARK: - Dark, Light Mode
  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });
  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });
  remote.enable(mainWindow.webContents);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

autoUpdate.update();

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("message", (event, message) => {
  console.log(message);
});
