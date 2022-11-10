<template>
  <div>
    <p>Games</p>
    <div class="title"></div>
    <div class="lists">
      <a
        class="game-thumbnails"
        v-for="(item, index) in games"
        :key="index"
        @click="gameModal = index"
      >
        <img
          class="game-images"
          :src="item.gameImageURL"
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
            Dev: {{ item.gameDeveloper }}
          </div>
        </div>
      </a>
    </div>
    <button
      class="dark-bg"
      v-if="isSubmitModalOpened || gameModal > -1"
      @click="
        isSubmitModalOpened = false;
        gameModal = -1;
      "
    >
      <div class="white-fg submit-box" v-if="isSubmitModalOpened">
        <p>Submit to Bitmap Store</p>
        <webview
          src="https://docs.google.com/forms/d/e/1FAIpQLSfJ3LJQ-ru-_vyI4fgsw8hWjiUQp1Vq9XQ0IV6u_mleuKHnHQ/viewform?embedded=true"
        ></webview>
      </div>
      <div class="white-fg game-view" v-show="gameModal > -1">
        <div class="game-modal">
          <img
            class="game-images"
            :src="games[gameModal].gameImageURL"
            :alt="games[gameModal].gameTitle"
          />
          <h1>{{ games[gameModal].gameTitle }}</h1>
          <h3 v-show="games[gameModal].isEarlyAccess">EARLY ACCESS</h3>
          <img
            class="platform modal"
            src="./assets/platformWindows11.png"
            alt="Windows"
            v-show="games[gameModal].gamePlatformWindows"
          />
          <img
            class="platform modal"
            src="./assets/platformMac.png"
            alt="macOS"
            v-show="games[gameModal].gamePlatformMac"
          />
          <img
            class="platform modal"
            src="./assets/platformAndroid.png"
            alt="Android"
            v-show="games[gameModal].gamePlatformMobile"
          />
          <img
            class="platform modal"
            src="./assets/platformIOS.png"
            alt="iOS, iPadOS"
            v-show="games[gameModal].gamePlatformMobile"
          />
          <p>Released on {{ games[gameModal].gameReleasedDate }}</p>
          <p>Genre: {{ games[gameModal].gameGenre }}</p>
          <p>Developer: {{ games[gameModal].gameDeveloper }}</p>
          <p>Publisher: {{ games[gameModal].gamePublisher }}</p>
          <hr size="0.5px" style="padding: 2px" />
          <a :href="games[gameModal].gameWebsite">View Website</a>
          <hr size="0.5px" style="padding: 2px" />
          <h1>Preview</h1>
          <webview
            src="https://www.youtube.com/embed/WSLxwXMwIog"
            style="width: 480px; height: 270px"
          ></webview>
          <hr size="0.5px" style="padding: 2px" />
          <h1>{{ games[gameModal].gameHeadline }}</h1>
          <p>{{ games[gameModal].gameDescription }}</p>
          <hr size="0.5px" style="padding: 2px" />
          <h1>Requirements</h1>
          <p></p>
        </div>
      </div>
    </button>
  </div>
  <footer>
    <a
      class="submit-games"
      v-if="!isSubmitModalOpened && gameModal == -1"
      @click="isSubmitModalOpened = true"
    >
      <font-awesome-icon icon="fa-solid fa-upload" />
    </a>
  </footer>
</template>
<script defer lang="ts">
import { response } from "express";
import { gameAPI } from "../electron";
export default {
  data() {
    return {
      isSubmitModalOpened: false,
      gameModal: -1,
      games: [
        {
          gameTitle: "",
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
          gameDownloadMacURL: "",
          gameImageURL: "",
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
  position: relative;
  display: flex 1 1 auto;
  padding: 20px;
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
  left: 50%;
  width: 220px;
}
.game-name {
  font-size: large;
  text-shadow: 0px 0px 12px #000;
}
.platform {
  height: 16px;
  padding-right: 8px;
}
.platform.main {
  filter: contrast(0%) brightness(200%) drop-shadow(0px 0px 12px #000);
}
.platform.modal {
  filter: contrast(0%) brightness(0%);
}
.game-info {
  text-shadow: 0px 0px 12px #000;
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
footer .submit-button:hover {
  background: #4caf5d;
}
.dark-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  padding: 20px;
  border: none;
}
.white-fg {
  position: relative;
  background: #fff;
  border-radius: 12px;
}

.white-fg.submit-box {
  width: 60%;
  height: 80%;
  padding: 10px;
}
.white-fg.game-view {
  width: 80%;
  height: 80%;
  padding: 10px;
}
.white-fg webview {
  width: 100%;
  height: 96%;
}
.game-modal {
  width: 100%;
  height: 100%;
}
</style>
