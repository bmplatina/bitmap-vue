<!-- <script setup lang="ts">
defineProps<{
  dialogue: String;
}>();
</script> -->

<template>
  <div style="padding: 20px">
    <header>
      <h1>{{ $t("games") }}</h1>
    </header>
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
    <button class="dark-bg" v-if="gameModal > -1" @click="gameModal = -1">
      <div class="white-fg game-view" v-show="gameModal > -1">
        <div class="game-modal">
          <h3 style="padding: 10px">
            {{ $t("bitmapTitle") }} {{ $t("store") }}:
            {{ games[gameModal].gameTitle }}
          </h3>
          <hr size="0.5px" style="padding: 2px" />
          <div style="float: left; width: 34%; margin-top: 3%">
            <center>
              <img
                class="game-images"
                :src="games[gameModal].gamePosterURL"
                :alt="games[gameModal].gameTitle"
              />
              <h1 class="text-color">{{ games[gameModal].gameTitle }}</h1>
              <div class="install-btns">
                <button
                  class="install-interactions"
                  v-if="!isGameInstalled[gameModal]"
                >
                  {{ $t("installGame") }}
                </button>
                <div v-else-if="isGameInstalled[gameModal]">
                  <button
                    class="install-interactions update"
                    v-if="
                      installedGameVersion[gameModal] <
                      games[gameModal].gameVersion
                    "
                  >
                    {{ $t("update") }}
                  </button>
                  <button class="install-interactions open">
                    {{ $t("runGame") }}
                  </button>
                  <button class="install-interactions remove">
                    {{ $t("remove") }}
                  </button>
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
                    <button class="install-interactions remove">
                      {{ $t("cancel") }}
                    </button>
                  </div>
                </div>
              </div>
            </center>
          </div>
          <div style="float: right; width: 66%">
            <div align="left">
              <h1 class="text-color">{{ games[gameModal].gameTitle }}</h1>
              <h3 class="text-color" v-show="games[gameModal].isEarlyAccess">
                {{ $t("earlyAccess") }}
              </h3>
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
              <p class="text-color">
                {{ $t("releasedDate") }}{{ games[gameModal].gameReleasedDate }}
              </p>
              <p class="text-color">
                {{ $t("genre") }}{{ games[gameModal].gameGenre }}
              </p>
              <p class="text-color">
                {{ $t("devFull") }}{{ games[gameModal].gameDeveloper }}
              </p>
              <p class="text-color">
                {{ $t("publisher") }}{{ games[gameModal].gamePublisher }}
              </p>
              <a
                class="text-color"
                :href="games[gameModal].gameWebsite"
                target="_blank"
                >{{ $t("viewGameWebsite") }}</a
              >
            </div>

            <hr size="0.5px" style="padding: 2px" />
            <div class="modal-container preview">
              <h1 class="text-color">{{ $t("preview") }}</h1>
              <hr size="0.5px" style="padding: 2px" />
              <center>
                <webview
                  :src="
                    'https://www.youtube.com/embed/' +
                    games[gameModal].gameVideoURL
                  "
                  style="width: 540px; height: 304px"
                ></webview>
              </center>
            </div>
            <div class="modal-container description">
              <h1 class="text-color">{{ games[gameModal].gameHeadline }}</h1>
              <hr size="0.5px" style="padding: 2px" />
              <p class="text-color" style="padding: 10px; text-align: left">
                {{ games[gameModal].gameDescription }}
              </p>
            </div>
            <div class="modal-container requirements">
              <h1 class="text-color">{{ $t("requirements") }}</h1>
              <div v-show="games[gameModal].gamePlatformWindows">
                <h2 class="text-color">Windows</h2>
                <img
                  class="platform modal"
                  src="./assets/platformWindows11.png"
                  alt="Windows"
                  v-show="games[gameModal].gamePlatformWindows"
                />
                <p class="text-color">{{ $t("REQ_WIN") }}</p>
              </div>
              <div v-show="games[gameModal].gamePlatformMac">
                <h2 class="text-color">macOS</h2>
                <img
                  class="platform modal"
                  src="./assets/platformMac.png"
                  alt="macOS"
                  v-show="games[gameModal].gamePlatformMac"
                />
                <p class="text-color">{{ $t("REQ_MAC") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
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
import { dialog } from "electron";
import { response } from "express";
import { gameAPI, ipcRenderer } from "../electron";

export default {
  data() {
    return {
      gameModal: -1,
      isGameInstalled: [false],
      isGameInstalling: [false],
      overridePlatform: [false, false, false],
      gameInstallPercentage: [0.0],
      installedGameVersion: [1.0],
      games: [
        {
          gameTitle: "",
          gamePlatformWindows: false,
          gamePlatformMac: false,
          gamePlatformMobile: false,
          gameGenre: "",
          gameDeveloper: "",
          gamePublisher: "",
          gamePosterURL: "",
        },
      ],
    };
  },
  created() {
    gameAPI()
      .then((response) => (this.games = response.data.games))
      .catch((error) => console.log(error));
  },
  computed: {
    checkPlatform() {
      if (process.platform == "darwin") {
        // If macOS
        if (this.games[this.gameModal].gamePlatformMac) {
          return true;
        } else if (this.games[this.gameModal].gamePlatformWindows) {
          return false;
        }
      } else if (process.platform == "win32") {
        // If Windows
        if (this.games[this.gameModal].gamePlatformWindows) {
          return true;
        } else if (this.games[this.gameModal].gamePlatformMac) {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    downloadGame(url: String, fileName: String, directory: String) {
      ipcRenderer.send("download", {
        payload: {
          url,
          properties: {
            fileName,
            directory,
          },
        },
      });
    },
    // platformOverrideDialog() {
    //   dialog
    //     .showMessageBox({
    //       type: "question",
    //       buttons: [this.$t("cancel"), this.$t("ok")],
    //       defaultId: 1,
    //       title: this.$t("UNSUPPORTED_PLATFORM"),
    //       message: this.$t("UNSUPPORTED_PLATFORM"),
    //       detail: this.$t("FORCE_INSTALL_UNSUPPORTED_PLATFORM_MAC"),
    //       cancelId: 0,
    //       noLink: false,
    //       normalizeAccessKeys: false,
    //     })
    //     .then((box) => {
    //       console.log("Button Clicked Index - ", box.response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
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
  top: 0;
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
.white-fg.game-view {
  width: 90%;
  height: 90%;
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
  .text-color {
    color: #fff;
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
  .text-color {
    color: #000;
  }
  .platform.modal {
    height: 22px;
    filter: contrast(0%) brightness(0%);
  }
}
</style>
