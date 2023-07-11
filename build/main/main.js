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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const isDev = __importStar(require("electron-is-dev"));
const remote = __importStar(require("@electron/remote/main"));
const autoUpdate = __importStar(require("./updater"));
// import { download } from "electron-dl";
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const adm_zip_1 = __importDefault(require("adm-zip"));
// import { autoUpdater } from "electron-updater";
// import log from "electron-log";
const electron_store_1 = __importDefault(require("electron-store"));
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = electron_1.TouchBar;
const isMac = process.platform === "darwin", store = new electron_store_1.default();
let currentLocale, mainWindow, childWindow;
if (store.get("locale")) {
    currentLocale = store.get("locale");
}
else {
    currentLocale = "en";
}
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        electron_1.app.setAsDefaultProtocolClient("bitmap-esd", process.execPath, [
            path.resolve(process.argv[1]),
        ]);
    }
}
else {
    electron_1.app.setAsDefaultProtocolClient("bitmmap-esd");
}
remote.initialize();
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
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
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
            webviewTag: true,
            devTools: isDev,
        },
    });
    childWindow = new electron_1.BrowserWindow({
        parent: mainWindow,
        show: false,
    });
    if (process.env.NODE_ENV === "development") {
        const rendererPort = process.argv[2];
        mainWindow.loadURL(`http://localhost:${rendererPort}`);
    }
    else {
        mainWindow.loadFile(path.join(electron_1.app.getAppPath(), "renderer", "index.html"));
    }
    // MARK: - Deep Link
    // Windows
    const gotTheLock = electron_1.app.requestSingleInstanceLock();
    if (!gotTheLock) {
        electron_1.app.quit();
    }
    else {
        electron_1.app.on("second-instance", (event, commandLine, workingDirectory) => {
            if (mainWindow) {
                if (mainWindow.isMinimized()) {
                    mainWindow.restore();
                }
                mainWindow.focus();
            }
        });
    }
    // macOS, Linux
    electron_1.app.on("open-url", (event, url) => {
        electron_1.dialog.showErrorBox("Welcome Back", "You arrived from ${url}");
    });
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
    // MARK: - Minimize, Maximize, Close App when target is not macOS
    if (!isMac) {
        electron_1.ipcMain.on("minimizeApp", () => {
            mainWindow.minimize();
        });
        electron_1.ipcMain.on("maximizeApp", () => {
            if (mainWindow.isMaximized()) {
                mainWindow.restore();
                mainWindow.webContents.send("window_restored");
            }
            else {
                mainWindow.maximize();
                mainWindow.webContents.send("window_maximized");
            }
        });
        electron_1.ipcMain.on("closeApp", () => {
            mainWindow.close();
        });
    }
    // MARK: - Store data from local storage
    electron_1.ipcMain.on("save-locale", (event, arg) => {
        store.set("locale", arg);
    });
    electron_1.ipcMain.on("get-locale", (event) => {
        event.sender.send("return-get-locale", currentLocale);
    });
    // MARK: - Download ZIP
    electron_1.ipcMain.on("downloadAndExtract", async (event, { url, targetPath }) => {
        try {
            await downloadAndExtractZip(url, targetPath);
            event.reply("downloadAndExtractComplete", true);
        }
        catch (error) {
            console.error("다운로드 및 압축해제 오류: ", error);
            event.reply("downloadAndExtractComplete", false);
        }
    });
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
// MARK: - Download Assets
async function downloadAndExtractZip(url, targetPath) {
    const zipFilePath = path.join(targetPath, "temp.zip"); // 임시 zip 파일 경로
    // 파일 다운로드
    const response = await (0, axios_1.default)({
        url: url,
        responseType: "stream",
    });
    const writer = fs.createWriteStream(zipFilePath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
    // 압축 해제
    const zip = new adm_zip_1.default(zipFilePath);
    zip.extractAllTo(targetPath, true);
    // 임시 zip 파일 삭제
    fs.unlinkSync(zipFilePath);
}
