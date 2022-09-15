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
import * as isDev from "electron-is-dev";
import * as remote from "@electron/remote/main";
import * as autoUpdate from "./updater";

const isMac = process.platform === "darwin";
remote.initialize();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1000,
    minHeight: 800,
    fullscreenable: true,
    titleBarStyle: "hiddenInset",
    title: "Bitmap",
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      webviewTag: true,
      devTools: isDev,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }

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
