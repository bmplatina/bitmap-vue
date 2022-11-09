<template>
  <div>
    Game List View
    <p>Whole API</p>
    <span>gameInfo: {{ games }}</span>
    <p>Listed API</p>
    <span v-for="(item, index) in games" :key="index">
      <p>gameTitle: {{ item.gameTitle }}</p>
      <p>gameEngine: {{ item.gameEngine }}</p>
    </span>
    <button class="dark-bg" v-if="isModalOpened" @click="isModalOpened = false">
      <div class="white-fg">
        <p>Submit to Bitmap Store</p>
        <webview
          src="https://docs.google.com/forms/d/e/1FAIpQLSfJ3LJQ-ru-_vyI4fgsw8hWjiUQp1Vq9XQ0IV6u_mleuKHnHQ/viewform?embedded=true"
        ></webview>
      </div>
    </button>
  </div>
  <footer>
    <a class="submit-games" v-if="!isModalOpened" @click="isModalOpened = true">
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
      isModalOpened: false,
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
  box-shadow: 1px 1px 1px 1px black;
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
  width: 60%;
  height: 80%;
  position: relative;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
}

webview {
  width: 100%;
  height: 96%;
}
</style>
