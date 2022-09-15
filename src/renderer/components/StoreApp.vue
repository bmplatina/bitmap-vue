<template>
  <div class="app_modal" v-if="isModalOpened">
    <div class="black_bg">
      <div class="white_bg">
        <webview
          src="https://docs.google.com/forms/d/e/1FAIpQLSfJ3LJQ-ru-_vyI4fgsw8hWjiUQp1Vq9XQ0IV6u_mleuKHnHQ/viewform?embedded=true"
          style="width: 1000px; height: 800px; margin: 8px"
        ></webview>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreAppModal",
  data() {
    return {
      isModalOpened: false,
    };
  },
};
</script>

<style scoped lang="css">
.app_modal {
  margin: 0;
  box-sizing: border-box;
}

.black_bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.white_bg {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}
</style>
