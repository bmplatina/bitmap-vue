<template>
  <div id="app">
    <div class="v0_3">
      <div class="sidebar">
        <span class="sidebar-title">Bitmap</span>
        <span class="discover">Discover</span>
        <button
          class="sidebar-elements-documents"
          v-for="(i, index) in menu.documents"
          :key="index"
        >
          <font-awesome-icon :icon="['fas', menuLogo.documents[index]]" />
          <span>{{ menu.documents[index] }}</span>
        </button>
        <button
          class="sidebar-elements-downloads"
          v-for="(i, index) in menu.downloads"
          :key="index"
        >
          <font-awesome-icon :icon="['fas', menuLogo.downloads[index]]" />
          <span>{{ menu.downloads[index] }}</span>
        </button>
        <button
          class="sidebar-elements-settings"
          v-for="(i, index) in menu.settings"
          :key="index"
        >
          <font-awesome-icon :icon="['fas', menuLogo.settings[index]]" />
          <span>{{ menu.settings[index] }}</span>
        </button>
        <span class="v105_4">Wiki</span>
        <span class="v105_5">Newsroom</span>
        <span class="v105_6">Blog</span>
        <span class="v105_7">Games</span>
        <span class="v105_8">Downloads</span>
        <span class="v105_9">Library</span>
        <span class="v105_10">Support</span>
        <span class="v105_11">Users</span>
        <span class="v105_12">Settings</span>
      </div>
      <span class="v105_14">Discover</span>
      <div class="discover">
        <div class="v105_13"></div>
        <div class="v105_16"></div>
        <span class="v105_17">{{ discoverTitles[0] }}</span>
        <span class="v105_15">{{ discoverTitles[1] }}</span>
      </div>
      <span class="v105_24">Our Works</span>
      <div class="works">
        <span class="v105_19">{{ works[0].title }} {{ works[0].author }}</span>
        <div class="v105_18"></div>
        <span class="v105_21">{{ works[1].title }} {{ works[1].author }}</span>
        <div class="v105_20"></div>
        <span class="v105_23">{{ works[2].title }} {{ works[2].author }}</span>
        <div class="v105_22"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from "./electron";
import Discover from "./components/TestApp_Discover.vue";

const menu = {
  documents: ["Discover", "Wiki", "Newsroom", "Blog"],
  downloads: ["Games", "Downloads", "Library"],
  settings: ["Support", "Users", "Settings"],
};
const menuLogo = {
  documents: ["house", "book-open", "news", "comments"],
  downloads: ["gamepad", "folder", "cloud-download"],
  settings: ["circle-question", "user-circle", "cog"],
};
const user = {
  name: "Platina",
  description: "Admin of Bitmap",
  imageURL: "",
};

const discoverTitles: String[] = [
  "Where does robot’s humanity come from?",
  "Metaverse Avatar License OX",
];
const works = [
  {
    imageURL: "http://i.ytimg.com/vi/KaC8ud7Ih90/maxresdefault.jpg",
    title: "God Version X Montage",
    author: "DongYoung",
  },
  {
    imageURL: "http://i.ytimg.com/vi/ugB-jsk0bbM/maxresdefault.jpg",
    title: "Feel Again ft. CYN",
    author: "Kyy, CYN",
  },
  {
    imageURL: "http://i.ytimg.com/vi/kblDVS52Swg/maxresdefault.jpg",
    title: "OPERATOR",
    author: "Platina, GuyS, Glam, Nlute, Vinson",
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins");

* {
  box-sizing: border-box;
}
body {
  font-size: 14px;
  font-family: "Poppins", "Apple SD Gothic Neo", "Spoqa Han Sans",
    "SpoqaHanSans", "Noto Sans KR", "Noto Sans", "Noto Sans CJK KR",
    "NanumBarunGothic", "Nanum Gothic", "KoPub Dotum", "Malgun Gothic",
    "맑은 고딕", sans-serif;
}
.v0_3 {
  width: 100%;
  height: 1024px;
  background: rgba(31, 29, 43, 1);
  opacity: 1;
  position: relative;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.sidebar-title {
  width: 164px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 83px;
  left: 54px;
  font-weight: Bold;
  font-size: 48px;
  opacity: 1;
  text-align: left;
}
.v105_4 {
  width: 46px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 256px;
  left: 54px;
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.discover {
  width: 94px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 178px;
  left: 54px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_5 {
  width: 116px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 308px;
  left: 54px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_6 {
  width: 50px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 360px;
  left: 54px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_7 {
  width: 77px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 438px;
  left: 54px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_8 {
  width: 121px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 490px;
  left: 55px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_9 {
  width: 74px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 542px;
  left: 55px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_10 {
  width: 87px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 620px;
  left: 55px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_11 {
  width: 63px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 672px;
  left: 55px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_12 {
  width: 89px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 724px;
  left: 55px;
  font-family: "Helvetica Neue";
  font-weight: "Regular";
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v105_14 {
  width: 202px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 83px;
  left: 310px;
  font-family: "Helvetica75";
  font-weight: Bold;
  font-size: 48px;
  opacity: 1;
  text-align: left;
}
.v105_13 {
  width: 654px;
  height: 279px;
  background: url("../images/v105_13.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 178px;
  left: 310px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
}
.v105_16 {
  width: 408px;
  height: 279px;
  background: url("../images/v105_16.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 178px;
  left: 27px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
}
.v105_15 {
  width: 391px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 207px;
  left: 335px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Helvetica75";
  font-weight: Bold;
  font-size: 36px;
  opacity: 1;
  text-align: left;
}
.v105_17 {
  width: 391px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 207px;
  left: 10px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Helvetica75";
  font-weight: Bold;
  font-size: 36px;
  opacity: 1;
  text-align: left;
}
.v105_24 {
  width: 243px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 528px;
  left: 310px;
  font-family: "Helvetica75";
  font-weight: Bold;
  font-size: 48px;
  opacity: 1;
  text-align: left;
}
.v105_19 {
  width: 270px;
  color: url("../images/v105_19.png");
  position: absolute;
  top: 844px;
  left: 310px;
  opacity: 1;
  text-align: left;
}
.v105_18 {
  width: 327px;
  height: 188px;
  background: url("../images/v105_18.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 625px;
  left: 310px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
}
.v105_21 {
  width: 209px;
  color: url("../images/v105_21.png");
  position: absolute;
  top: 844px;
  left: 332px;
  opacity: 1;
  text-align: left;
}
.v105_20 {
  width: 327px;
  height: 183px;
  background: url("../images/v105_20.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 625px;
  left: 332px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
}
.v105_23 {
  width: 309px;
  color: url("../images/v105_23.png");
  position: absolute;
  top: 844px;
  left: 53px;
  opacity: 1;
  text-align: left;
}
.v105_22 {
  width: 328px;
  height: 184px;
  background: url("../images/v105_22.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: absolute;
  top: 629px;
  left: 53px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  overflow: hidden;
}
</style>
