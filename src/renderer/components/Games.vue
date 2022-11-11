<template>
  <div style="padding: 20px">
    <header>
      <h1>Games</h1>
    </header>
    <div class="title"></div>
    <table class="lists">
      <td v-for="(item, index) in games" :key="index" style="padding: 15px">
        <a class="game-thumbnails" @click="gameModal = index">
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
      </td>
    </table>
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
          <div style="float: left; width: 34%">
            <center>
              <img
                class="game-images"
                :src="games[gameModal].gameImageURL"
                :alt="games[gameModal].gameTitle"
              />
              <h1>{{ games[gameModal].gameTitle }}</h1>
            </center>
          </div>
          <div style="float: right; width: 66%">
            <div align="left">
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
              <a :href="games[gameModal].gameWebsite" target="_blank"
                >View Website</a
              >
            </div>

            <hr size="0.5px" style="padding: 2px" />
            <div class="modal-container preview">
              <h1>Preview</h1>
              <hr size="0.5px" style="padding: 2px" />
              <center>
                <webview
                  src="https://www.youtube.com/embed/WSLxwXMwIog"
                  style="width: 540px; height: 304px"
                ></webview>
              </center>
            </div>
            <div class="modal-container description">
              <h1>{{ games[gameModal].gameHeadline }}</h1>
              <hr size="0.5px" style="padding: 2px" />
              <p>{{ games[gameModal].gameDescription }}</p>
            </div>
            <hr size="0.5px" style="padding: 2px" />
            <div class="modal-container requirements">
              <h1>Requirements</h1>
              <p>REQ_WIN, REQ_MAC</p>
            </div>
            <div class="install-btns">
              <button
                class="install-interactions"
                v-if="!isGameInstalled[gameModal]"
              >
                Install
              </button>
              <div v-else-if="isGameInstalled[gameModal]">
                <button
                  class="install-interactions update"
                  v-if="
                    installedGameVersion[gameModal] <
                    games[gameModal].gameVersion
                  "
                >
                  Update
                </button>
                <button class="install-interactions open">Run</button>
                <button class="install-interactions remove">Remove</button>
                <div
                  class="installing-progress"
                  v-if="isGameInstalling[gameModal]"
                >
                  <hr size="0.5px" style="padding: 2px" />
                  <progress
                    :value="gameInstallPercentage[gameModal]"
                    max="100"
                    id="downloadProgress"
                  ></progress>
                  <button class="install-interactions remove">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
  <footer>
    <a
      v-if="!isSubmitModalOpened && gameModal == -1"
      class="submit-games"
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
      isGameInstalled: [false],
      isGameInstalling: [false],
      gameInstallPercentage: [0.0],
      installedGameVersion: [1.0],
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
  computed: {},
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
  top: 62%;
  left: 50%;
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
  max-height: 100%;
  overflow-y: auto;
}
.modal-container {
  background: #485163;
  color: #000;
  border-radius: 24px;
  margin-bottom: 24px;
}
@media (prefers-color-scheme: dark) {
  .white-fg.game-view {
    background: #2c313c;
    color: white;
  }
  .platform.modal {
    height: 22px;
    filter: contrast(0%) brightness(200%);
  }
}

@media (prefers-color-scheme: light) {
  .white-fg.game-view {
    background: #5d677e;
    color: white;
  }
  .platform.modal {
    height: 22px;
    filter: contrast(0%) brightness(0%);
  }
}
</style>
