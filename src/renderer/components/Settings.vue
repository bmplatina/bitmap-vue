<template>
  <div>Settings View</div>
  <button
    @click="
      $i18n.locale = 'ko';
      currentLanguage = 'ko';
      if (initialLanguage != currentLanguage) {
        isRestartRequiredSettingsChanged = true;
      }
      saveLocale();
    "
  >
    한국어 (Korean)
  </button>
  <button
    @click="
      $i18n.locale = 'en';
      currentLanguage = 'en';
      if (initialLanguage != currentLanguage) {
        isRestartRequiredSettingsChanged = true;
      }
      saveLocale();
    "
  >
    English
  </button>
  <h3 v-show="isRestartRequiredSettingsChanged">{{ $t("requireRestart") }}</h3>
</template>
<script defer lang="ts">
import { ipcRenderer } from "../electron";

export default {
  data() {
    return {
      initialLanguage: this.$i18n.locale,
      currentLanguage: "ko",
      isRestartRequiredSettingsChanged: false,
    };
  },
  created() {},
  methods: {
    saveLocale() {
      ipcRenderer.send("save-locale", this.currentLanguage);
    },
    getLocale() {
      ipcRenderer.send("get-locale");
      ipcRenderer.on("return-get-locale", (arg) => {
        console.log(arg);
      });
    },
  },
  computed: {},
};
</script>
<style lang="css"></style>
