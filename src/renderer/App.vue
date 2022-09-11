<script setup lang="ts">
import { ipcRenderer } from "./electron";
import Hello from "./components/Hello.vue";
import Menubar from "./components/Menubar.vue";
import Sidebar from "./components/Sidebar.vue";

ipcRenderer.send("message", "Hello from App.vue!");
</script>

<template>
  <div id="app">
    <!-- <Menubar /> -->
    <Sidebar />
    <Hello />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");
@import url("https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", "Apple SD Gothic Neo", "Spoqa Han Sans",
    "SpoqaHanSans", "Noto Sans KR", "Noto Sans", "Noto Sans CJK KR",
    "NanumBarunGothic", "Nanum Gothic", "KoPub Dotum", "Malgun Gothic",
    "맑은 고딕", sans-serif;
  -webkit-user-select: none;
  -webkit-app-region: no-drag;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #2c313c;
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background: #ddd;
    color: black;
  }
}

.home_content {
  position: absolute;
  margin-top: 42px;
  height: 100%;
  width: calc(100% - 78px);
  left: 78px;
  transition: all 0.5s ease;
}

.home_content .text {
  font-size: 25px;
  font-weight: 500;
  margin: 12px;
}

.sidebar.active ~ .home_content {
  width: calc(100% - 240px);
  left: 240px;
}
</style>
