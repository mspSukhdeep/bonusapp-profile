<template>
<div>
  <router-view v-if="pageType === 'standAlone'"></router-view>
  <div v-else-if="pageType === 'headered'">
    <bonus-head>
    </bonus-head>
    <router-view></router-view>
  </div>
  <div v-else-if="pageType === 'default'">
    <bonus-head>
    </bonus-head>
    <div class="wrpr">
      <blocked-page v-if="isBlocked">
      </blocked-page>
      <div v-else-if="desktop">
          <profile-head></profile-head>
          <div class="sctn clearfix">
              <sidebar></sidebar>
              <div class="prfl-wrpr">
              <router-view></router-view>
            </div>
          </div>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ProfileHead from "./components/ProfileHead";
import Sidebar from "./components/Sidebar";
import store from "./store";
import BonusHead from "./components/BonusHead";
import BlockedPage from "./components/BlockedPage";

import UTILS from "./utils";

export default {
  name: "app",
  components: {
    ProfileHead,
    Sidebar,
    BonusHead,
    BlockedPage
  },
  computed: {
    desktop() {
      return this.$store.state.app.window.width > 1200;
    },
    size() {
      return this.$store.state.app.window.width;
    },
    isBlocked() {
      return this.$store.state.profile.user_status === "blocked";
    },
    device() {
      return this.$store.state.app.device;
    },
    pageType() {
      return this.$route.meta.pageType;
    }
  },
  store,
  created() {
    let qS = UTILS.queryString();
    if (qS && qS.device_os === "android" && qS.auth_token) {
      UTILS.cookie.set("msp_login", "1", 1);
      UTILS.cookie.set("msp_login_email", qS.email, 1);
      UTILS.cookie.set("msp_token", qS.auth_token, 1);
      this.$store.commit("updateAppState", {
        device: "app",
        type: qS.network?"MSP":"BONUS"
      });
    }
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.$store.commit("updateWindowSize", {
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  },
  watch: {
    $route(to) {
      
      if (this.device === "app"  && typeof(Android)!="undefined") {
        try {
          Android.changeTitle(
            UTILS.title.get(to.path)
          );
        } catch (ex) {
          console.warn("Failed to Updated Status Bar");
        }
      }
    }
  }
};
</script>

<style lang="less">
@import "./style/bonus_profile.less";
</style>
