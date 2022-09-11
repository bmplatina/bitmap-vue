<script setup lang="ts"></script>

<template>
  <div class="topBar">
    <div class="titleBar">
      <button id="showHideMenus" class="toggleButtons" @click="">
        <i class="bx bx-menu" id="btn"></i>
      </button>
      <img
        src="http://www.prodbybitmap.com/w/images/1/15/BitmapESD.png"
        alt="Bitmap"
        width="25px"
      />
      <div class="title">Bitmap</div>
    </div>
    <div class="titleBarButtons">
      <button class="topBtn minimizeBtn" id="minimizeBtn" title="Minimize">
        Mi
        <!-- <i class="fa-solid fa-window-minimize"></i> -->
      </button>
      <button class="topBtn maximizeBtn" id="maxResBtn" title="Maximize">
        Ma
        <!-- <i class="fa-light fa-window-maximize"></i> -->
      </button>
      <button class="topBtn closeBtn" id="closeBtn" title="Close">
        Cl
        <!-- <i class="fa-solid fa-xmark"></i> -->
      </button>
    </div>
  </div>
</template>

<style scoped>
.mainApp {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid #11101d;
  -webkit-box-sizing: border-box;
}

.mainApp > .topBar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  background-color: #1b1d23;
}

.topBar > .titleBar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.topBar > .titleBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.titleBar > .toggleButton {
  width: 45px;
  height: 40px;
  border: none;
  outline: none;
  background-color: transparent;
  background-image: url("");
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s;
  cursor: pointer;
}

.titleBar > .toggleButton:hover {
  background-color: #272c36;
}

.titleBar > .toggleButton:active {
  background-color: #4f9fee;
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

.title {
  color: #fff;
}

.topBar > .titleBarBtns {
  display: flex;
  flex-direction: row;
  width: 120px;
  height: 40px;
}

.titleBarBtns > .topBtn {
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s;
  cursor: pointer;
}

.titleBarBtns > .topBtn:hover {
  background-color: #272c36;
}

.titleBarBtns > .topBtn:active {
  background-color: #4f9fee;
}

.titleBarBtns > .minimizeBtn {
  background-image: url("");
}

.titleBarBtns > .maximizeBtn {
  background-image: url("");
}

.titleBarBtns > .restoreBtn {
  background-image: url("");
}

.titleBarBtns > .closeBtn {
  background-image: url("");
}
</style>
