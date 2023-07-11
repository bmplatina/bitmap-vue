<script setup lang="ts">
import { dialog } from "electron";
import { response } from "express";
import GameInfo from "./GameInfo.vue";
</script>

<template>
  <div style="padding: 20px">
    <header>
      <h1>{{ $t("games") }}</h1>
    </header>
    <a
      href="#"
      class="exit-modal"
      v-if="gameModal > -1"
      @click="gameModal = -1"
    >
      <font-awesome-icon icon="fa-solid fa-x" />
    </a>
    <div class="title"></div>
    <table class="lists">
      <td v-for="(item, index) in games" :key="index" style="padding: 15px">
        <a class="game-thumbnails" @click="gameModal = index">
          <img
            class="game-images"
            :src="item.gamePosterURL"
            :alt="item.gameTitle"
          />
          <div class="game-dialogue">
            <div class="game-name">
              <p>{{ item.gameTitle }}</p>
              <img
                class="platform main"
                src="./assets/platformWindows11.png"
                alt="Windows"
                v-show="item.gamePlatformWindows"
              />
              <img
                class="platform main"
                src="./assets/platformMac.png"
                alt="macOS"
                v-show="item.gamePlatformMac"
              />
              <img
                class="platform main"
                src="./assets/platformAndroid.png"
                alt="Android"
                v-show="item.gamePlatformMobile"
              />
              <img
                class="platform main"
                src="./assets/platformIOS.png"
                alt="iOS, iPadOS"
                v-show="item.gamePlatformMobile"
              />
            </div>
            <div class="game-info">
              {{ item.gameGenre }}
              <hr size="0.5px" style="padding: 2px" />
              {{ $t("devShort") }}{{ item.gameDeveloper }}
            </div>
          </div>
        </a>
      </td>
    </table>
    <transition name="slide" class="transition-position">
      <GameInfo :gameInfo="games[gameModal]" v-show="gameModal > -1" />
    </transition>
  </div>
  <footer>
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSfJ3LJQ-ru-_vyI4fgsw8hWjiUQp1Vq9XQ0IV6u_mleuKHnHQ/viewform?embedded=true"
      target="_blank"
      class="submit-games"
    >
      <font-awesome-icon icon="fa-solid fa-upload" />
    </a>
  </footer>
</template>

<script defer lang="ts">
import { gameAPI, ipcRenderer } from "../electron";

export default {
  data() {
    return {
      gameModal: -1,
      games: [
        {
          gameTitle: "",
          gameVersion: 1.0,
          gamePlatformWindows: false,
          gamePlatformMac: false,
          gamePlatformMobile: false,
          gameEngine: "",
          gameGenre: "",
          gameDeveloper: "",
          gamePublisher: "",
          isEarlyAccess: false,
          isReleased: false,
          gameReleasedDate: "",
          gameWebsite: "",
          gameVideoURL: "",
          gameDownloadMacURL: "",
          gameDownloadWinURL: "",
          gameLogoURL: "",
          gameBannerURL: "",
          gamePosterURL: "",
          gameBinaryName: "",
          gameHeadline: "",
          gameDescription: "",
        },
      ],
    };
  },
  created() {
    gameAPI()
      .then((response) => (this.games = response.data.games))
      .catch((error) => console.log(error));
  },
};
</script>

<style scoped lang="css">
.game-thumbnails {
  position: static;
  display: flex 1 1 auto;
  padding: 20px;
  width: 250px;
  filter: brightness(100%);
  transition: all 0.5s ease;
}
.game-thumbnails:hover {
  filter: brightness(60%);
  transition: all 0.5s ease;
}
.game-images {
  position: relative;
  display: flex;
  align-content: center;
  width: 250px;
  border-radius: 24px;
  box-shadow: 0px 0px 12px #000;
}
.game-dialogue {
  position: absolute;
  top: 60%;
  left: 80%;
  width: 220px;
}
.game-name {
  font-size: large;
  text-shadow: 0px 0px 12px #000;
}
.game-info {
  font-size: small;
}
.platform {
  padding-right: 8px;
}
.platform.main {
  height: 16px;
  filter: contrast(0%) brightness(200%) drop-shadow(0px 0px 12px #000);
}
.game-info {
  text-shadow: 0px 0px 12px #000;
}
.exit-modal {
  position: fixed;
  right: 25px;
  top: 50px;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;

  color: white;
  background: #4188f1;
  border: none;
  outline: none;
  box-shadow: 0px 0px 20px #000;
}
footer .submit-games {
  position: fixed;
  right: 25px;
  bottom: 25px;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;

  color: white;
  background: #4188f1;
  border: none;
  outline: none;
  box-shadow: 0px 0px 20px #000;
}
.transition-position {
  position: absolute;
  top: 0;
}
.slide-enter-from {
  opacity: 0;
  margin-left: 100%;
  margin-right: -100%;
  filter: drop-shadow(0px 0px 12px #000);
}
.slide-enter-active {
  transition: all 0.75s ease;
}
.slide-enter-to {
  opacity: 1;
  margin-left: 0%;
  margin-right: 0%;
  filter: drop-shadow(0px 0px 0px #000);
}
</style>
