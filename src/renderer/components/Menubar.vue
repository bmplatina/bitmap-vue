<template>
  <div class="menuBar">
    <div class="topBar">
      <div class="titleBar">
        <img src="./assets/BitmapESD.png" id="bmp_img" />
        <div class="title">Bitmap</div>
      </div>
      <div class="titleBarButtons" v-if="isWin == true">
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
  </div>
</template>

<script defer lang="ts">
const maxResBtn = document.getElementById(('maxResBtn'));
export default {
  name: "MenuBar",
  data() {
    return {
      isWin: navigator.platform === 'Win32'
    };
  },
  components: {},
};
</script>

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
}

.topBar > .titleBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
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
