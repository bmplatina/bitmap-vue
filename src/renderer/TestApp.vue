<template>
  <div id="app">
    <div class="sidebar">
      <span class="logo">S</span>
      <a href="#" class="logo-expand">Bitmap</a>
      <div class="side-wrapper">
        <div class="side-title">MENU</div>
        <div class="side-menu">
          <a
            href="#"
            class="sidebar-link is-active"
            v-for="(menuElements, index) in menu"
            :key="index"
          >
            <font-awesome-icon :icon="['fas', menuLogo[index]]" />
            {{ menu[index] }}
          </a>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="header">
        <div class="search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div class="user-settings">
          <img
            alt=""
            class="user-img"
            src="https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80"
          />
          <div class="user-name">{{ user.name }}</div>
          <div class="notify">
            <div class="notification"></div>
            <font-awesome-icon icon="fa-solid fa-bell" />
          </div>
        </div>
      </div>
      <div class="main-container">
        <Discover />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from "./electron";
import Discover from "./components/TestApp_Discover.vue";

const menu: String[] = [
  "Discover",
  "Wiki",
  "Newsroom",
  "Blog",
  "Project Files",
  "Games",
  "Library",
  "Support",
  "Users",
  "Settings",
];
const menuLogo: String[] = [
  "house",
  "book-open",
  "news",
  "comments",
  "folder",
  "gamepad",
  "cloud-download",
  "circle-question",
  "user-circle",
  "cog",
];
const user = {
  name: "Platina",
  description: "Admin of Bitmap",
  imageURL: "",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins");
* {
  outline: none;
  box-sizing: border-box;
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
}

:root {
  --body-font: "Inter", sans-serif;
  --theme-bg: #1f1d2b;
  --body-color: #808191;
  --button-bg: #353340;
  --border-color: rgb(128 129 145 / 24%);
  --video-bg: #252936;
  --delay: 0s;
}

body {
  font-family: "Poppins", "Apple SD Gothic Neo", "Spoqa Han Sans",
    "SpoqaHanSans", "Noto Sans KR", "Noto Sans", "Noto Sans CJK KR",
    "NanumBarunGothic", "Nanum Gothic", "KoPub Dotum", "Malgun Gothic",
    "맑은 고딕", sans-serif;
  background-color: #1f1d2b;
}
</style>
