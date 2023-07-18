import {
  app,
  BrowserWindow,
  dialog,
  Menu,
  shell,
  globalShortcut,
  ipcMain,
  nativeTheme,
  TouchBar,
} from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
import * as remote from "@electron/remote/main";
import * as autoUpdate from "./updater";
// import { download } from "electron-dl";
import * as fs from "fs";
import axios from "axios";
import * as AdmZip from "adm-zip";

// import { autoUpdater } from "electron-updater";
// import log from "electron-log";
import Store from "electron-store";

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;
const isMac = process.platform === "darwin",
  store = new Store();
let currentLocale, mainWindow, childWindow;

if (store.get("locale")) {
  currentLocale = store.get("locale");
} else {
  currentLocale = "en";
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("bitmap-esd", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("bitmmap-esd");
}

async function downloadAndExtractZip(url, targetPath) {
  const zipFilePath = path.join(targetPath, "temp.zip"); // 임시 zip 파일 경로

  // 파일 다운로드
  const response = await axios({
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
  const zip = new AdmZip(zipFilePath);
  zip.extractAllTo(targetPath, true);

  // 임시 zip 파일 삭제
  fs.unlinkSync(zipFilePath);
}

remote.initialize();

function createWindow() {
  mainWindow = new BrowserWindow({
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

  childWindow = new BrowserWindow({
    parent: mainWindow,
    show: false,
  });
  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "renderer", "index.html"));
  }

  // MARK: - Deep Link
  // Windows
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
  } else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }
    });
  }
  // macOS, Linux
  app.on("open-url", (event, url) => {
    dialog.showErrorBox("Welcome Back", "You arrived from ${url}");
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

  // MARK: - Minimize, Maximize, Close App when target is not macOS
  if (!isMac) {
    ipcMain.on("minimizeApp", () => {
      mainWindow.minimize();
    });
    ipcMain.on("maximizeApp", () => {
      if (mainWindow.isMaximized()) {
        mainWindow.restore();
        mainWindow.webContents.send("window_restored");
      } else {
        mainWindow.maximize();
        mainWindow.webContents.send("window_maximized");
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

  // MARK: - Download Assets
  ipcMain.on("downloadAndExtract", async (event, { url, targetPath }) => {
    try {
      await downloadAndExtractZip(url, targetPath);
      event.reply("downloadAndExtractComplete", true);
    } catch (error) {
      console.error("다운로드 및 압축 해제 오류: ", error);
      event.reply("downloadAndExtractComplete", false);
    }
  });
  /* ipcMain.on("download", async (event, { payload }) => {
    // mainWindow.webContents.downloadURL(payload.url);
    let properties = payload.properties ? { ...payload.properties } : {};
    const defaultPath = app.getPath(
      properties.directory ? properties.directory : "documents"
    );
    const defaultFileName = properties.fileName
      ? properties.fileName
      : payload.url.split("?")[0].split("/").pop();
    let customURL = dialog.showSaveDialogSync({
      defaultPath: `${defaultPath}/${defaultFileName}`,
    });
    if (customURL) {
      let filePathByURL = customURL.split("/");
      let fileNameByURL = `${filePathByURL.pop()}`;
      let directory = filePathByURL.join("/");
      properties = { ...properties, directory, fileNameByURL };
      await download(BrowserWindow.getFocusedWindow(), payload.url, {
        ...properties,
      });
    } else {
      // Save Cancelled
    }
  }); */

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
