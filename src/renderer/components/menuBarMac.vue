<script setup lang="ts"></script>

<template>
  <div class="menuBar">
    <div class="topBar">
      <div class="titleBar">
        <button id="showHideMenus" class="toggleButtons" @click="">
          <i class="bx bx-menu" id="btn"></i>
        </button>
        <img src="./assets/BitmapESD.png" id="bmp_img" />
        <div class="title">Bitmap</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menuBar {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid #11101d;
  -webkit-box-sizing: border-box;
}

.menuBar > .topBar {
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
}

.topBar > .titleBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.titleBar > .toggleButton {
  width: 45px;
  height: 35px;
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

#bmp_img {
  width: 22px;
}
</style>
