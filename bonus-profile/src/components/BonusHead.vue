<template>
    <header class="hdr clearfix" v-disable="'app'">
      <div class="wrpr">
        <a href="/">
          <img src="https://assets.mspcdn.net/f_auto/bonus_in/logo/large/bonus_white.png" class="hdr__logo" />
        </a>
        <router-link to="/">
          <div class="hdr-link clearfix">
            <img class="hdr-link__img" :src="profile.image || 'https://assets.mspcdn.net/f_auto/bonus_in/icon/user.png'" />
            <div class="hdr-link__info" v-display="'desktop'">
                <div class="hdr-link__main">
                  Your Account
                </div>
                <div class="hdr-link__eml">
                    {{profile.email}}
                </div>
            </div>
          </div>
        </router-link>
        <div class="hdr__cb">
            {{coins}}
        </div>
      </div>
    </header>
</template>
<script>
import UTILS from "../utils";

export default {
  name: "BonusHead",
  computed: {
    coins: function() {
      return UTILS.number.format(
        this.$store.state.profile.pending_cashback +
          this.$store.state.profile.verified_cashback
      );
    },
    profile: function() {
      return this.$store.state.profile;
    }
  }
};
</script>

<style lang="less">
@import "../style/bonus_profile.less";
.hdr {
  background-color: @color-green;
  padding: 10px;
  color: @color-white;
  &-link {
    float: right;
    margin-left: 20px;
    color: @color-off-white;
    &__img {
      width: 34px;
      border-radius: 50%;
      float: left;
    }
    &__info {
      float: left;
      margin: 2px 0 2px 10px;
      width: 125px;
    }
    &__main {
      line-height: 13px;
      font-size: @font-size-2xs;
      font-weight: @bold;
      text-transform: uppercase;
    }
    &__eml {
      .ellipsis();
      margin-top: 3px;
      font-size: @font-size-xs;
    }
  }
  &__logo {
    height: 32px;
    float: left;
  }
  &__cb {
    float: right;
    margin-top: 2px;
    border-radius: 6px;
    padding: 8px 8px 8px 29px;
    background: #007164
      url("https://assets.mspcdn.net/f_auto/bonus_in/icon/coin.png") no-repeat
      left 8px center/16px;
    font-weight: @semi-bold;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    line-height: 15px;
    letter-spacing: 0.5px;
    font-size: @font-size-xs;
  }
}

@media screen and (max-width: @breakpoint) {
  .hdr {
    &__logo {
      height: 21px;
      margin: 6px 0 4px 0;
    }
    &__cb {
      margin-top: 0;
    }
    &-link {
      margin-top: 2px;
      &__img {
        width: 26px;
      }
    }
  }
}
</style>
