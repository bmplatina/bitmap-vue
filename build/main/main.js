"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const isDev = __importStar(require("electron-is-dev"));
const remote = __importStar(require("@electron/remote/main"));
const autoUpdate = __importStar(require("./updater"));
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = electron_1.TouchBar;
const isMac = process.platform === "darwin";
remote.initialize();
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
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
            preload: (0, path_1.join)(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
            webviewTag: true,
            devTools: isDev,
        },
    });
    if (process.env.NODE_ENV === "development") {
        const rendererPort = process.argv[2];
        mainWindow.loadURL(`http://localhost:${rendererPort}`);
    }
    else {
        mainWindow.loadFile((0, path_1.join)(electron_1.app.getAppPath(), "renderer", "index.html"));
    }
    // MARK: - Dark, Light Mode
    electron_1.ipcMain.handle("dark-mode:toggle", () => {
        if (electron_1.nativeTheme.shouldUseDarkColors) {
            electron_1.nativeTheme.themeSource = "light";
        }
        else {
            electron_1.nativeTheme.themeSource = "dark";
        }
        return electron_1.nativeTheme.shouldUseDarkColors;
    });
    electron_1.ipcMain.handle("dark-mode:system", () => {
        electron_1.nativeTheme.themeSource = "system";
    });
    // MARK: = Minimize, Maximize, Close App
    if (!isMac) {
        electron_1.ipcMain.on("minimizeApp", () => {
            mainWindow.minimize();
        });
        electron_1.ipcMain.on("maximizeApp", () => {
            if (mainWindow.isMaximized()) {
                mainWindow.restore();
            }
            else {
                mainWindow.maximize();
            }
        });
        electron_1.ipcMain.on("closeApp", () => {
            mainWindow.close();
        });
    }
    // MARK: - Store data from local storage
    // ipcMain.on("save-locale", (event, arg) => {
    //   store.set("locale", arg);
    // });
    // ipcMain.on("get-locale", (event) => {
    //   if (store.get("locale")) {
    //     event.sender.send(store.get("locale"));
    //   } else {
    //     store.set("locale", "ko");
    //     event.sender.send("en");
    //   }
    // });
    remote.enable(mainWindow.webContents);
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
autoUpdate.update();
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.ipcMain.on("message", (event, message) => {
    console.log(message);
});
