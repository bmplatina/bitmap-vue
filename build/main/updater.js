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
const electron_updater_1 = require("electron-updater");
const ProgressBar = __importStar(require("electron-progressbar"));
electron_updater_1.autoUpdater.autoDownload = false;
module.exports = () => {
    electron_updater_1.autoUpdater.checkForUpdates();
    let progressBar;
    // 업데이트가 가능한지 확인하는 부분이다.
    // 업데이트가 가능한 경우 팝업이 뜨면서 업데이트를 하겠냐고 묻는다.
    // Update를 클릭하면 업데이트 가능한 파일을 다운로드 받는다.
    electron_updater_1.autoUpdater.on("update-available", () => {
        electron_1.dialog
            .showMessageBox({
            type: "info",
            title: "Update available",
            message: "A new version of Bitmap ESD is available. Do you want to update now?",
            buttons: ["Update", "Later"],
        })
            .then((result) => {
            const buttonIndex = result.response;
            if (buttonIndex === 0) {
                electron_updater_1.autoUpdater.downloadUpdate;
            }
        });
    });
    // progress bar가 없으면 업데이트를 다운받는 동안 사용자가 그 내용을 알 수 없기 때문에 progress bar는 꼭 만들어준다.
    electron_updater_1.autoUpdater.once("download-progress", (progressObj) => {
        progressBar = new ProgressBar({
            text: "Downloading",
            detail: "Downloading",
        });
        progressBar
            .on("completed", function () {
            console.info("Completed");
            progressBar.detail = "Task completed. Exiting...";
        })
            .on("aborted", function () {
            console.info("Aborted");
        });
    });
    // 업데이트를 다운받고 나면 업데이트 설치 후 재시작을 요청하는 팝업이 뜬다.
    electron_updater_1.autoUpdater.on("update-downloaded", () => {
        progressBar.setCompleted();
        electron_1.dialog
            .showMessageBox({
            type: "info",
            title: "Update ready",
            message: "Install & restart now?",
            buttons: ["Restart", "Later"],
        })
            .then((result) => {
            const buttonIndex = result.response;
            if (buttonIndex === 0)
                electron_updater_1.autoUpdater.quitAndInstall(false, true);
        });
    });
};
