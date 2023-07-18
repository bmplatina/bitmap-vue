<template>
  <div class="background">
    <div class="game-modal">
      <h3 style="padding: 10px">
        {{ $t("bitmapTitle") }} {{ $t("store") }}:
        {{ gameInfo.gameTitle }}
      </h3>
      <hr size="0.5px" style="padding: 2px" />
      <div style="float: left; width: 34%; margin-top: 3%">
        <center>
          <img class="game-images" :src="gameInfo.gamePosterURL" :alt="gameInfo.gameTitle" />
          <h1 class="text-color">{{ gameInfo.gameTitle }}</h1>
          <!-- <div class="install-btns">
              <button
                class="install-interactions"
                v-if="!isGameInstalled[gameIndex]"
              >
                {{ $t("installGame") }}
              </button>
              <div v-else-if="isGameInstalled[gameIndex]">
                <button
                  class="install-interactions update"
                  v-if="installedGameVersion[gameIndex] < gameInfo.gameVersion"
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
                  v-if="isGameInstalling[gameIndex]"
                >
                  <hr size="0.5px" style="padding: 2px" />
                  <progress
                    :value="gameInstallPercentage[gameIndex]"
                    max="100"
                    id="downloadProgress"
                  ></progress>
                  <button class="install-interactions remove">
                    {{ $t("cancel") }}
                  </button>
                </div>
              </div>
            </div> -->
        </center>
      </div>
      <div style="float: right; width: 66%">
        <div align="left">
          <h1 class="text-color">{{ gameInfo.gameTitle }}</h1>
          <h3 class="text-color" v-show="gameInfo.isEarlyAccess">
            {{ $t("earlyAccess") }}
          </h3>
          <img class="platform modal" src="./assets/platformWindows11.png" alt="Windows"
            v-show="gameInfo.gamePlatformWindows" />
          <img class="platform modal" src="./assets/platformMac.png" alt="macOS" v-show="gameInfo.gamePlatformMac" />
          <img class="platform modal" src="./assets/platformAndroid.png" alt="Android"
            v-show="gameInfo.gamePlatformMobile" />
          <img class="platform modal" src="./assets/platformIOS.png" alt="iOS, iPadOS"
            v-show="gameInfo.gamePlatformMobile" />
          <p class="text-color">
            {{ $t("releasedDate") }}{{ gameInfo.gameReleasedDate }}
          </p>
          <p class="text-color">{{ $t("genre") }}{{ gameInfo.gameGenre }}</p>
          <p class="text-color">
            {{ $t("devFull") }}{{ gameInfo.gameDeveloper }}
          </p>
          <p class="text-color">
            {{ $t("publisher") }}{{ gameInfo.gamePublisher }}
          </p>
          <a class="text-color" :href="gameInfo.gameWebsite" target="_blank">{{
            $t("viewGameWebsite")
          }}</a>
        </div>

        <hr size="0.5px" style="padding: 2px" />
        <div class="modal-container preview">
          <h1 class="text-color">{{ $t("preview") }}</h1>
          <hr size="0.5px" style="padding: 2px" />
          <center>
            <webview :src="'https://www.youtube.com/embed/' + gameInfo.gameVideoURL" style="width: 540px; height: 304px">
            </webview>
          </center>
        </div>
        <div class="modal-container description">
          <h1 class="text-color">{{ gameInfo.gameHeadline }}</h1>
          <hr size="0.5px" style="padding: 2px" />
          <p class="text-color" style="padding: 10px; text-align: left">
            {{ gameInfo.gameDescription }}
          </p>
        </div>
        <div class="modal-container requirements">
          <h1 class="text-color">{{ $t("requirements") }}</h1>
          <div v-show="gameInfo.gamePlatformWindows">
            <h2 class="text-color">Windows</h2>
            <img class="platform modal" src="./assets/platformWindows11.png" alt="Windows"
              v-show="gameInfo.gamePlatformWindows" />
            <p class="text-color">{{ $t("REQ_WIN") }}</p>
          </div>
          <div v-show="gameInfo.gamePlatformMac">
            <h2 class="text-color">macOS</h2>
            <img class="platform modal" src="./assets/platformMac.png" alt="macOS" v-show="gameInfo.gamePlatformMac" />
            <p class="text-color">{{ $t("REQ_MAC") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from "../electron";

export default {
  props: {
    gameInfo: {
      type: Object,
      default: () => {
        return {
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
        };
      },
    },
  },
  data() {
    return {
      isGameInstalled: false,
      isGameInstalling: false,
      overridePlatform: false,
      gameInstallPercentage: 0.0,
      installedGameVersion: 1.0,
    };
  },
  computed: {
    checkPlatform() {
      if (process.platform == "darwin") {
        // If macOS
        if (this.gameInfo.gamePlatformMac) {
          return true;
        } else if (this.gameInfo.gamePlatformWindows) {
          return false;
        }
      } else if (process.platform == "win32") {
        // If Windows
        if (this.gameInfo.gamePlatformWindows) {
          return true;
        } else if (this.gameInfo.gamePlatformMac) {
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
    async executeDownloadAndExtract(targetPath: string) {
      const url = process.platform === 'darwin' ? this.gameInfo.gameDownloadMacURL : this.gameInfo.gameDownloadWinURL;
      try {
        const response = await ipcRenderer.invoke('downloadAndExtract', { url, targetPath });
        return response;
      } catch (error) {
        console.error('다운로드 및 압축 해제 실행 오류:', error);
        return false;
      }
    }
  },
};
</script>
<style scoped>
.game-images {
  position: relative;
  display: flex;
  align-content: center;
  width: 250px;
  border-radius: 24px;
  box-shadow: 0px 0px 12px #000;
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
  .background {
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
  .background {
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
