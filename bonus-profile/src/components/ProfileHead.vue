<template>
<div class="sctn prfl clearfix">
    <div class="prfl__inr">
        <div class="usr-wdgt clearfix">
            <div class="usr-wdgt__img-wrpr">
                <img class="usr-wdgt__img" src="https://graph.facebook.com/1208059782540876/picture?type=square&height=300" onerror="this.onerror=null;this.src='https://assets.mspcdn.net/f_auto/bonus_in/icon/user.png';">
            </div>
            <div class="usr-wdgt__info">
                <div class="usr-wdgt__name">Sukhdeep Singh
                    <span class="bdg--pro">PRO</span>
                </div>
                <div class="usr-wdgt__eml">sukhdeep902@gmail.com
                    <span class="unvrfd"></span>
                </div>
                <div class="usr-wdgt__mob">7673946555
                </div>
            </div>
        </div>
        <div class="prfl__rght">
            <div class="prfl-cb">
                <div class="prfl-cb__lft">
                    <div class="prfl-cb__lft-txt">
                        Cashback
                    </div>
                    <div class="prfl-cb__lft-amt">
                        81
                    </div>
                </div>
                <div class="prfl-cb__rght">
                    <div class="prfl-cb__rght-pndng">
                        Pending: <span class="txt--bold">₹52</span>
                    </div>
                    <div class="prfl-cb__rght-cnfrmd">
                        Confirmed: <span class="txt--bold">₹29</span>
                    </div>
                </div>
            </div>
            <button class="btn btn--s ripple prfl__btn-rdm">
                Redeem Cashback
            </button>
        </div>
        </div>
    </div>
</div>    
</template>

<script>
export default {
  name: 'ProfileHead',
};
</script>

<style lang="less">
@import "../style/bonus_profile.less";

.prfl {
  padding: 30px;
  margin-top: 10px;
  min-height: 80px;
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
  &__btn {
    &-rdm {
        &.btn{
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

    &__lft {
      display: inline-block;
      padding: 15px;
      &-txt {
        color: @color-green;
        font-weight: @bold;
      }
      &-amt{
          .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/coin.png', 20px);
          padding-left: 24px;
          font-size: 18px;
          line-height: 21px;
          color: @color-green;
          font-weight: @bold;
          width: 22px;
          margin: 8px auto 0 auto;
      }
    }
    &__rght {
      display: inline-block;
      padding: 15px;
      border-left: 1px solid @border-color;
      margin-left: -.28em;
      line-height: 15px;
      font-size: @font-size-xs;
      &-pndng{
          .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/wait.png', 13px);
          padding-left: 18px;
          color: @color-grey-2;
          
      }
      &-cnfrmd{
          margin-top: 15px;
          color: @color-green;
          .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/tick.png', 13px);
          padding-left: 18px;
      }
      
    }
  }
  &__sdbr {
    float: left;
    width: 287px;
  }
  &-wrpr {
    float: left;
    width: 712px;
    border-left: 1px solid @border-color;
    min-height: 510px;
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

.unvrfd{
    .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/error-grey.png', 15px);
    width: 15px;
    height: 15px;
    display: inline-block;
    position: relative;
    left: 2px;
    top: 3px;
}

.bdg{
    &--pro{
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
</style>