<template>
<div class="sctn clms">
    <div class="prfl-sctn">
        <claim-history></claim-history>
        <raise-claim></raise-claim>
    </div>
</div>
</template>

<script>
import ClaimHistory from "./ClaimHistory";
import RaiseClaim from "./RaiseClaim";

export default {
  name: "ClaimPage",
  components: {
    ClaimHistory,
    RaiseClaim
  }
};
</script>

<style lang="less">
@import "../style/bonus_profile.less";
.clms {
  &-wdgt {
    border-radius: 3px;
    border: 1px solid @border-color;
    margin-top: 20px;
    position: relative;
    background: #f1f5f7;

    &__body {
      padding: 0 15px 15px 15px;
    }

    &__ps {
      color: @color-grey;
      margin-top: 10px;
      font-size: @font-size-xs;
    }
    &__cmnts {
      &-ttl {
        font-size: @font-size;
        color: @fg-color-light;
        margin-bottom: 10px;
      }
      &-box {
        border-radius: 3px;
        border-color: @border-color;
        font-size: @font-size-xs;
        line-height: 1.5;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        height: 100px;
      }
    }
    &__slctd {
      display: inline-block;
      padding: 8px 12px;
      font-size: @font-size-xs;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      transition: 0.25s ease-in-out;
      text-align: center;
      color: @color-green;
      border: 1px solid @color-green;

      &-date {
        font-size: @font-size-3xs;
        margin-top: 5px;
      }

      &-item {
        font-size: @font-size-s;
      }

      &-amt {
        font-size: @font-size-2xl;
        font-weight: @semi-bold;
        margin-bottom: 5px;
      }

      & + & {
        margin-left: 10px;
      }

      &-wrpr {
        margin: 15px 0;
      }
    }
    &__more {
      color: @color-blue;
      margin: 15px 0 0 15px;
      cursor: pointer;
      display: inline-block;

      &:hover {
        text-decoration: underline;
      }
    }
    &__hd {
      margin-top: 20px;
    }
    &__inr {
      // padding: 15px;
      min-height: 245px;
    }
    &__ttl {
      font-size: @font-size-xl;
      font-weight: @bold;
    }
    &__btn {
      padding: 10px 50px;
    }
    &__dscrptn {
      margin-top: 8px;
      font-size: @font-size-xs;
      line-height: 20px;
      color: @color-grey;
    }
    &__optn {
      &-frm {
        margin-top: 10px;
        .prfl-tbl__cb {
          text-align: left;
        }
        .prfl-tbl__hd {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .prfl-tbl__entry {
          width: 38%;
        }
      }
    }
    &__ftr {
      text-align: center;
      margin: 10px 0;
    }
    .ofr-fltrs-drpdwn__item {
      margin-top: 2px;

      &:before {
        width: 16px;
        height: 16px;
        background-size: 16px auto;
        background-repeat: no-repeat;
      }
    }
    &__inr {
      .prfl-tbl__row {
        cursor: pointer;
        background-color: rgba(232, 244, 242, 0.4);
        &:nth-child(2n) {
          background-color: rgba(232, 244, 242, 0.1);
        }
        &:hover {
          .ofr-fltrs-drpdwn__item {
            &:before {
              background-image: url(http://assets.mspcdn.net/f_auto/bonus_in/checkbox-ticked.png);
              opacity: 0.3;
            }
          }
        }
        &--actv {
          .ofr-fltrs-drpdwn__item {
            &:before {
              background-image: url(http://assets.mspcdn.net/f_auto/bonus_in/checkbox-ticked.png);
              opacity: 1 !important;
            }
          }
        }
      }
      .prfl-tbl__body {
        max-height: 235px;
        overflow-y: scroll;
        border-bottom: 1px solid @border-color;
        background-color: @color-white;
      }
    }
  }
  &-item {
    cursor: pointer;
    border-radius: 3px;
    transition: 0.25s ease-in-out;
    padding: 10px;
    box-sizing: border-box;
    .user-select();
    &--slctd {
      background-color: @bg-color-light;
    }
    &-wrpr {
      margin-top: 20px;
    }
    &__img {
      max-width: 49px;
      max-height: 42px;
      .absolute-center();

      &-wrpr {
        float: left;
        height: 60px;
        width: 60px;
        position: relative;
      }
    }
    &__info {
      float: left;
      margin: 9px 0 9px 20px;
    }
    &__txt {
      font-weight: @semi-bold;
      font-size: @font-size;
      color: @fg-color-light;

      &-sub {
        font-size: @font-size-xs;
        margin-top: 10px;
        color: @color-grey;
      }
    }
    &:hover {
      background-color: @bg-color-light;
    }
  }
  &__tbl {
    margin: 0 -15px 0 -15px;
    &:last-child {
      margin-top: 30px;
    }
  }
  &__btn {
    padding: 11px 72px;
    font-size: @font-size-xs;
    margin-top: 30px;
  }
  &__sctn {
    padding: 15px 15px 30px 15px;
  }
  &__ttl {
    color: @fg-color;
    font-size: @font-size-xl;
    margin: 30px 0 15px 0;
    font-weight: @bold;
    &-sub {
      font-size: @font-size-xs;
      color: @fg-color;
      text-transform: uppercase;
      margin-bottom: 10px;
      font-weight: @bold;
    }
  }
  &__hstry {
    font-size: @font-size-xs;
    float: right;
    color: @color-blue;
  }
  &__note {
    font-size: @font-size-xs;
    color: @fg-color-light;
    line-height: @font-size-2xl;
    padding: 12px 14px;
    background-color: rgba(245, 166, 35, 0.1);
    border-radius: @border-radius;
    border: 1px solid rgba(245, 166, 35, 0.2);
    margin-bottom: 30px;
  }
  &__item {
    &-wrpr {
      border-bottom: 1px solid @border-color;
      padding: 20px 0;
      transition: 0.25s ease-in-out;
      .user-select();

      &--actv {
        .clms__item-ttl {
          font-weight: @bold;
        }
      }
      &:hover {
        cursor: pointer;
        margin: 0px -15px;
        box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
        padding: 20px 15px;
      }
    }
    &-ttl {
      font-size: @font-size;
      color: @fg-color;
    }
    &-dscrptn {
      font-size: @font-size-s;
      color: @fg-color-light;
      margin-top: 8px;
    }
    &-form {
      border-radius: @border-radius;
      border: 1px solid @border-color;
      background-color: @bg-color-light;
      padding: 15px;
      margin: 15px 0px 10px;
      display: none;
      &--ttl {
        font-size: @font-size;
        color: @fg-color-light;
      }
      &:hover {
        cursor: unset;
      }
    }
    &-msg {
      display: none;
      background-color: @bg-color-light;
      border: 1px solid @border-color;
      color: @fg-color-light;
      border-radius: @border-radius;
      padding: 15px 12px 15px 36px;
      line-height: 17px;
      margin-top: 15px;
      background-image: url("https://doypaxk1e2349.cloudfront.net/icons/confirm-tick.png");
      background-size: 18px;
      background-repeat: no-repeat;
      background-position: 12px center;
      &--err {
        background-image: url("https://assets.mspcdn.net/f_auto/bonus_in/icon/warning.png");
        background-color: fade(@color-red, 10%);
        border-color: fade(@color-red, 20%);
        padding-left: 45px;
      }
    }
  }
}

.form {
  &__cntnr {
    width: 300px;

    .rdio {
      &-grp {
        margin-left: 0px !important;
        float: none;
        margin: 8px 0 8px 0;
      }
      &__lbl {
        color: @fg-color;
        &-sub {
          color: @fg-color-light;
          font-size: @font-size-xs;
        }
      }
    }
  }
  &__inpt {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    border: none;
    padding: 10px;
    font-size: @font-size-xs;
    color: @fg-color;
    box-sizing: border-box;
    width: 100%;
    border-radius: @border-radius;
    transition: box-shadow 0.2s ease-in;
    background-color: fade(@color-white, 80%);
    &:focus {
      box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
    }
    &-lbl {
      font-size: @font-size-2xs;
      color: @fg-color-light;
      font-weight: @bold;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    &-err {
      color: @fg-color-red;
      font-size: @font-size-2xs;
      position: absolute;
      right: 0px;
      top: 0px;
      display: none;
    }
    &-file {
      &:after {
        content: "";
        position: absolute;
        width: 18px;
        opacity: 0.4;
        height: 18px;
        background-image: url(
          https://assets.mspcdn.net/f_auto,
          c_scale,
          w_72/bonus_in/icon/attachment.png
        );
        background-repeat: no-repeat;
        top: 28px;
        background-size: 18px;
        right: 10px;
      }
    }
    &-date {
      &:after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        background-image: url(https://assets.mspcdn.net/f_auto/bonus_in/icon/calendar.png);
        background-repeat: no-repeat;
        top: 28px;
        background-size: 16px;
        right: 10px;
      }
    }
    &-wrpr {
      position: relative;
      margin: 15px 0 10px;
      &--cmplsry {
        .form__inpt-lbl:after {
          content: "*";
          margin-left: 5px;
          color: @color-red;
        }
      }
      &--err {
        .form__inpt {
          box-shadow: 0px 0px 3px rgba(204, 0, 0, 0.5);
        }
        .form__inpt-err {
          display: block;
        }
      }
      &:hover {
        cursor: unset;
      }
    }
  }
}

@media screen and (max-width: @breakpoint) {
  .clms {
    &__note {
      margin-bottom: 15px;
    }
    .prfl-tbl {
      &__date {
        font-size: @font-size-xs;
      }
      &__more-btn {
        padding: 15px;
        background-color: @color-white;
        box-shadow: @box-shadow;
      }
    }
    &-wdgt {
      border-radius: 0;
      box-shadow: @box-shadow-2;
      background-color: @color-white;
      margin-top: 0;
      &__msg {
        color: @fg-color-light;
        margin-top: 15px;
        padding: 0 10px;
      }
      &__body {
        padding: 0;
      }
      &__optn {
        &-frm {
          margin-bottom: 10px;
        }
      }
      &__arw {
        display: none;
      }
      &__slctd {
        width: 48%;
        box-sizing: border-box;
        margin: 10px 0 0 0;
        & + & {
          margin-left: 0;
        }
        &:nth-child(even) {
          margin-left: 4%;
        }
      }
      &__inr {
        .form__cntnr {
          width: 100%;
        }
      }
    }
    &__ttl {
      font-weight: @bold;
      font-size: @font-size-l;
      padding: 10px;
      margin-bottom: 0;
      &-sub {
        padding: 10px;
      }
    }
    &-item {
      width: 100%;
      position: relative;
      padding: 15px 40px 15px 10px;
      &:after {
        position: absolute;
        right: 20px;
        top: 0;
        content: "";
        width: 4px;
        height: 100%;
        background: url(https://assets.mspcdn.net/f_auto/bonus_in/icon/right-arw.png)
          no-repeat center center/100%;
      }
      & + & {
        border-top: 1px solid @border-color;
      }
      &__txt {
        text-align: left;
        font-size: @font-size;
        &-sub {
          text-align: left;
        }
      }
      &-wrpr {
        background-color: @color-white;
        margin: 0;
        box-shadow: @box-shadow-2;
      }
      &__img {
        max-width: 100%;
        max-height: 100%;
        &-wrpr {
          width: 36px;
        }
      }
      &__info {
        margin: 0 0 0 45px;
        float: none;
      }
      &--slctd {
        padding-right: 10px;
        &:after {
          display: none;
        }
        &:hover {
        }
      }
    }
  }
}
</style>
