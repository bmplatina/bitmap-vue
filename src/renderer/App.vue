<script setup lang="ts">
import { ipcRenderer } from "./electron";

import Games from "./components/Games.vue";
import ProjectFiles from "./components/ProjectFiles.vue";
import Library from "./components/Library.vue";
import User from "./components/User.vue";
import Settings from "./components/Settings.vue";
import Contest from "./components/BMPEC2022.vue";
</script>

<script defer lang="ts">
export default {
  name: "MenuBar",
  data() {
    return {
      isWin: navigator.platform === "Win32",
      isActive: false,
      selectedMenu: 0,
      downloadsString: this.$t("downloads"),
      bmpecString: this.$t("BMPEC_INITIAL"),
      menu: [
        this.$t("wiki"),
        this.$t("newsRoom"),
        this.$t("blog"),
        this.$t("projectFiles"),
        this.$t("games"),
        this.$t("dlLibrary"),
        this.$t("users"),
        this.$t("settings"),
        "BMPEC2022",
      ],
      menuLogo: [
        "bx-book-open",
        "bx-news",
        "bx-chat",
        "bx-folder",
        "bx-game",
        "bx-cloud-download",
        "bx-user-circle",
        "bx-cog",
        "bx-crown",
      ],
      user: {
        name: "Platina",
        description: "Developer Mode",
      },
      selectedMenuToString: function () {
        let menu: String = "";
        if (this.selectedMenu == 3 || this.selectedMenu == 4) {
          menu = this.downloadsString;
        } else if (this.selectedMenu == 8) {
          menu = this.bmpecString;
        } else {
          menu = this.menu[this.selectedMenu];
        }
        return menu;
      },
    };
  },
  components: {},
};
</script>

<template>
  <div id="app">
    <!-- menuBar -->
    <div class="menuBar">
      <div class="topBar">
        <div class="titleBar" :class="{ is_windows_or_fullscreen: isWin }">
          <img src="./components/assets/BitmapESD.png" id="bmp_img" />
          <div class="title">{{ $t("bitmapTitle") }}</div>
        </div>
        <div class="titleBarButtons" v-if="isWin">
          <button
            class="topBtn minimizeBtn"
            id="minimizeBtn"
            title="Minimize"
          ></button>
          <button
            class="topBtn maximizeBtn"
            id="maxResBtn"
            title="Maximize"
          ></button>
          <button class="topBtn closeBtn" id="closeBtn" title="Close"></button>
        </div>
      </div>
    </div>
    <!-- sideBar -->
    <div class="sidebar no_windows" :class="{ active: isActive }">
      <div class="logo_content">
        <div class="logo">
          <div class="logo_name">
            {{ $t("bitmapTitle") }}: {{ selectedMenuToString() }}
          </div>
        </div>
        <button
          id="showHideMenus"
          class="toggleButtons"
          @click="isActive = !isActive"
        >
          <i class="bx bx-menu" id="btn"></i>
        </button>
        <!-- Here -->
      </div>
      <ul class="nav_list">
        <li>
          <a href="#">
            <i class="bx bx-search" @click="isActive = !isActive"></i>
            <form action="http://prodbybitmap.com/w/index.php" method="GET">
              <input type="search" :placeholder="$t('search') + '...'" />
            </form>
          </a>
          <span class="tooltip">{{ $t("search") }}</span>
        </li>
        <li></li>
        <li v-for="(menuElements, index) in menu" :key="index">
          <!-- <a href="#" target="_blank"> -->
          <a v-on:click="selectedMenu = index">
            <i class="bx" :class="`${menuLogo[index]}`"></i>
            <span class="links_name" style="white-space: nowrap">{{
              menu[index]
            }}</span>
          </a>
          <span class="tooltip" style="white-space: nowrap">{{
            menu[index]
          }}</span>
        </li>
      </ul>
      <div class="profile_content">
        <div class="profile">
          <div class="profile_details">
            <!-- <img src="" alt=""> -->
            <div class="name_job">
              <div class="name">{{ user.name }}</div>
              <div class="name">{{ user.description }}</div>
            </div>
          </div>
          <i class="bx bx-log-out" id="log_out"></i>
        </div>
      </div>
    </div>
    <div class="home_content">
      <!-- Main, Wiki -->
      <webview
        src="http://prodbybitmap.com/"
        style="width: 100%; height: 100%"
        v-if="selectedMenu == 0"
      ></webview>
      <!-- Newsroom -->
      <webview
        src="http://prodbybitmap.com/commission/bitmap_notices/"
        style="width: 100%; height: 100%"
        v-if="selectedMenu == 1"
      ></webview>
      <!-- Blog -->
      <webview
        src="http://prodbybitmap.com/commission/blog/"
        style="width: 100%; height: 100%"
        v-if="selectedMenu == 2"
      ></webview>
      <ProjectFiles v-if="selectedMenu == 3" />
      <Games v-if="selectedMenu == 4" />
      <Library v-if="selectedMenu == 5" />
      <User v-if="selectedMenu == 6" />
      <Settings v-if="selectedMenu == 7" />
      <Contest v-if="selectedMenu == 8" />
    </div>
  </div>
</template>

<style lang="css">
@import url("https://fonts.googleapis.com/css?family=Poppins");
@import url("https://fonts.googleapis.com/earlyaccess/notosanskr.css");
@import url("https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css");

/* Global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", "Noto Sans KR", "Apple SD Gothic Neo",
    "Spoqa Han Sans", "SpoqaHanSans", "Noto Sans", "Noto Sans CJK KR",
    "NanumBarunGothic", "Nanum Gothic", "KoPub Dotum", "Malgun Gothic",
    "맑은 고딕", sans-serif;
  -webkit-user-select: none;
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
  overflow: auto;
  position: fixed;
  margin-top: 34px;
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

/* Menu Bar */
.menuBar {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 0px solid #11101d;
  -webkit-box-sizing: border-box;
}

.menuBar > .topBar {
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 35px;
  background-color: #1b1d23;
}

.topBar > .titleBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 75px;
  width: 100%;
}

.topBar > .titleBar.is_windows_or_fullscreen {
  margin-left: 0px;
}

.titleBar > img {
  margin-left: 10px;
}

.titleBar > .title {
  margin-left: 10px;
  width: 100%;
  line-height: 30px;
  margin-top: 5px;
  padding-bottom: 5px;
  -webkit-app-region: drag;
}

.topBar > .titleBarButtons {
  display: flex;
  flex-direction: row;
  width: 120px;
  height: 34px;
}

.titleBarButtons > .topBtn {
  width: 34px;
  height: 34px;
  border: none;
  outline: none;
  background-color: #1b1d23;
  background-repeat: no-repeat;
  background-position: center;
  transform: 0.5s ease;
  cursor: pointer;
}
.titleBarButtons > .topBtn:hover {
  background-color: #272c36;
  transform: 0.5s ease;
}
.titleBarButtons > .topBtn:active {
  background-color: #4f9fee;
}

.title {
  color: #fff;
}

#bmp_img {
  width: 22px;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 78px;
  margin-top: 0px;
  background: #11101d;
  padding: 6px 14px;
  transition: all 0.5s ease;
}

.sidebar.no_windows {
  margin-top: 36px;
}

.sidebar.active {
  width: 240px;
}

.sidebar .logo_content .logo {
  color: #fff;
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease;
}

.sidebar.active .logo_content .logo {
  opacity: 1;
  pointer-events: none;
}

.logo_content .logo i {
  font-size: 28px;
  margin-right: 5px;
}

.logo_content .logo .logo_name {
  font-size: 20px;
  font-weight: 400;
}

.sidebar #btn {
  position: absolute;
  color: #fff;
  left: 50%;
  top: 6px;
  font-size: 20px;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  transform: translateX(-50%);
}

.toggleButtons {
  border: none;
  background-color: #11101d;
  background: #11101d;
}

.sidebar.active #btn {
  left: 90%;
}

.sidebar ul {
  margin-top: 20px;
}

.sidebar ul li {
  position: relative;
  height: 50px;
  width: 100%;
  margin: 0 5px;
  list-style: none;
  line-height: 50px;
}

.sidebar ul li .tooltip {
  position: absolute;
  left: 122px;
  top: 0;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  height: 35px;
  width: 122px;
  /* background: #000; */
  line-height: 35px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: 0s;
  opacity: 0;
  pointer-events: none;
  display: block;
}

.sidebar.active ul li .tooltip {
  display: none;
}

.sidebar ul li:hover .tooltip {
  transition: all 0.5s ease;
  opacity: 1;
  top: 50%;
}

.sidebar ul li input {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 12px;
  outline: none;
  border: none;
  background: #1d1b31;
  padding-left: 50px;
  font-size: 18px;
  color: #fff;
}

.sidebar ul li .bx-search {
  position: absolute;
  transform: translateY(50%);
  z-index: 99;
  color: #fff;
  font-size: 22px;
  transition: all 0.5s ease;
}

.sidebar ul li .bx-search:hover {
  background: #fff;
  color: #1d1b31;
}

.sidebar ul li a {
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  border-radius: 12px;
  white-space: nowrap;
}

.sidebar ul li a:hover {
  color: #11101d;
  background: #fff;
}

.sidebar ul li i {
  height: 50px;
  min-width: 50px;
  border-radius: 12px;
  line-height: 50px;
  text-align: center;
}

.sidebar .links_name {
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease;
}

.sidebar.active .links_name {
  opacity: 1;
  pointer-events: auto;
}

.sidebar .profile_content {
  position: absolute;
  color: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 40px;
}

.sidebar .profile_content .profile {
  position: relative;
  padding: 10px 6px;
  height: 60px;
  background: #1d1b31;
  transition: all 0.5s ease;
}

.sidebar.active .profile_content .profile {
  background: none;
}

.sidebar .profile_content .profile .profile_details {
  display: flex;
  align-items: center;
  opacity: 1;
  pointer-events: none;
  white-space: nowrap;
}

.sidebar.active .profile .profile_details {
  opacity: 1;
  pointer-events: auto;
}

.profile .profile_details img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 12px;
}

.profile .profile_details .name_job {
  margin-left: 10px;
  opacity: 0;
  transition: all 0.4s ease;
}

.sidebar.active .name_job {
  opacity: 1;
  transition: all 0.4s ease;
}

.profile .profile_details .name {
  font-size: 15px;
  font-weight: 400;
}

.profile .profile_details .job {
  font-size: 12px;
}

.profile #log_out {
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translateX(-50%);
  min-width: 50px;
  line-height: 50px;
  font-size: 20px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.4s ease;
  background: #1d1b31;
}

.sidebar.active .profile #log_out {
  left: 88%;
  background: none;
}
</style>
