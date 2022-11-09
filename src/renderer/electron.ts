/*
   Add all your exposed Electron API's here.
   The purpose of this is to get static analysis in Vue files without additional plug-ins.
 */
import { IpcRenderer } from "electron";
import axios from "axios";

const ipcRenderer = window.electron.ipcRenderer as IpcRenderer;

const config = {
  baseURL: "http://api.prodbybitmap.com/games/game.json",
};

function gameAPI() {
  return axios.get(config.baseURL);
}

export { ipcRenderer, gameAPI };
