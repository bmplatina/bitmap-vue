<script setup lang="ts">
import Hello from "./components/Hello.vue";
import { ipcRenderer } from "./electron";

// ipcRenderer.send("message", "Hello from App.vue!");
</script>

<template>
  <div id="app">
    <Hello />
  </div>
</template>

<style>
@import url("https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css");
@import url("https://fonts.googleapis.com/css?family=Poppins");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", "Apple SD Gothic Neo", "Spoqa Han Sans",
    "SpoqaHanSans", "Noto Sans KR", "Noto Sans", "Noto Sans CJK KR",
    "NanumBarunGothic", "Nanum Gothic", "KoPub Dotum", "Malgun Gothic",
    "맑은 고딕", sans-serif;
  -webkit-user-select: none;
}

/* Dark, Light Mode */
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
</style>
