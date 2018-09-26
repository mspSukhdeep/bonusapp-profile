<template>
<div :class="{'prfl-cb-wrpr': !nobutton}">
    <router-link class="prfl-cb" to="/passbook">
                <div class="prfl-cb__lft">
                    <div class="prfl-cb__lft-txt">
                        Cashback
                    </div>
                    <div class="prfl-cb__lft-amt">
                        <span class="icn-coin"></span>
                        <span class="prfl-cb__lft-amt-txt">
                          {{ cashback.total }}
                        </span>
                    </div>
                </div>
                <div class="prfl-cb__rght">
                    <div class="prfl-cb__rght-pndng">
                        Pending: <span class="txt--bold">₹{{ cashback.pending }}</span>
                    </div>
                    <div class="prfl-cb__rght-cnfrmd">
                        Confirmed: <span class="txt--bold">₹{{ cashback.verified }}</span>
                    </div>
                </div>
    </router-link>
    <router-link to="/redeem" v-if="!nobutton">
        <button class="btn btn--s ripple prfl__btn-rdm">
            Redeem Cashback
        </button>
    </router-link>
  </div>
</template>

<script>
import UTILS from '../utils';

export default {
  name: "CashbackWidget",
  props: ["nobutton"],
  computed: {
    profile: function(){
      return this.$store.state.profile;
    },
    cashback: function() {
      return {
        pending: UTILS.number.toInt(this.profile.pending_cashback),
        verified: UTILS.number.toInt(this.profile.verified_cashback),
        total: UTILS.number.toInt(this.profile.verified_cashback+this.profile.pending_cashback)
      }
    },
  }
};
</script>

<style lang="less">

@import "../style/bonus_profile.less";

.prfl {
  &__btn {
    &-rdm {
      &.btn {
        vertical-align: middle;
        margin-left: 27px;
        .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/wallet.png', 14px);
        background-position: left 12px center;
        padding-left: 36px;
        text-transform: uppercase;
        vertical-align: middle;
      }
    }
  }

  &-cb {
    display: inline-block;
    border: 1px solid @border-color;
    border-radius: 3px;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
    &-wrpr {
      .prfl__btn-rdm {
        // margin: 20px 0 0 0;
        margin-left: 20px;
      }
    }
    &__wdgt {
      background-color: @color-white;
      text-align: center;
      padding: 20px;
      box-shadow: @box-shadow-2;
    }
    &__lft {
      display: inline-block;
      padding: 15px;
      &-txt {
        color: @color-green;
        font-weight: @bold;
      }
      &-amt {
        font-size: 18px;
        line-height: 21px;
        color: @color-green;
        font-weight: @bold;
        margin-top: 5px;
      }
    }
    &__rght {
      display: inline-block;
      padding: 15px;
      border-left: 1px solid @border-color;
      margin-left: -0.28em;
      line-height: 15px;
      font-size: @font-size-xs;
      &-pndng {
        .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/wait.png', 13px);
        padding-left: 18px;
        color: @color-grey-2;
      }
      &-cnfrmd {
        margin-top: 15px;
        color: @color-green;
        .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/tick.png', 13px);
        padding-left: 18px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .prfl-cb {
    &__rght{
      text-align: left;
    }
    &-wrpr {
      margin: 20px 0 0 0;
      .prfl__btn-rdm{
        margin: 20px 0 0 0;
      }
    }
  }
}
</style>
