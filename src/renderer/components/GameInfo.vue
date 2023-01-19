<script setup lang="ts">
defineProps<{
  gameIndex: Number;
}>();
</script>
<template>
  <div></div>
</template>

<script lang="ts">
import { gameAPI, ipcRenderer } from "../electron";

export default {
  data() {
    return {
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
<style scoped></style>
