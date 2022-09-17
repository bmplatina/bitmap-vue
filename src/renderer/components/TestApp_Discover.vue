<template>
  <div class="main-header anim" style="--delay: 0s">Discover</div>
  <div class="main-blogs">
    <div class="main-blog anim" style="--delay: 0.1s">
      <div class="main-blog__title">{{ article1.title }}</div>
      <div class="main-blog__author">
        <div class="author-img__wrapper">
          <font-awesome-icon
            :icon="['fas', 'check']"
            class="feather feather-check"
          />
          <img
            src="https://images.unsplash.com/photo-1560941001-d4b52ad00ecc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
            class="author-img"
          />
        </div>
        <div class="author-detail">
          <div class="author-name">{{ article1.author }}</div>
          <div class="author-info">{{ article1.authorInfo }}</div>
        </div>
      </div>
    </div>
    <div class="main-blog anim" style="--delay: 0.2s">
      <div class="main-blog__title">{{ article2.title }}</div>
      <div class="main-blog__author tips">
        <div class="author-img__wrapper">
          <font-awesome-icon
            :icon="['fas', 'check']"
            class="feather feather-check"
          />
          <img
            class="author-img"
            src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fG1lbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div class="author-detail">
          <div class="author-name">{{ article2.author }}</div>
          <div class="author-info">{{ article2.authorInfo }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="small-header anim" style="--delay: 0.3s">Recommended</div>
  <div class="recommend">
    <!-- div class: videos -->
    <div class="recommended anim" style="--delay: 0.4s">
      <!-- div class: video anim -->
      <div class="recommended-wrapper">
        <!-- div class: video-wrapper -->
        <div class="recommended-title">
          <!-- div class: video-by -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "Discover",
  data() {
    return {
      article1: {
        title: "Join Bitmap",
        author: "Platina",
        authorInfo: "Administrator of Bitmap",
      },
      article2: {
        title: "Bitmap Games",
        author: "이재혁",
        authorInfo: "서울예술대학교 디지털아트전공",
      },
    };
  },
};
</script>
<style lang="css">
:root {
  --body-font: "Inter", sans-serif;
  --theme-bg: #1f1d2b;
  --body-color: #808191;
  --button-bg: #353340;
  --border-color: rgb(128 129 145 / 24%);
  --video-bg: #252936;
  --delay: 0s;
}
</style>
