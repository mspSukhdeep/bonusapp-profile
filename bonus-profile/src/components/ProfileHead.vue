<template>
    <div class="prfl__wrpr">
        <div class="sctn prfl clearfix">
            <div class="prfl__inr clearfix">
                <div class="usr-wdgt clearfix">
                    <div class="usr-wdgt__img-wrpr">
                        <img class="usr-wdgt__img" :src="profile.image" onerror="this.onerror=null;this.src='https://assets.mspcdn.net/f_auto/bonus_in/icon/user.png';">
                          <span class="icn-bsns" @click="showNotification=!showNotification" v-if="profile.user_status==='business'">Business User</span>
                    </div>
                    <div class="usr-wdgt__info">
                        <div class="usr-wdgt__name">{{profile.name || "Hi User!"}}
                            <span class="bdg--pro" v-if="false">PRO</span>
                        </div>
                        <div class="usr-wdgt__eml">{{profile.email}}
                            <span class="unvrfd" v-if="false"></span>
                        </div>
                        <div class="usr-wdgt__mob" v-if="profile.mobile">
                            <span class="icn-mob"></span> {{profile.mobile}}
                        </div>
                    </div>
                </div>
                <div class="prfl__rght">
                    <cashback-widget></cashback-widget>
                </div>
            </div>

        <div class="prfl__ntfctn prfl__ntfctn--expnd" :class="{'':notificationExpanded}" v-if="profile.user_status==='business' && showNotification">
            This account is now labeled as <strong>Business Account</strong>. The following stores are not eligible for Bonusapp cashback due to respective store policy towards bulk transactions:
            <div class="prfl__ntfctn-sctn">
              <span class="prfl__ntfctn-item">
                {{bulkStores.join(", ")}}
              </span>
            </div>
            <div class="prfl__ntfctn-btn-wrpr">
              <div class="btn btn--s prfl__ntfctn-btn" @click="userAgree">
                I understand
              </div>
            </div>
            <div class="prfl__ntfctn-more" v-if="!notificationExpanded">
              <span class="prfl__ntfctn-more-txt" @click="notificationExpanded = true">
                Read More
              </span>
              
            </div>
        </div>
        </div>
    </div>
</template>


<script>
import CashbackWidget from "./CashbackWidget";

export default {
  name: "ProfileHead",
  components: {
    CashbackWidget
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  data: function() {
    return {
      bulkStores: [
        "Amazon",
        "Flipkart",
        "Koovs",
        "AJIO",
        "LimeRoad",
        "MyVishal",
        "Reliance Trends",
        "Booking.com",
        "Hotels.com"
      ],
      notificationExpanded: true,
      showNotification: !localStorage.getItem('business_agree')
    };
  },
  methods: {
    userAgree: function(){
      this.showNotification  = false;
      localStorage.setItem('business_agree', true)
    }
  }
};
</script>

<style lang="less">
@import "../style/bonus_profile.less";

.prfl {
  padding: 30px;
  margin-top: 10px;
  min-height: 80px;
  &__wrpr {
    background-color: @color-white;
  }

  &__ntfctn {
    position: relative;
    margin-top: 30px;
    border-radius: 3px;
    font-size: @font-size-xs;
    color: @fg-color-light;
    line-height: 20px;
    padding: 12px 14px;
    background-color: rgba(245, 166, 35, 0.1);
    border: 1px solid rgba(245, 166, 35, 0.2);
    overflow: hidden;
    height: 50px;
    &-btn{
      padding: 8px 15px !important;
      &-wrpr{
        text-align: right;
        margin-top: 10px;
      }
    }
    &--expnd{
      height: auto;
    }
    &-more {
      position: absolute;
      width: 100%;
      height: 30px;
      z-index: 2;
      bottom: 0;
      left: 0;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
      &-txt{
        position: absolute;
        right: 10px;
        bottom: 5px;
        font-weight: @bold;
        font-size: @font-size-xs;
        color: @fg-color;
        cursor: pointer;
      }
    }
    &-sctn {
      margin: 10px 0;
    }
    &-item {
      font-weight: @semi-bold;
      & + & {
        margin-left: 15px;
      }
    }
  }

  &--ldng {
    background: linear-gradient(
      to right,
      #f6f7f9 0%,
      #e9ebee 20%,
      #f6f7f9 40%,
      #f6f7f9 100%
    );
    background-size: 400% 400%;
    animation: rotate-bg 1s ease infinite;
    position: relative;
    overflow: hidden;
    &:after {
      position: absolute;
      left: 0;
      top: 0;
      content: "";
      width: 100%;
      height: 100%;
      .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/shell/desktop_profile.png', 100%);
      background-position: center center;
    }
  }
  &__rght {
    float: right;
  }
  &__sdbr {
    float: left;
    width: 287px;
  }
  &-wrpr {
    float: left;
    width: 712px;
    border-left: 1px solid @border-color;
    min-height: 544px;
    position: relative;
  }
  &-sctn {
    padding: 15px;
    &__ttl {
      font-size: @font-size-xl;
      font-weight: @bold;
    }
    &__fltrs {
      float: right;
      margin: 3px 18px 0 0;
      .user-select();
    }
  }
}

.unvrfd {
  .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/error-grey.png', 15px);
  width: 15px;
  height: 15px;
  display: inline-block;
  position: relative;
  left: 2px;
  top: 3px;
}

.bdg {
  &--pro {
    padding: 3px 8px;
    font-weight: @bold;
    font-size: @font-size-2xs;
    border-radius: 2px;
    border: 1px solid #e8bf7a;
    color: @color-white;
    background: linear-gradient(to right, #f6c621, #dc9e16);
    line-height: 1;
    position: relative;
    top: -2px;
    left: 2px;
  }
}

@keyframes rotate-bg {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media screen and (max-width: @breakpoint) {
  .prfl {
    &__ntfctn{
      &-item{
        margin-right: 15px;
        & + &{
          margin: 0 15px 0 0;
        }
      }
      &-btn{
        &-wrpr{
          text-align: center;
        }
      }
    }
    &.sctn {
      background-color: @bg-color;
    }
    &__inr {
      text-align: center;
    }
    .usr-wdgt {
      float: none;
    }
    .usr-wdgt {
      &__info {
        float: none;
        margin: 20px 0 0 0;
      }
      &__img {
        &-wrpr {
          float: none;
          margin: 0 auto;
        }
      }
    }
    &__rght {
      float: none;
      margin-top: 30px;
    }
    &__btn-rdm.btn {
      margin: 30px 0 0 0;
      font-size: @font-size-xs;
      background-size: 15px;
    }
    &__sdbr {
      float: none;
      width: 100%;
      .list {
        box-shadow: @box-shadow-2;
        > a {
          display: block;
          + a {
            border-top: 1px solid @border-color;
          }
        }
        &--s {
          margin-top: 10px;
        }
        + .list {
          border: 0;
        }
      }
    }
  }
}
</style>