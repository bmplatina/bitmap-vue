import {
  app,
  BrowserWindow,
  Menu,
  shell,
  globalShortcut,
  ipcMain,
  nativeTheme,
  TouchBar,
} from "electron";
import { join } from "path";
import * as isDev from "electron-is-dev";
import * as remote from "@electron/remote/main";
import * as autoUpdate from "./updater";
import Store from "electron-store";

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;
const isMac = process.platform === "darwin";
const store = new Store();
let currentLocale;
if (store.get("locale")) {
  currentLocale = store.get("locale");
} else {
  currentLocale = "en";
}
remote.initialize();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1000,
    minHeight: 800,
    autoHideMenuBar: true,
    fullscreenable: true,
    titleBarStyle: "hiddenInset",
    frame: isMac,
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

  // MARK: = Minimize, Maximize, Close App
  if (!isMac) {
    ipcMain.on("minimizeApp", () => {
      mainWindow.minimize();
    });
    ipcMain.on("maximizeApp", () => {
      if (mainWindow.isMaximized()) {
        mainWindow.restore();
      } else {
        mainWindow.maximize();
      }
    });
    ipcMain.on("closeApp", () => {
      mainWindow.close();
    });
  }

  // MARK: - Store data from local storage
  ipcMain.on("save-locale", (event, arg) => {
    store.set("locale", arg);
  });
  ipcMain.on("get-locale", (event) => {
    event.sender.send("return-get-locale", currentLocale);
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
