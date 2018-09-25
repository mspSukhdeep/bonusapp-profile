<template>
    <div class="prfl-sctn">
        <div class="rdm-sctn__ttl" v-display="'desktop'">Redeem Cashback</div>
        <div v-display="'mobile'" class="prfl-cb__wdgt" v-if="!appState.redemptionView">
            <cashback-widget nobutton="true">
            </cashback-widget>
        </div>
        <div v-if="appState.redemptionView">
            <div class="rdm-wdgt">
                <div v-if="appState.redemptionView==='paytm' || appState.redemptionView==='amazon'">
                  <div class="rdm-wdgt__top" v-display="'mobile'">
                            <img class="rdm-wdgt__icn" v-display="'mobile'" :src="giftImage(appState.redemptionView)" />
                            <div class="rdm-wdgt__ttl">{{slabOptions[appState.redemptionView].title}}</div>
                    </div>
                    <div v-if="appState.subView===1" class="box">
                        <div class="rdm-wdgt__inr">
                            <div class="rdm-wdgt__top" v-display="'desktop'">
                                <div class="rdm-wdgt__ttl">{{slabOptions[appState.redemptionView].title}}</div>
                                <div class="rdm-wdgt__dscrptn" >{{slabOptions[appState.redemptionView].description}}</div>
                            </div>
                            <div>
                                <div class="rdm-wdgt__rwrd-ttl">{{slabOptions[appState.redemptionView].info}}</div>
                                <div class="clearfix">
                                    <div class="rdm-wdgt__rwrd-amt" :class="{'rdm-wdgt__rwrd-amt--err': !isValidSelectedItem}">
                                        <input type="number" :disabled="!slabOptions[appState.redemptionView].isFlexi" class="rdm-wdgt__rwrd-inpt" v-model="appState.selectedItem.amount" />
                                    </div>
                                    <div class="rdm-wdgt__rwrd-item" :class="{'rdm-wdgt__rwrd-item--dsbld':profile.verifiedCashback<slab}" v-for="(slab, index) in slabOptions[appState.redemptionView].slabs" :key="index" @click="profile.verifiedCashback>=slab && selectItem(slab)">
                                        <span class="rdm-wdgt__rwrd-val">₹{{slab}}</span>
                                    </div>
                                </div>
                                <div class="rdm-wdgt__cb-ttl">
                                    Cashback to be redeemed
                                </div>
                                <div class="rdm-wdgt__cb">{{appState.selectedItem.amount}}</div>
                            </div>
                        </div>
                        <div class="rdm-wdgt__ftr">
                            <div class="btn rdm-wdgt__btn" :class="{'btn--dsbld': !isValidSelectedItem}" @click="proceedToOTP()">PROCEED</div>
                        </div>
                    </div>
                    <otp-widget v-if="appState.subView===2" @verified="redeem"></otp-widget>
                </div>
                <div v-else-if="appState.redemptionView==='bank'">
                    <div class="rdm-wdgt__top" v-display="'mobile'">
                            <img class="rdm-wdgt__icn" v-display="'mobile'" :src="giftImage(appState.redemptionView)" />
                            <div class="rdm-wdgt__ttl">Transfer cashback to your Bank account</div>
                    </div>
                    <div v-if="appState.subView===1">
                        <div class="rdm-wdgt__inr">
                            <div class="rdm-wdgt__top" v-display="'desktop'">
                              <div class="rdm-wdgt__ttl">Transfer cashback to your Bank account</div>
                              <div class="rdm-wdgt__dscrptn">We will transfer money to your Bank account via NEFT/RTGS. It might take 2-4 working days for the amount to reflect in your account.</div>
                            </div>
                            <div class="rdm-wdgt__rwrd clearfix">
                                <form class="rdm-wdgt__bnk-frm">
                                    <div class="rdm-wdgt__bnk-wrpr">
                                        <div class="inpt-wrpr" :class="{'inpt-wrpr--focus': props.focus, 'inpt-wrpr--err': props.error}" v-for="(props, attribute) in bankForm" :key="attribute">
                                            <label class="inpt-lbl" :class="{'inpt-lbl--vsbl': props.value}">
                                                {{props.label}}
                                            </label>
                                            <input :type="props.type" class="inpt" :placeholder="props.label" v-model="props.value" @focus="props.focus = true; props.error=''" @blur="props.focus = false">
                                            <div class="inpt-err">{{props.error}}</div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="rdm-wdgt__ftr">
                            <div class="btn rdm-wdgt__btn" @click="validateBankForm()">PROCEED</div>
                        </div>
                    </div>
                    <otp-widget v-if="appState.subView===2" @verified="redeem"></otp-widget>
                </div>
                
                <div v-else-if="appState.redemptionView==='success'">
                    <div class="rdm-wdgt__inr">
                        <div class="rdm-wdgt__scss">
                            <div class="rdm-wdgt__star-wrpr">
                                <div class="rdm-wdgt__star">
                                </div>
                                <img class="rdm-wdgt__thumb" src="https://assets.mspcdn.net/f_auto/bonus_in/icon/thumbsup.png" />
                            </div>
                            <div class="rdm-wdgt__scss-msg">
                                Cheers!
                            </div>
                            <div class="rdm-wdgt__scss-txt">
                                You have successfully redeemed
                            </div>
                            <div class="rdm-wdgt__scss-item">
                                {{appState.selectedItem.label}} worth ₹{{appState.selectedItem.amount}}
                            </div>
                            <div class="rdm-wdgt__scss-ntfctn">
                                An email regarding your redemption has been sent to <span class="txt--bold">{{profile.email}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="rdm-wdgt__ftr">
                        <router-link to="/" class="btn rdm-wdgt__btn">SHOW CASHBACK PASSBOOK</router-link>
                    </div>
                </div>
                <div class="rdm-wdgt__arw" :style="{ left: arrowPosition + 'px'}"></div>
                <!--  -->
            </div>
        </div>
        <div class="rdm-item-wrpr clearfix" v-if="!(display==='mobile' && appState.redemptionView)">
            <div class="rdm-item" 
                v-for="(option, index) in redeemOptions"
                :key="index" 
                @click="showWidget(option.type)">
                <div class="rdm-item__img-wrpr">
                    <img class="rdm-item__img" :src="option.icon">
                </div>
                <div class="rdm-item__txt">
                    {{option.label}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from "axios";
import OtpWidget from "./OtpWidget";
import CashbackWidget from "./CashbackWidget";

const API = Axios.create({
  withCredentials: true
});

const AUTH_API = "https://www.bonusapp.com/users/mobile_number_auth.php",
  REDEEM_API = "https://www.bonusapp.com/me/redeem.php";

function initState({ view } = {}) {
  return {
    redeemOptions: [
      {
        label: "Transfer Cashback to Bank Account",
        type: "bank",
        icon: "https://assets.mspcdn.net/f_auto/bonus_in/icon/bank.png"
      },
      {
        label: "Transfer Cashback to Paytm Account",
        type: "paytm",
        icon: "https://assets.mspcdn.net/f_auto/bonus_in/icon/paytm.png"
      },
      {
        label: "Redeem Amazon Gift Card",
        type: "amazon",
        icon: "https://assets.mspcdn.net/f_auto/bonus_in/icon/amazon.png"
      }
    ],
    slabOptions: {
      paytm: {
        id: 1,
        label: "Paytm Cash",
        slabs: [20, 200, 250],
        title: "Transfer cashback to Paytm account",
        isFlexi: true,
        info: "AMOUNT YOU WANT TO REDEEM (min. amount ₹20)",
        description:
          "Paytm is one of the biggest recharge site in India that delivers instant online prepaid recharge & mobile bill payment solutions to end users."
      },
      amazon: {
        id: 36,
        label: "Amazon Pay Balance",
        slabs: [500],
        title: "Transfer cashback to Amazon Pay account",
        info: "AMOUNT YOU WANT TO REDEEM",
        isFlexi: false,
        description:
          "Amazon Pay provides the option to purchase goods and services from websites and mobile apps using the addresses and payment methods stored in the Amazon account."
      }
    },
    bankForm: {
      name: {
        label: "Account Holder Name",
        value: "",
        type: "text",
        error: "",
        focus: false
      },
      number: {
        label: "Account Number",
        value: "",
        type: "number",
        error: "",
        focus: false
      },
      amount: {
        label: "Withdrawl Amount",
        value: "",
        type: "number",
        error: "",
        focus: false
      },
      ifsc: {
        label: "IFSC Code",
        value: "",
        type: "text",
        error: "",
        focus: false
      }
    },
    appState: {
      redemptionView: view,
      subView: 1,
      OTP: "",
      selectedItem: {
        amount: 0
      }
    }
  };
}

export default {
  name: "RedeemPage",
  components: {
    OtpWidget,
    CashbackWidget
  },
  computed: {
    display: function() {
      return this.$store.state.app.window.width > 720 ? "desktop" : "mobile";
    },
    profile: function() {
      return {
        mobile: this.$store.state.profile.mobile,
        email: this.$store.state.profile.email,
        verifiedCashback: this.$store.state.profile.verified_cashback
      };
    },
    isValidSelectedItem: function() {
      return (
        (this.appState.selectedItem.amount >= 20 &&
          this.appState.selectedItem.amount <= this.profile.verifiedCashback) ||
        false
      );
    },
    arrowPosition: function() {
      let options = this.redeemOptions,
        positions = [101, 328, 555],
        index;

      for (let i = 0; i < options.length; i++) {
        if (options[i].type === this.appState.redemptionView) {
          index = i;
          break;
        }
      }
      return positions[index];
    }
  },
  data: function() {
    return initState();
  },
  methods: {
    giftImage: function(source) {
      return this.redeemOptions.filter(item => {
        return item.type === source;
      })[0].icon;
    },
    showWidget(view) {
      this.appState.redemptionView = view;
      this.appState.selectedItem = {
        amount: 0
      };
      this.appState.subView = 1;
    },
    selectItem(slab, label) {
      this.appState.selectedItem = {
        amount: slab
      };
    },
    updateOffer() {},
    proceedToOTP() {
      if (this.isValidSelectedItem) {
        this.appState.subView++;
        this.appState.selectedItem.label = this.slabOptions[
          this.appState.redemptionView
        ].label;
        this.appState.selectedItem.type = this.appState.redemptionView;
      }
    },
    isFormDataValid() {
      let isValid = true,
        bankForm = this.bankForm;

      if (!bankForm.name.value) {
        isValid = false;
        bankForm.name.error = "Account holder's name is required";
      }
      if (!bankForm.number.value) {
        isValid = false;
        bankForm.number.error = "Account Number is required";
      }
      if (!bankForm.amount.value) {
        isValid = false;
        bankForm.amount.error = "Withdrawl amount is required";
      } else if (bankForm.amount.value < 20) {
        isValid = false;
        bankForm.amount.error = "Minimum withdrawl amount is Rs.20";
      } else if (bankForm.amount.amount > this.profile.verifiedCashback) {
        isValid = false;
        bankForm.amount.error = "Insufficient available cashback";
      }
      if (!bankForm.ifsc.value) {
        isValid = false;
        bankForm.ifsc.error = "Invalid IFSC Code";
      }

      return isValid;
    },
    validateBankForm() {
      if (this.isFormDataValid()) {
        this.appState.selectedItem = {
          name: `₹${this.bankForm.amount.value} Bank Transfer`,
          label: `₹${this.bankForm.amount.value} Bank Transfer`,
          amount: this.bankForm.amount.value,
          type: "bank"
        };
        this.appState.subView++;
      }
    },
    redeem() {
      let params = new URLSearchParams();
      params.append("source", "mobile_pwa");

      if (this.appState.selectedItem.type === "bank") {
        params.append("redeem", "50");
        params.append("valid", "1");
        params.append("account_holders_name", this.bankForm.name.value);
        params.append("account_number", this.bankForm.number.value);
        params.append("amount", this.bankForm.amount.value);
        params.append("ifsc_code", this.bankForm.ifsc.value);
      } else {
        params.append(
          "redeem",
          this.slabOptions[this.appState.redemptionView].id
        );
        params.append("amount", this.appState.selectedItem.amount);
        params.append("valid", "Y");
        params.append("email", this.profile.email);
        params.append("user_action", "1");
      }

      API.get(REDEEM_API, {
        params: params
      })
        .then(response => {
          if (response.data && response.data.response == "success") {
            this.appState.redemptionView = "success";
          } else {
            this.appState.redemptionView = "failure";
          }
        })
        .catch(error => {})
        .then(() => {
          // Reset Page Params - Data Variables
          // Fetch new Passbook data - Or we can just postpone that
          this.appState.redemptionView = "success";
          this.OTP = "";
          this.subView = 1;
          
          this.$store.dispatch("fetchProfile");
          this.$store.dispatch("fetchPassbook");
        });
    }
  }
};
</script>
<style lang="less">
@import "../style/bonus_profile.less";

.rdm {
  &-sctn {
    &__ttl {
      font-size: @font-size-2xl;
      font-weight: @bold;
    }
  }
  &__msg-box {
    margin-top: 20px;
  }
  &-item {
    width: 33.3%;
    float: left;
    cursor: pointer;
    border-radius: 3px;
    transition: 0.25s ease-in-out;
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
    .user-select();

    &-wrpr {
      margin-top: 20px;
    }
    &__img {
      max-width: 49px;
      max-height: 42px;
      .absolute-center();

      &-wrpr {
        height: 100px;
        position: relative;
      }
    }
    &__txt {
      text-align: center;
      font-weight: @bold;
      font-size: @font-size-xs;
    }
    &:hover {
      background-color: @bg-color;
    }
  }
  &-wdgt {
    background-color: @bg-color-light;
    border-radius: 3px;
    border: 1px solid @border-color;
    margin-top: 20px;
    position: relative;

    &__msg-box {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 95px;
      display: none;
    }
    &__bnk-frm {
      margin-bottom: 15px;
    }
    &__err {
      &-box {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 90px;
        color: @color-red;
        display: none;
      }
    }
    &__star {
      width: 48px;
      height: 48px;
      margin: 0 auto;
      .image-2x('http://assets.mspcdn.net/f_auto/bonus_in/icon/star.png', 48px);
      animation: rotate 3s ease-in-out 1;
      &-wrpr {
        position: relative;
      }
    }
    &__scss {
      padding: 25px 0;
      text-align: center;

      &-msg {
        font-size: @font-size-3xl;
        font-weight: @bold;
        margin-top: 15px;
      }
      &-txt {
        margin-top: 8px;
      }
      &-item {
        margin-top: 4px;
        font-weight: @bold;
      }
      &-ntfctn {
        margin-top: 36px;
      }
    }
    &__thumb {
      position: absolute;
      .absolute-center();
      width: 2px;
      animation: zoomIn 3s ease-in-out 1 forwards;
    }
    &__mob {
      padding: 20px;
      padding: 80px 0 45px 0;
      text-align: center;

      &-inpt {
        border: 0;
        background: none;
        border-bottom: 1px solid #dfe1e8;
        font-size: @font-size-xl;
        color: @fg-color-light;
        padding: 5px;
        letter-spacing: 5px;
        font-weight: @bold;
        width: 175px;
        margin-bottom: 20px;
      }
    }
    &__otp {
      text-align: center;
      padding: 20px;
      padding: 80px 0 42px 0;
      &-inpt {
        border: 0;
        background: none;
        border-bottom: 2px solid @border-color;
        font-size: @font-size-xl;
        line-height: 26px;
        color: @fg-color-light;
        padding: 5px;
        letter-spacing: 20px;
        font-weight: @bold;
        width: 175px;
        margin-bottom: 20px;
        &::-webkit-input-placeholder {
          color: @border-color;
          letter-spacing: 24px;
        }
      }
    }
    &__arw {
      position: absolute;
      width: 0;
      height: 0;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-top: 19px solid #e4e9ec;
      background: none;
      left: 72px;
      transition: 0.25s ease-in-out;
    }
    &__inr {
      padding: 15px;
      min-height: 245px;
    }
    &__ttl {
      font-size: @font-size-xl;
      font-weight: @bold;
    }
    &__dscrptn {
      margin-top: 8px;
      font-size: @font-size-xs;
      line-height: 20px;
      color: @color-grey;
    }
    &__rwrd {
      &-amt {
        float: left;
        margin-right: 10px;
        border-bottom: 1px solid @fg-color-light;
        padding: 10px 0 8px 0;
        color: @fg-color-light;
        &:before {
          content: "₹";
          font-size: @font-size-xl;
          display: block;
          position: absolute;
        }
        &--err {
          color: @color-red;
          border-color: @color-red;
          .rdm-wdgt__rwrd-inpt {
            color: @color-red;
          }
        }
      }
      &-inpt {
        border: 0;
        background: transparent;
        font-size: @font-size-l;
        padding-left: 15px;
        width: 60px;
      }
      &-ttl {
        font-weight: @bold;
        font-size: @font-size-xs;
        margin-top: 22px;
        margin-bottom: 15px;
      }
      &-item {
        padding: 10px 15px;
        text-align: center;
        float: left;
        border-radius: 3px;
        color: @color-green;
        border: 1px solid @color-green;
        cursor: pointer;
        position: relative;
        .user-select();

        &:not(&--actv):not(&--dsbld):hover {
          color: fade(@color-green, 80%);
          border-color: fade(@color-green, 80%);
        }
        &--actv {
          border-color: @color-green;
          color: @color-green;
          font-weight: @bold;
        }
        &--dsbld {
          color: #c4c4c4;
          border-color: #bbb;
          &:hover {
            cursor: not-allowed;
          }
        }
        & + & {
          margin-left: 10px;
        }
      }
      &-val {
        display: block;
        font-size: @font-size;
      }
      &-txt {
        display: block;
        font-size: @font-size-2xs;
        margin-top: 3px;
      }
    }
    &__cb {
      color: @color-green;
      font-weight: @bold;
      font-size: @font-size-3xl;
      .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/coin.png', 22px);
      background-position: left center;
      padding-left: 27px;

      &-ttl {
        font-weight: @bold;
        font-size: @font-size-2xs;
        margin: 25px 0 8px 0;
      }
    }
    &__ftr {
      padding: 12px;
      text-align: center;
      background-color: #e4e9ec;
    }
    &__btn {
      &.btn {
        font-size: @font-size-xs;
        padding: 11px 84px;
      }
    }
  }
}

@media screen and (max-width: @breakpoint) {
  .rdm {
    &-item {
      width: 100%;
      padding: 20px;
      position: relative;

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
      &__txt {
        float: left;
        text-align: left;
        line-height: 25px;
        margin-left: 20px;
        color: @fg-color-light;
        font-weight: @normal;
        font-size: @font-size;
      }
      &__img {
        max-width: 30px;
        max-height: 25px;
        &-wrpr {
          float: left;
          height: 20px;
          width: 30px;
        }
      }
      & + & {
        border-top: 1px solid @border-color;
      }
      &-wrpr {
        background-color: @color-white;
        box-shadow: @box-shadow-2;
      }
    }
  }
}

@media screen and (max-width: @breakpoint) {
  .rdm-wdgt {
    border: 0;
    background-color: @bg-color;
    &__mob {
      padding: 40px 0;
    }
    &__inr {
      padding: 15px;
      background-color: @color-white;
      min-height: auto;

      box-shadow: @box-shadow-2;
      &--w {
        background-color: @color-white;
      }
    }
    &__rwrd {
      &-ttl {
        margin-top: 0;
      }
    }
    &__arw {
      display: none;
    }
    &__top {
      padding: 15px;
      text-align: center;
    }
    &__icn {
      width: 48px;
      margin-bottom: 20px;
    }
    &__ftr {
      background-color: @color-white;
      padding-bottom: 20px;
    }
    &__otp {
      padding-top: 42px;
    }
    &__cb {
      &-ttl {
        margin-top: 35px;
      }
    }
    &__btn {
      &.btn {
        font-size: @font-size-xs;
        box-sizing: border-box;
        width: 100%;
        padding: 11px;
      }
    }
    &__scss {
      background-color: @color-white;
      padding: 25px 15px;
    }
    &__msg {
      &-box {
        position: static;
        display: block;
      }
    }
  }
}
</style>