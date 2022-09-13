<template>
  <div class="sidebar" :class="{ active: isActive }">
    <div class="logo_content">
      <div class="logo">
        <div class="logo_name">Bitmap</div>
      </div>
      <button
        id="showHideMenus"
        class="toggleButtons"
        @click="isActive = !isActive"
      >
        <i class="bx bx-menu" id="btn"></i>
      </button>
      <!-- Here -->
    </div>
    <ul class="nav_list">
      <li>
        <a href="#">
          <i class="bx bx-search" @click="isActive = !isActive"></i>
          <form action="http://prodbybitmap.com/w/index.php" method="GET">
            <input type="search" placeholder="Search..." />
          </form>
        </a>
        <span class="tooltip">Search</span>
      </li>
      <li></li>
      <li v-for="(menuElements, index) in menu" :key="index">
        <a href="#" target="_blank">
          <i class="bx" :class="`${menuLogo[index]}`"></i>
          <span class="links_name">{{ menu[index] }}</span>
        </a>
        <span class="tooltip">{{ menu[index] }}</span>
      </li>
    </ul>
    <div class="profile_content">
      <div class="profile">
        <div class="profile_details">
          <!-- <img src="" alt=""> -->
          <div class="name_job">
            <div class="name">{{ user.name }}</div>
            <div class="name">{{ user.description }}</div>
          </div>
        </div>
        <i class="bx bx-log-out" id="log_out"></i>
      </div>
    </div>
  </div>
</template>

<script defer lang="ts">
export default {
  name: "SideBar",
  data() {
    return {
      isActive: false,
      menu: [
        "Wiki",
        "Newsroom",
        "Blog",
        "Project Files",
        "Games",
        "Library",
        "Users",
        "Settings",
      ],
      menuLogo: [
        "bx-book-open",
        "bx-news",
        "bx-chat",
        "bx-folder",
        "bx-game",
        "bx-cloud-download",
        "bx-user-circle",
        "bx-cog",
      ],
      user: {
        name: "Platina",
        description: "Admin of Bitmap",
      },
    };
  },
  components: {},
};
</script>

<style scoped lang="css">
.sidebar {
  position: fixed;
  margin-top: 37px;
  top: 0;
  left: 0;
  height: 100%;
  width: 78px;
  background: #11101d;
  padding: 6px 14px;
  transition: all 0.5s ease;
}

.sidebar.active {
  width: 240px;
}

.sidebar .logo_content .logo {
  color: #fff;
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease;
}

.sidebar.active .logo_content .logo {
  opacity: 1;
  pointer-events: none;
}

.logo_content .logo i {
  font-size: 28px;
  margin-right: 5px;
}

.logo_content .logo .logo_name {
  font-size: 20px;
  font-weight: 400;
}

.sidebar #btn {
  position: absolute;
  color: #fff;
  left: 50%;
  top: 6px;
  font-size: 20px;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  transform: translateX(-50%);
}

.sidebar.active #btn {
  left: 90%;
}

.sidebar ul {
  margin-top: 20px;
}

.sidebar ul li {
  position: relative;
  height: 50px;
  width: 100%;
  margin: 0 5px;
  list-style: none;
  line-height: 50px;
}

.sidebar ul li .tooltip {
  position: absolute;
  left: 122px;
  top: 0;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  height: 35px;
  width: 122px;
  /* background: #000; */
  line-height: 35px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: 0s;
  opacity: 0;
  pointer-events: none;
  display: block;
}

.sidebar.active ul li .tooltip {
  display: none;
}

.sidebar ul li:hover .tooltip {
  transition: all 0.5s ease;
  opacity: 1;
  top: 50%;
}

.sidebar ul li input {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 12px;
  outline: none;
  border: none;
  background: #1d1b31;
  padding-left: 50px;
  font-size: 18px;
  color: #fff;
}

.sidebar ul li .bx-search {
  position: absolute;
  transform: translateY(50%);
  z-index: 99;
  color: #fff;
  font-size: 22px;
  transition: all 0.5s ease;
}

.sidebar ul li .bx-search:hover {
  background: #fff;
  color: #1d1b31;
}

.sidebar ul li a {
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  border-radius: 12px;
  white-space: nowrap;
}

.sidebar ul li a:hover {
  color: #11101d;
  background: #fff;
}

.sidebar ul li i {
  height: 50px;
  min-width: 50px;
  border-radius: 12px;
  line-height: 50px;
  text-align: center;
}

.sidebar .links_name {
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s ease;
}

.sidebar.active .links_name {
  opacity: 1;
  pointer-events: auto;
}

.sidebar .profile_content {
  position: absolute;
  color: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 40px;
}

.sidebar .profile_content .profile {
  position: relative;
  padding: 10px 6px;
  height: 60px;
  background: #1d1b31;
  transition: all 0.5s ease;
}

.sidebar.active .profile_content .profile {
  background: none;
}

.sidebar .profile_content .profile .profile_details {
  display: flex;
  align-items: center;
  opacity: 1;
  pointer-events: none;
  white-space: nowrap;
}

.sidebar.active .profile .profile_details {
  opacity: 1;
  pointer-events: auto;
}

.profile .profile_details img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 12px;
}

.profile .profile_details .name_job {
  margin-left: 10px;
  opacity: 0;
  transition: all 0.4s ease;
}

.sidebar.active .name_job {
  opacity: 1;
  transition: all 0.4s ease;
}

.profile .profile_details .name {
  font-size: 15px;
  font-weight: 400;
}

.profile .profile_details .job {
  font-size: 12px;
}

.profile #log_out {
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translateX(-50%);
  min-width: 50px;
  line-height: 50px;
  font-size: 20px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.4s ease;
  background: #1d1b31;
}

.sidebar.active .profile #log_out {
  left: 88%;
  background: none;
}
</style>
