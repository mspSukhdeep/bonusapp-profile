<template>
  <div class="wrpr">
    <div class="gft-wrpr">
      <div class="gft-stts" v-show="showStatusMessage" :class="{
      		'gft-stts--payment-err': statusType === 'paymentError', 
      		'gft-stts--success': statusType === 'success',
      		'gft-stts--failure': statusType === 'failure' 
      	}">
        <div class="gft-stts__img"></div>
        <div class="gft-stts__hdr">{{statusMessages[statusType].header}}</div>
        <p class="gft-stts__cntnt" v-for="content in statusMessages[statusType].contents">{{content}}</p>
        <div class="gft-stts__btn" v-on:click="closeStatusMessage()">{{statusMessages[statusType].buttonText}}</div>
      </div>
      <div v-show="!showStatusMessage">
        <div class="gft-chckt">
          <div class="gft-chckt__lft">
            <!-- Select voucher / enter amount -->
            <div class="gft-chckt__sctn gft-chckt__sctn--slct js-gc-slct">
              <div class="gft-chckt__sctn__hdr" :class="{ 'done' : sectionStatus.completedSelect }" v-on:click="toggleSection('Select')">
              Choose Gift Card Value</div>
              <div class="gft-chckt__sctn__cntnt" :class="{ 'hidden' : mobileView.isMobile && mobileView.collapseSelect }">
                <div class="gft-chckt__sctn__lng-hdr">Choose your <span>{{store}}</span> Gift Card Value</div>
                <div class="gft-chckt__sctn__vchr-wrpr">
                  <div v-for="voucherOption in voucherDefaultOptions" :key="voucherOption" class="gft-chckt__sctn__vchr" :class="{'slctd': userSelectedVouchers[voucherOption] !== undefined}" v-on:click="voucherSelect(voucherOption)">&#8377;{{voucherOption}}</div>
                </div>
                <div class="gft-chckt__sctn__amt-wrpr">
                  <input class="gft-chckt__sctn__amt" type="number" v-model.number="voucherAmount" v-on:change="removeUserSelectedVouchers()">
                </div>
              </div>
            </div>
            <!-- Sender details -->
            <div class="gft-chckt__sctn gft-chckt__sctn--sndr js-gc-sndr">
              <div class="gft-chckt__sctn__hdr" :class="{ 'done' : sectionStatus.completedSender }" v-on:click="toggleSection('Sender')">Sender's Details</div>
              <div class="gft-chckt__sctn__cntnt" :class="{ 'hidden' : mobileView.isMobile && mobileView.collapseSender }">
                <div class="gft-chckt__sctn__lng-hdr">Sender's Details</div>
                <div class="gft-chckt__sctn__radio-wrpr">
                  <label>
                    <input class="gft-chckt__sctn__radio" type="radio" name="receiver" value="yes" v-model="selfRecipient" checked="checked">
                    <span class="gft-chckt__sctn__radio--grphcl"></span>
                    <span>For me</span>
                  </label>
                  <label>
                    <input class="gft-chckt__sctn__radio" type="radio" name="receiver" value="no" v-model="selfRecipient">
                    <span class="gft-chckt__sctn__radio--grphcl"></span>
                    <span>For someone else</span>
                  </label>
                </div>
                <div class="gft-chckt__sctn__frm">
                  <div v-if="selfRecipient === 'no'" class="gft-chckt__sctn__frm-lbl" v-model.lazy="receiverDetails.name">Receiver's Name*</div>
                  <input v-if="selfRecipient === 'no'" type="text" class="gft-chckt__sctn__frm-inpt">
                  <div class="gft-chckt__sctn__frm-lbl">Email*</div>
                  <input type="text" class="gft-chckt__sctn__frm-inpt" v-model.lazy="senderDetails.email" v-on:change="completeSender()">
                  <div v-if="selfRecipient === 'no'" class="gft-chckt__sctn__frm-lbl">Personalized Message*</div>
                  <textarea v-if="selfRecipient === 'no'" type="text" class="gft-chckt__sctn__frm-inpt gft-chckt__sctn__frm-inpt--morelines" maxlength="140" v-model.lazy="receiverDetails.message"></textarea>
                  <div v-if="selfRecipient === 'no'" class="gft-chckt__sctn__frm-inpt-cnt"><span>{{receiverDetails.messageLength}}</span> / 140</div>
                  <div class="gft-chckt__sctn__frm-lbl">Sender's Name*</div>
                  <input type="text" class="gft-chckt__sctn__frm-inpt" v-model.lazy="senderDetails.name">
                </div>
              </div>
            </div>
          </div>
          <div class="gft-chckt__rght">
            <div class="gft-chckt__sctn gft-chckt__sctn--smmry js-gc-smmry">
              <div class="gft-chckt__sctn__hdr" :class="{ 'done' : sectionStatus.completedSummary }" v-on:click="toggleSection('Summary')">Summary</div>
              <div class="gft-chckt__sctn__cntnt" :class="{ 'hidden' : mobileView.isMobile && mobileView.collapseSummary }">
                <div class="gft-chckt__sctn__lng-hdr">Summary</div>
                <div class="gft-chckt__sctn__gift-img">
                  <img class="bkgnd" v-show="multipleFinalVouchers" :src="storeDetails.giftCardImage">
                  <img class="frgnd" :src="storeDetails.giftCardImage">
                  <div class="gft-chckt__sctn__gift-img-amt">&#8377;{{voucherAmount}}</div>
                </div>
                <div class="gft-chckt__sctn__gift-init" v-show="!voucherAmount">Go ahead, select the gift card value from the menu</div>
                <div v-show="voucherAmount">
                  <div v-for="voucher in finalVouchers" :key="voucher.amt" class="gft-chckt__sctn__itm">
                    <div class="gft-chckt__sctn__itm-name">&#8377;{{voucher.amt}} Gift Card</div>
                    <div class="gft-chckt__sctn__itm-qntty">{{voucher.qty}}</div>
                    <div class="gft-chckt__sctn__itm-amt">&#8377;{{ voucher.amt * voucher.qty}}</div>
                  </div>
                  <div class="gft-chckt__sctn__ttl">
                    <div class="gft-chckt__sctn__ttl-hdr">Total <span>(You pay)</span></div>
                    <div class="gft-chckt__sctn__ttl-amt">&#8377;{{voucherAmount}}</div>
                  </div>
                  <div class="gft-chckt__sctn__cshbck">
                    Instant Bonusapp Cashback
                    <span>&#8377;{{cashbackAmount}}</span>
                  </div>
                  <div class="gft-chckt__sctn__effprc">Effective Price will be <span>&#8377;{{effectiveAmount}}</span></div>
                  <div class="gft-chckt__sctn__xtra">
                    Gift Cards are delivered via email instantly and Cashback will be credited within 15 minutes of your final payment.
                  </div>
                  <a class="gft-chckt__sctn__trms" href="#" target="_blank"><span>{{store}}</span> Terms and Conditions</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gft-chckt__sbmt">
          <div class="gft-chckt__sbmt-btn" v-on:click="processPayment()">Proceed <span>to pay</span></div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import BonusHead from "./BonusHead";

export default {
  name: "GiftCardCheckout",
  props: ['store'],
  data() {
    return {
      mobileView: {
        isMobile: false,
        /* Collapse all in mobile view (remain expanded in desktop)*/
        collapseSelect: false,
        collapseSender: false,
        collapseSummary: false
      },
      sectionStatus: {
      	completedSelect: false,
        completedSender: false,
        completedSummary: false
      },
      voucherDefaultOptions: [50, 200, 500, 1000],
      voucherAmount: 0,
      effectiveAmount: 0,
      cashbackRate: 0.03,
      cashbackAmount: 0,
      userSelectedVouchers: {},
      finalVouchers: {},
      multipleFinalVouchers: false,
      selfRecipient: "yes",
      senderDetails: {
        name: '',
        email: ''
      },
      receiverDetails: {
        name: '',
        email: '',
        message: '',
        messageLength: 0
      },
      showStatusMessage: false,
      statusType: 'default',
      statusMessages: {
        default: {
          header: '',
          contents: [],
          buttonText: ''
        },
        failure: {
          header: 'Whoops! Something went wrong...',
          contents: [
            "Don't worry, it happens to all of us. We'll take a look into this",
            "If you have been charged, the amount will be reversed to your original payment method."
          ],
          buttonText: "Start Over"
        },
        success: {
          header: 'Woohoo! Your gift card is on its way...',
          contents: [
            "The gift card(s) have been emailed to receiver's email",
            "Bonusapp Cashback will be credited to your account shortly"
          ],
          buttonText: "Start Over"
        },
        paymentError: {
          header: 'Uh-oh! Something went wrong with your payment...',
          contents: [
            "There was an issue in processing your payment. If this problem persists, please contact support@bonusapp.in"
          ],
          buttonText: "Start Over"
        },
      },
      storeDetails: {
        giftCardImage: ''
      }
    }
  },
  computed: {
    desktop: function() {
      return this.$store.state.app.window.width > 1200;
    }
  },
  created() {
    this.voucherDefaultOptions.sort(function(a, b) {
      return a > b ? -1 : 1;
    }); // Make sure vouchers are in descending order.
    this.storeDetails.giftCardImage = "https://assets.mspcdn.net/msp-ui/giftcards/giftcard-" + this.store + ".png";

    /* Collapse section initially for mobile */
    if (!this.desktop) {
      this.mobileView = {
        isMobile: true,
        /* Collapse all in mobile view (remain expanded in desktop)*/
        collapseSelect: false,
        collapseSender: true,
        collapseSummary: true
      };
    }
  },
  watch: {
    voucherAmount(newval) {
      this.finalVouchers = {};
      let fixedVouchers = this.voucherDefaultOptions;
      let remainder = this.voucherAmount;
      let countVouchers = 0;
      /* Highest amount to lowest: Get vouchers' split for the amount */
      for (let i = 0; i < fixedVouchers.length; i++) {
        if (newval >= fixedVouchers[i]) {
          let qty = Math.floor(remainder / fixedVouchers[i]);
          if (qty) {
            this.finalVouchers[fixedVouchers[i]] = {
              amt: fixedVouchers[i],
              qty: qty
            };
            countVouchers++;
          }
          remainder = remainder % fixedVouchers[i];
          if (remainder === 0) break;
        } else {
          continue;
        }
      }
      /* Create GC out of any remaining amount */
      if (remainder) {
        remainder = parseInt(remainder);
        this.finalVouchers[remainder] = {
          amt: remainder,
          qty: 1
        };
      }
      /* Multiple Vouchers identification */
      this.multipleFinalVouchers = countVouchers > 1 ? true : false;
      /* Update cashback: */
      this.cashbackAmount = parseInt(this.cashbackRate * this.voucherAmount);
      this.effectiveAmount = parseInt(this.voucherAmount - this.cashbackAmount);
      /* Mark sections complete if amount != 0 */
      this.sectionStatus.completedSelect = true;
      this.sectionStatus.completedSummary = true;
    },
  },
  methods: {
    voucherSelect(amount) {
      this.voucherAmount = amount;
      this.userSelectedVouchers = {};
      this.userSelectedVouchers['' + amount] = true;
    },
    processPayment() {
      this.showStatusMessage = true;

      /* Random selection for mock/demo */
      let statuses = ['success', 'failure', 'paymentError'];
      this.statusType = statuses[Math.floor(Math.random() * 3)];
      this.showStatusMessage = true;
    },
    closeStatusMessage() {
      this.statusType = 'default';
      this.showStatusMessage = false;
    },
    removeUserSelectedVouchers() {
      this.userSelectedVouchers = {};
    },
    toggleSection(section) {
      this.collapseAllSections();
      this.mobileView['collapse' + section] = !this.mobileView['collapse' + section];
    },
    collapseAllSections() {
      this.mobileView = {
        isMobile: true,
        /* Collapse all in mobile view (remain expanded in desktop)*/
        collapseSelect: true,
        collapseSender: true,
        collapseSummary: true
      };
    },
    completeSender() {
    	this.sectionStatus.completedSender = true;
    }
  }
};

</script>
<style lang="less">
@import "../style/bonus_profile.less";

@border-radius: 8px;

@bg-white: #ffffff;
@bg-light-blue: #4a90e2;
@color-light-blue: #4a90e2;
@color-section-head: #777777;
@color-dark-blue: #0d426c;
@color-faded-red: #ed4454;
@border-light-blue: #4a90e2;
@border-dark-blue: #0d426c;
@border-radio: #b4bfc9;

.hidden {
  display: none;
}

.gft {
  &-wrpr {
    padding: 10px;
    background: @bg-white;
  }

  &-stts {
    padding: 30px 20px;
    min-height: 640px;

    &__img {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      background-position: center;
    }

    &--failure &__img {
      .image-2x('https://assets.mspcdn.net/msp-ui/giftcards/icons/giftcard-oops@2x.png', 120px);
    }

    &--success &__img {
      .image-2x('https://assets.mspcdn.net/msp-ui/giftcards/icons/woohoo@2x.png', 120px);
    }

    &--payment-err &__img {
      .image-2x('https://assets.mspcdn.net/msp-ui/giftcards/icons/payment-error@2x.png', 120px);
    }

    &__hdr {
      margin: 30px 0 20px 0;
      font-size: @font-size-2xl;
      font-weight: @bold;
      text-align: center;
    }

    &__cntnt {
      text-align: center;
      font-size: @font-size;
      color: @color-grey-2;
      line-height: 1.5;

      &+& {
        margin-top: 10px;
      }
    }

    &__btn {
      margin: 0 auto;
      margin-top: 40px;
      width: 200px;
      height: 36px;
      line-height: 36px;
      font-size: @font-size-xs;
      font-weight: @semi-bold;
      color: @color-white;
      text-align: center;
      background-color: @color-green;
      border-radius: 18px;
      text-transform: uppercase;
      transition: opacity 0.25s ease-in;
      cursor: pointer;

      &:active {
        opacity: 0.9;
      }
    }
  }

  &-chckt {
    border-radius: @border-radius;
    box-shadow: @box-shadow-2;
    overflow: hidden;

    &__sctn {
      border-top: 1px solid @border-color;

      .gft-chckt__lft &:first-child {
        border-top: none;
      }

      &__hdr {
        font-size: @font-size-xs;
        color: @color-section-head;
        background-color: @bg-color;
        height: 45px;
        line-height: 45px;
        text-transform: uppercase;
        font-weight: @semi-bold;
        padding: 0 15px;

        &.done {
          .image-2x('https://assets.mspcdn.net/image/upload/v1543486267/msp-ui/giftcards/icons/tick@2x.png', 20px, auto);
          background-position: 15px center;
          padding-left: 45px;
        }
      }

      &__cntnt {
        padding: 15px 10px;
        overflow: hidden;
      }

      &__lng-hdr {
        color: @fg-color;
        font-size: @font-size;
        line-height: 1.5;
        font-weight: @semi-bold;

        span {
          text-transform: capitalize;
        }
      }

      &__vchr {
        float: left;
        width: 58px;
        height: 36px;
        margin-bottom: 10px;
        border: 1px solid transparent;
        border-radius: @border-radius;
        line-height: 36px;
        box-shadow: @box-shadow-2;
        font-size: @font-size-xs;
        text-align: center;
        color: @color-dark-blue;
        cursor: pointer;

        &+& {
          margin-left: 12px;
        }

        &:hover,
        &:active,
        &.slctd {
          border: 1px solid @border-light-blue;
          font-weight: @semi-bold;
          background: lighten(@bg-light-blue, 35%)
        }

        &-wrpr {
          margin-top: 10px;
          padding: 2px;
          overflow: hidden;
        }
      }

      &__amt {
        border: 1px solid @border-color;
        border-radius: @border-radius;
        width: 100%;
        height: 36px;
        line-height: 36px;
        color: @fg-color;
        font-size: @font-size;
        text-indent: 30px;
        padding: 0;
        margin: 0;
        box-sizing: border-box;


        &-wrpr {
          margin: 10px 0;
          position: relative;

          &:before {
            content: '\20B9';
            font-weight: @semi-bold;
            font-size: @font-size;
            line-height: 36px;
            height: 36px;
            display: block;
            position: absolute;
            left: 15px;
            top: 0;
          }
        }
      }

      &__radio {
        display: none;

        &--grphcl {
          background-color: @bg-white;
          border: 1px solid @border-radio;
          box-shadow: @box-shadow;
          display: inline-block;
          width: 14px;
          height: 14px;
          border-radius: 100%;
          margin-right: 8px;
          vertical-align: bottom;
        }

        &:checked+&--grphcl {
          border: 1px solid @border-light-blue;
          position: relative;

          &:before {
            content: '';
            background-color: @bg-light-blue;
            display: inline;
            position: absolute;
            width: 8px;
            height: 8px;
            top: 3px;
            left: 3px;
            border-radius: 100%;
          }
        }

        &-wrpr {
          margin-top: 10px;

          & label+label {
            margin-left: 30px;
          }
        }
      }

      &__frm {
        margin-top: 30px;
        margin-bottom: 15px;

        &-lbl {
          font-size: @font-size-xs;
          color: @color-grey;
          font-weight: @semi-bold;

          *+& {
            margin-top: 24px;
          }
        }

        &-inpt {
          border: none;
          border-bottom: 1px solid @border-color;
          width: 100%;
          height: 36px;
          line-height: 36px;
          color: @fg-color;
          font-size: @font-size;
          padding: 0;
          margin: 0;
          box-sizing: border-box;

          &--morelines {
            line-height: 24px;
            height: 72px;
          }

          &-cnt {
            font-size: 11px;
            text-align: right;
            margin-top: 8px;
          }
        }
      }

      &__gift {
        &-img {
          position: relative;
          margin: 0 auto;
          width: 290px;
          height: 175px;
          margin-top: 15px;
          margin-bottom: 50px;

          img {
            width: 285px;
            height: 170px;
            position: absolute;
            border-radius: @border-radius;

            &.frgnd {
              top: 0;
              left: 0;
              z-index: 1;
            }

            &.bkgnd {
              top: -5px;
              left: -5px;
              z-index: 0;
            }
          }

          &-amt {
            position: absolute;
            bottom: 20px;
            left: 20px;
            font-size: @font-size-2xl;
            font-weight: @bold;
            color: @color-white;
            z-index: 2;
          }
        }

        &-init {
          padding: 90px 48px 120px 48px;
          color: @color-grey-2;
          font-size: @font-size;
          text-align: center;
          line-height: 1.5;
        }
      }

      &__itm {
        clear: both;
        overflow: hidden;

        &+& {
          margin-top: 15px;
        }

        &:first-child {
          margin-top: 50px;
        }

        &-name {
          float: left;
          max-width: 200px;
          overflow: hidden;
        }

        &-qntty {
          float: left;
          width: 18px;
          height: 18px;
          line-height: 18px;
          border-radius: 9px;
          background: @color-faded-red;
          color: @color-white;
          text-align: center;
          font-size: 12px;
          font-weight: bold;
          margin-left: 5px;
        }

        &-amt {
          float: right;
          color: @color-dark-blue;
        }
      }

      &__ttl {
        margin-top: 20px;
        border-top: 1px solid @border-color;
        padding: 20px 0;
        overflow: hidden;

        &-hdr {
          font-size: @font-size-xl;
          font-weight: @semi-bold;
          float: left;

          span {
            font-size: @font-size-xs;
            color: @fg-color-light;
            font-weight: @normal;
          }
        }

        &-amt {
          float: right;
          font-size: @font-size-xl;
          color: @color-dark-blue;
          font-weight: @semi-bold;
        }
      }

      &__cshbck {
        border: 1px solid @color-green;
        background-color: @color-green-light;
        border-radius: @border-radius;
        padding: 13px 10px;
        color: @color-green;
        font-weight: @semi-bold;
        font-size: @font-size-xs;
        text-indent: 20px;
        margin-bottom: 5px;

        .image-2x('https://assets.mspcdn.net/msp-ui/giftcards/icons/tick-circle@2x.png', 16px, 16px);
        background-position: 10px center;

        span {
          float: right;
        }
      }

      &__effprc {
        line-height: 20px;
        font-size: @font-size-xs;
        color: @color-grey-2;
        text-align: right;

        span {
          color: @fg-color-light;
          font-weight: @semi-bold;
        }
      }

      &__xtra {
        margin-top: 20px;
        border-top: 1px solid @border-color;
        padding-top: 15px;
        font-size: @font-size-2xs;
        line-height: 1.7;
        color: @color-grey;
      }

      &__trms {
        display: block;
        margin-top: 15px;
        border-top: 1px solid @border-color;
        padding-top: 15px;
        text-indent: 20px;
        font-size: @font-size-2xs;
        padding-bottom: 5px;

        .image-2x('https://assets.mspcdn.net/image/upload/v1543485888/msp-ui/giftcards/icons/info_icon@2x.png', 14px, 14px);
        background-position: 0 16px;
      }
    }

    &__sbmt {
      padding: 20px 0;

      &-btn {
        margin: 0 auto;
        height: 36px;
        line-height: 36px;
        font-size: @font-size-xs;
        font-weight: @semi-bold;
        color: @color-white;
        text-align: center;
        background-color: @color-green;
        border-radius: 18px;
        text-transform: uppercase;
        transition: opacity 0.25s ease-in;
        cursor: pointer;

        &:active {
          opacity: 0.9;
        }

        span {
          display: none;
        }
      }
    }
  }
}

@media screen and (min-width: 480px) {
  .gft {
    &-wrpr {
      padding: 20px;
    }

    &-stts {
      min-height: 800px;
    }

    &-chckt {
      padding: 20px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      overflow: hidden;

      &__lft,
      &__rght {
        margin-bottom: 20px;
      }

      &__lft {
        float: left;
        width: 574px;
      }

      &__rght {
        float: right;
        width: 326px;
      }

      &__sbmt {
        padding: 12px 0;
        background: @color-grey-light;
        box-shadow: @box-shadow;
        border-bottom-left-radius: @border-radius;
        border-bottom-right-radius: @border-radius;

        &-btn {
          cursor: pointer;
          width: 300px;

          span {
            display: inline;
          }
        }
      }

      &__sctn {
        &+& {
          border-top: none;
          margin-top: 15px;
        }

        &__hdr {
          display: none;
        }

        &__cntnt {
          padding-top: 0;
        }

        &__lng-hdr {
          font-size: @font-size-xl;
        }

        &__vchr-wrpr {
          margin-top: 20px;
          float: left;
        }

        &__amt {
          height: 37px;
          line-height: 37px;

          &-wrpr {
            float: left;
            margin-top: 24px;
            margin-left: 30px;
          }
        }

        &__frm-inpt {
          width: 275px;

          textarea& {
            width: 100%;
            height: 48px;
          }
        }

        &__gift-img {
          margin-left: auto;
        }

        &--smmry {
          border: 1px solid @border-color;
          border-radius: @border-radius;

          .gft-chckt__sctn__lng-hdr {
            display: none;
          }
        }
      }
    }
  }
}

</style>
