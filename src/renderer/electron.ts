/*
   Add all your exposed Electron API's here.
   The purpose of this is to get static analysis in Vue files without additional plug-ins.
 */
import { IpcRenderer } from "electron";
import axios from "axios";

const ipcRenderer = window.electron.ipcRenderer as IpcRenderer;

const config = {
  gameJsonURL: "http://api.prodbybitmap.com/games/game_pretest.json",
  projectFileJsonURL: "",
};

function gameAPI() {
  return axios.get(config.gameJsonURL);
}

function projectFileAPI() {
  return axios.get(config.projectFileJsonURL);
}

export { ipcRenderer, gameAPI, projectFileAPI };
