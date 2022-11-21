<script setup lang="ts">
defineProps<{
  link: String;
}>();
</script>

<template>
  <webview :src="link"></webview>
</template>

<style scoped lang="css">
* {
  width: 100%;
  height: 100%;
}
</style>
