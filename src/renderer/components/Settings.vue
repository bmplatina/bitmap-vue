<template>
  <div>Settings View</div>
  <button
    @click="
      $i18n.locale = 'ko';
      currentLanguage = 'ko';
      if (initialLanguage != currentLanguage) {
        isRestartRequiredSettingsChanged = true;
      }
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
    "
  >
    English
  </button>
  <h3 v-show="isRestartRequiredSettingsChanged">{{ $t("requireRestart") }}</h3>
</template>
<script defer lang="ts">
export default {
  data() {
    return {
      initialLanguage: this.$i18n.locale,
      currentLanguage: "ko",
      isRestartRequiredSettingsChanged: false,
    };
  },
  created() {},
  methods: {},
  computed: {},
};
</script>
<style lang="css"></style>
