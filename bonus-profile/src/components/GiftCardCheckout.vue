<template>
  <div class="wrpr">
    <div class="gft-wrpr">

      <!-- POST Purchase status Message -->
      <div class="gft-stts" 
        v-show="postSubmitStatuses.display" 
        :class="{ 'gft-stts--success' : postSubmitStatuses.selected.type === 'success', 
                  'gft-stts--failure' : postSubmitStatuses.selected.type === 'failure',
                  'gft-stts--payment' : postSubmitStatuses.selected.type === 'payment' }">
        <div class="gft-stts__img"></div>
        <div class="gft-stts__hdr">{{postSubmitStatuses.selected.header}}</div>
        <p class="gft-stts__cntnt" v-for="content in postSubmitStatuses.selected.contents">{{content}}</p>
        <router-link v-if="postSubmitStatuses.selected.path" :to="postSubmitStatuses.selected.path">
          <div class="gft-stts__btn">{{postSubmitStatuses.selected.buttonText}}</div>
        </router-link>
        <div v-else class="gft-stts__btn" @click="refreshPage()">{{postSubmitStatuses.selected.buttonText}}</div>
      </div>

      <!-- Gift Checkout Layout -->
      <div v-show="!postSubmitStatuses.display">
        <div class="gft-chckt">
          <div class="gft-chckt__lft">

            <!-- GIFT CARD DETAILS-->
            <div class="gft-chckt__sctn gft-chckt__sctn--slct js-gc-slct">
              <div class="gft-chckt__sctn__hdr" 
                v-show="!giftCardDetails.showSection"
                :class="{ 'done' : giftCardDetails.sectionComplete }"
                @click="toggleSection(giftCardDetails)">Choose Gift Card Value</div>
              <div class="gft-chckt__sctn__cntnt" :class="{ 'hidden' : !giftCardDetails.showSection }">
                <div class="gft-chckt__sctn__lng-hdr">Choose your <span>{{ storeDetails.visibleName }}</span> Gift Card Value</div>
                <div class="gft-chckt__sctn__vchr-wrpr">
                  <div class="gft-chckt__sctn__vchr" 
                    v-for="v in ascendingVoucherList" 
                    :key="v.vAmount"
                    :class="{ 'slctd' : v.vAmount === amount }"
                    @click="selectVoucherAmount(v.vAmount, v.sellingprice)">
                      &#8377;{{convertToRupees(v.vAmount)}}
                  </div>
                </div>
                <div class="gft-chckt__sctn__amt-wrpr">
                  <input class="gft-chckt__sctn__amt" type="number" v-model.lazy="amount">
                  <div class="gft-chckt__sctn__amt-err" v-show="giftCardDetails.amountError">
                    Invalid! 
                    {{storeDetails.allowCustomVouchers ? 
                      `Enter an amount between &#8377;${convertToRupees(storeDetails.range[0])} and &#8377;${convertToRupees(storeDetails.range[1])}` 
                      : 
                      `Amount must be a combination of voucher(s) and not exceed &#8377;${convertToRupees(amountUpperBound)}`}}
                  </div>
                </div>
                <div class="gft-chckt__sctn__cntnue" 
                  :class="{ 'enabled' : giftCardDetails.sectionComplete }"
                  @click="finishGiftCardSection()">
                  Continue
                </div>
              </div>
              <div class="gft-chckt__sctn__ftr" v-show="giftCardDetails.showFooter">
                <div class="gft-chckt__sctn__ftr-lft" :class="{ 'error' : giftCardDetails.amountError }">
                  {{giftCardDetails.amountError ? 'Invalid Amount' : `&#8377;${amount}`}}
                </div>
                <div class="gft-chckt__sctn__ftr-rght" @click="toggleSection(giftCardDetails)">Change</div>
              </div>
            </div>

            <!-- SENDER RECEIVER DETAILS -->
            <div class="gft-chckt__sctn gft-chckt__sctn--sndr js-gc-sndr">
              <div class="gft-chckt__sctn__hdr" 
                v-show="!senderReceiverDetails.showSection"
                :class="{ 'done' : senderReceiverDetails.sectionComplete && giftCardDetails.continue }" 
                @click="toggleSection(senderReceiverDetails)">Sender's Details</div>
              <div class="gft-chckt__sctn__cntnt" 
                :class="{ 'hidden' : !senderReceiverDetails.showSection }">
                <div class="gft-chckt__sctn__lng-hdr">Sender's Details</div>
                <div class="gft-chckt__sctn__lgn"
                  v-show="!profile.email">
                  <div class="gft-chckt__sctn__lgn-btn"
                    @click="loginUser()">Login to continue
                  </div>
                </div>
                <div>
                  <div class="gft-chckt__sctn__radio-wrpr">
                    <label>
                      <input class="gft-chckt__sctn__radio" type="radio" 
                        name="receiver" value="Y" checked="checked"
                        v-model.lazy="senderReceiverDetails.giftToSelf">
                      <span class="gft-chckt__sctn__radio--grphcl"></span>
                      <span>For me</span>
                    </label>
                    <label>
                      <input class="gft-chckt__sctn__radio" type="radio" 
                        name="receiver" value="N"
                        v-model.lazy="senderReceiverDetails.giftToSelf">
                      <span class="gft-chckt__sctn__radio--grphcl"></span>
                      <span>For someone else</span>
                    </label>
                  </div>
                  <div class="gft-chckt__sctn__frm">
                    <div class="gft-chckt__sctn__frm-fld" v-show="senderReceiverDetails.giftToSelf === 'N'">
                      <div class="gft-chckt__sctn__frm-lbl">Receiver's Name*</div>
                      <input type="text" class="gft-chckt__sctn__frm-inpt" v-model.lazy="senderReceiverDetails.toName">
                    </div>
                    
                    <div class="gft-chckt__sctn__frm-lbl">
                      {{senderReceiverDetails.giftToSelf === 'N' ? "Receiver's" : "Your" }} Email*
                    </div>
                    <input type="email" class="gft-chckt__sctn__frm-inpt" v-model.lazy="senderReceiverDetails.toEmail">

                    <div class="gft-chckt__sctn__frm-fld" v-show="senderReceiverDetails.giftToSelf === 'N'">
                      <div class="gft-chckt__sctn__frm-lbl">Personalized Message*</div>
                      <textarea type="text" class="gft-chckt__sctn__frm-inpt gft-chckt__sctn__frm-inpt--morelines" 
                        maxlength="140" v-model.lazy="senderReceiverDetails.message"></textarea>
                      <div class="gft-chckt__sctn__frm-inpt-cnt"><span>{{messageLength}}</span> / 140</div>
                    </div>

                    <div class="gft-chckt__sctn__frm-lbl">Sender's Name*</div>
                    <input type="text" class="gft-chckt__sctn__frm-inpt" v-model.lazy="senderReceiverDetails.fromName">
                  </div>
                  <div class="gft-chckt__sctn__cntnue"
                    :class="{ 'enabled' : senderReceiverDetails.sectionComplete }"
                    @click="finishSenderReceiverSection()"
                    v-show="profile.email">
                    Continue
                  </div>
                </div>
              </div>
              <div class="gft-chckt__sctn__ftr" v-show="senderReceiverDetails.showFooter">
                <div class="gft-chckt__sctn__ftr-lft" 
                  :class="{ 'error' : !giftCardDetails.sectionComplete }">
                  {{senderReceiverDetails.toEmail}}
                </div>
                <div class="gft-chckt__sctn__ftr-rght" @click="toggleSection(senderReceiverDetails)">Change</div>
              </div>
            </div>
          </div><!-- End section left -->

          <!-- SUMMARY -->
          <div class="gft-chckt__rght">
            <div class="gft-chckt__sctn gft-chckt__sctn--smmry js-gc-smmry">
              <div class="gft-chckt__sctn__hdr" 
                v-show="!summaryDetails.showSection"
                @click="toggleSection(summaryDetails)">
                  Summary
              </div>
              <div class="gft-chckt__sctn__cntnt" :class="{ 'hidden' : !summaryDetails.showSection }">
                <div class="gft-chckt__sctn__lng-hdr">Summary</div>
                <div class="gft-chckt__sctn__gift-img">
                  <img v-show="generatedVouchers.length > 1" class="bkgnd" :src="storeDetails.storeImage">
                  <img class="frgnd" :src="storeDetails.storeImage">
                  <div class="gft-chckt__sctn__gift-img-amt" v-show="!giftCardDetails.amountError && amount">
                    &#8377;{{convertToRupees(amount)}}
                  </div>
                </div>

                <div class="gft-chckt__sctn__gift-init" v-show="!amount || giftCardDetails.amountError">
                  Go ahead, select the gift card value from the menu
                </div>
                <div v-show="!!amount && !giftCardDetails.amountError">
                  <div class="gft-chckt__sctn__itm" v-for="v in generatedVouchers">
                    <div class="gft-chckt__sctn__itm-name">&#8377;{{convertToRupees(v.vAmount)}} Gift Card</div>
                    <div class="gft-chckt__sctn__itm-qntty" v-show="v.qty > 1">{{v.qty}}</div>
                    <div class="gft-chckt__sctn__itm-amt">&#8377;{{convertToRupees(v.qty * v.vAmount)}}</div>
                  </div>
                  <div class="gft-chckt__sctn__ttl">
                    <div class="gft-chckt__sctn__dscnt">
                      <div class="gft-chckt__sctn__dscnt-ttl">{{discountPercent}}% Discount</div>
                      <div class="gft-chckt__sctn__dscnt-amt">- &#8377;{{convertToRupees(discountAmount)}}</div>
                    </div>
                    <div class="gft-chckt__sctn__ttl-hdr">Total <span>(You pay)</span></div>
                    <div class="gft-chckt__sctn__ttl-amt">&#8377;{{convertToRupees(totalYouPay)}}</div>
                  </div>
                  <div class="gft-chckt__sctn__cshbck">
                    Instant Bonusapp Cashback
                    <span>&#8377;{{convertToRupees(cashback)}}</span>
                  </div>
                  <div class="gft-chckt__sctn__effprc">Effective Price will be <span>&#8377;{{convertToRupees(effectivePrice)}}</span></div>
                  <div class="gft-chckt__sctn__xtra">
                    Gift Cards are delivered via email instantly and Cashback will be credited within 15 minutes of your final payment.
                  </div>
                  <a class="gft-chckt__sctn__trms" @click="displayTnC()"><span>{{storeDetails.visibleName}}</span> Terms and Conditions</a>
                </div>
                <div class="gft-chckt__sctn__cntnue" 
                  v-show="!!amount && !giftCardDetails.amountError"
                  :class="{ 'enabled' : summaryDetails.sectionComplete }"
                  @click="purchaseVoucher()">
                  Proceed to pay
                </div>
              </div>
              <div class="gft-chckt__sctn__sbmt">
                <div class="gft-chckt__sctn__cntnue" 
                  :class="{ 'enabled' : summaryDetails.sectionComplete }"
                  @click="purchaseVoucher()">
                  Proceed to pay
                </div>
              </div> 
            </div>
          </div><!-- End section right -->
        </div><!-- End checkout section -->
      </div>
    </div><!-- End gift wrapper -->

    <!-- Modal -->
    <Modal v-if="showTnCModal" @close="showTnCModal = false">
      <h3 slot="header">{{storeDetails.tnc.title}}</h3>
      <div slot="body">
        <ul>
          <li v-for="point in storeDetails.tnc.points">{{point}}</li>
        </ul>
      </div>
    </Modal>
  </div><!-- End wrapper -->
</template>
<script>
import BonusHead from "./BonusHead";
import Modal from "./modal";
import UTILS from "../utils/index"
import axios from "axios";

export default {
  name: "GiftCardCheckout",
  props: ['store'],
  components: {
    Modal
  },
  data() {
    return {
      amount: 0,
      amountUpperBound: 50000,
      totalYouPay: 0,
      discountPercent: 0,
      discountAmount: 0,
      cashback: 0,
      effectivePrice: 0,
      storeDetails: {
        /* 
         name: '', 
         visibleName: '',
         vouchers: [{ vAmount, sellingprice }], 
         allowCustomVouchers: false, 
         tnc: {title: '', points: []}, 
         cashbackRate: 0.0 
        */
      },
      giftCardDetails: {
        amountError: false,
        sectionComplete: false,
        showSection: true,
        showFooter: false,
        allowHeaderClick: true,
        continue: false
      },
      senderReceiverDetails: {
        giftToSelf: 'Y',
        toEmail: '',
        toName: '',
        fromName: '',
        message: '',
        sectionComplete: false,
        showSection: false,
        showFooter: false,
        allowHeaderClick: false,
        continue: false
      },
      summaryDetails: {
        sectionComplete: false,
        showSection: false,
        showFooter: false,
        allowHeaderClick: false,
        continue: false
      },
      generatedVouchers: [ /* { vAmount, sellingprice, qty } */ ],
      showTnCModal: false,
      initialFormAutoFill: false, // IMP:: Fill form with appropriate profile data ONLY IN THE BEGINNING (during creation)!
      postSubmitStatuses: {
        display: false,
        selected: {
          type: '',
          header: '',
          contents: [],
          buttonText: '',
          path: ''
        },
        failure: {
          type: 'failure',
          header: 'Whoops! Something went wrong...',
          contents: [
            "Don't worry, it happens to all of us. We'll take a look into this",
            "If you have been charged, the amount will be reversed to your original payment method."
          ],
          buttonText: "Start Over"
        },
        success: {
          type: 'success',
          header: 'Woohoo! Your gift card is on its way...',
          contents: [
            "The gift card(s) have been emailed to receiver's email",
            "Bonusapp Cashback will be credited to your account shortly"
          ],
          buttonText: "Go Home",
          path: '/'
        },
        payment: {
          type: 'payment',
          header: 'Uh-oh! Something went wrong with your payment...',
          contents: [
            "There was an issue in processing your payment. If this problem persists, please contact support@bonusapp.in"
          ],
          buttonText: "Start Over"
        }
      }
    }
  },
  computed: {
    desktop() {
      return this.$store.state.app.window.width > 1200;
    },
    profile() {
      return this.$store.state.profile;
    },
    messageLength() {
      return this.senderReceiverDetails.message.length;
    },
    ascendingVoucherList() {
      let _ascList = JSON.parse(JSON.stringify(this.storeDetails.vouchers));
      return _ascList.sort((a, b) => a.vAmount > b.vAmount ? 1 : -1); // Display in ascending order of voucher amounts
    }
  },
  created() {
    /* Determine status if sent: */ 
    if(this.$route.query.status) this.displayPostSubmitStatus(this.$route.query.status);
    /* Fetch store info (API Call) */
    this.fetchStoreData();
    /* Auto fill data on creation (useful if logged in): */
    this.autofillData(this.profile);
  },
  watch: {
    amount(newVal, oldVal) {
      this.checkAmountValidity();
      this.calculateAllPrices();
      this.checkCompleteness();
    },
    senderReceiverDetails: {
      handler(val) {
        this.checkCompleteness();
      },
      deep: true
    },
    profile(newVal, oldVal) {
      /* Autofills data when profile changes (on login) */
      if(!this.initialFormAutoFill) {
        this.autofillData(newVal);
        this.initialFormAutoFill = true;
      }
    }
  },
  methods: {
    autofillData(userProfile) {
      this.senderReceiverDetails.toEmail = (userProfile && userProfile.email) ? userProfile.email : '';
      this.senderReceiverDetails.fromName = (userProfile && userProfile.name) ? userProfile.name : '';
    },
    displayPostSubmitStatus(status) {
      if(status === 'success' || status === 'failure' || status === 'payment') {
        this.postSubmitStatuses.selected = this.postSubmitStatuses[status];
        this.postSubmitStatuses.display = true;
      } else this.postSubmitStatuses.display = false;
    },
    convertToRupees(number) {
      let x = number.toString(); 
      let afterPoint = '';
      if(x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'), x.length);
      x = (Math.floor(x)).toString();
      let lastThree = x.substring(x.length - 3);
      let otherNumbers = x.substring(0, x.length - 3);
      if(otherNumbers !== '') lastThree = ',' + lastThree;
      return (otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint);
    },
    fetchStoreData() {
      axios
      .get(`https://www.bonusapp.com/gc/api/product.php?store=${this.store}&source=cron`)
      .then(response => {
        let _data = response.data;
        /* Sort vouchers into descending order of voucher amounts: */
        _data.vouchers.sort((a, b) => a.vAmount > b.vAmount ? -1 : 1);
        /* Calculate and append selling price for voucher based on amount */
        if(_data.vouchers.length)
          _data.vouchers.forEach(function(v) {
            v.sellingprice = v.vAmount - (v.vAmount * _data.voucherDiscountRate);
          });
        else {
          let _defVouchers = [100, 200, 500, 1000, 2000, 5000];
          _defVouchers.forEach(v => {
            if(v >= _data.range[0] && v <= _data.range[1]) 
              _data.vouchers.push({
                vAmount: v,
                sellingprice: v - (v * _data.voucherDiscountRate)
              });
          });
        }
        /* After modifications, store response data as Store Details */
        this.storeDetails = _data;
      });
    },
    selectVoucherAmount(vAmt, sPrice) {
      this.amount = vAmt;
    },
    calculateAllPrices() {
      if(!this.giftCardDetails.amountError) {
        this.totalYouPay = 0;
        this.cashback = 0;
        this.effectivePrice = 0;
        this.discountPercent = 0;

        let _amt = this.amount;
        let _genVouchers = this.generatedVouchers;

        for(let i = 0; i < _genVouchers.length; i++) {
          this.totalYouPay += _genVouchers[i].sellingprice * _genVouchers[i].qty;
        }

        this.totalYouPay = roundToTwoDecimalPlaces(this.totalYouPay);
        this.discountAmount = roundToTwoDecimalPlaces(this.amount - this.totalYouPay);
        this.discountPercent = roundToTwoDecimalPlaces(this.discountAmount / this.amount * 100);
        this.cashback = roundToTwoDecimalPlaces(this.totalYouPay * this.storeDetails.cashbackRate);
        this.effectivePrice = roundToTwoDecimalPlaces(this.totalYouPay - this.cashback);
      }
      /* Inner functions */
      function roundToTwoDecimalPlaces(price) {
        if(Math.round(price) !== price) price = price.toFixed(2);
        return price;
      }
    },
    checkAmountValidity() {
      // Check upper bound: 
      if(this.amountUpperBound < this.amount) {
        this.generateVoucher(null, 0, true); // Erase existing vouchers
        this.giftCardDetails.amountError = true;
        return;
      }
      // Custom vouchers allowed:
      if(this.storeDetails.allowCustomVouchers) {
        let minAmount = this.storeDetails.range[0];
        let maxAmount = this.storeDetails.range[1];
        let _vAmount = this.amount;

        if(_vAmount >= minAmount && _vAmount <= maxAmount) {
          let _sellingprice = this.amount - (this.amount * this.storeDetails.voucherDiscountRate);
          this.generateVoucher({
            vAmount: _vAmount,
            sellingprice: _sellingprice
          }, 1, true);
          this.giftCardDetails.amountError = false;
        } else this.giftCardDetails.amountError = true;
      } else {
        // Custom vouchers invalid:
        let _amt = this.amount;
        let _vchrs = this.storeDetails.vouchers;
        this.generateVoucher(null, 0, true); // Erase existing vouchers
        // Check how many multiple vouchers can make up for the amount
        let combos = this.successfulCombinations(_vchrs, _amt);
        // Remainder amount? ==> ERROR (not allowed)
        if(combos && combos.length) {
          this.generateVoucher(null, 0, true); // Erase existing vouchers
          combos.forEach(v => {
            this.generateVoucher({
              vAmount: v[0],
              sellingprice: v[4]
            }, v[1])
          });
          this.giftCardDetails.amountError = false;
        } else this.giftCardDetails.amountError = true;
      }
    },
    successfulCombinations(vchrs, amt) {
        /* vchrs must be in descending order of vAmounts */
        let cp = [ /* amt, qty, prev remndr, vchr-index, sprice */ ], q, r = amt;
        let len = vchrs.length;
        let numIter = 0;
        const maxIter = 2000;
        for(let i = 0; i < len;) {
            /* If Algorithm is taking way too many iterations, a simple combo doesn't exist: terminate */
            if(numIter > maxIter) {
              console.log(numIter);
              return null;
            }
            /* Find quotient and remainder at every point */
            let v = vchrs[i];
            let isLast = (i === len - 1);
            if(r >= v.vAmount) {
                let _cpAmt = v.vAmount, _sp = v.sellingprice, _cpQty, _prevR = r;
                q = Math.floor(r / v.vAmount);
                r = r % v.vAmount;
                _cpQty = q;
                cp.push([_cpAmt, _cpQty, _prevR, i, _sp]);
            }
            /* If remainder still exists on reaching last voucher: backtrack */
            if(isLast && r && cp.length) { // Empty cp check
                let lastVS = (cp[cp.length - 1][3] === i);
                let newValues = backtrack(lastVS, i);
                i = newValues[0];
                r = newValues[1];
            } else i++;
            numIter++;
        }

        return cp;

        /* Inner Functions: */
        function backtrack(lastVoucherSelected, cur_i) {
            if(lastVoucherSelected) cp.length && cp.pop();
            let lastCP = cp.length && cp.pop();
            let new_i, new_r;
            if(lastCP) {
                if(lastCP[1] - 1) { // More than 1 unit
                    cp.push([lastCP[0], lastCP[1] - 1, lastCP[2], lastCP[3], lastCP[4]]);
                    new_r = lastCP[2] - (lastCP[0] * (lastCP[1] - 1));
                } else {
                    new_r = lastCP[2];
                }
                new_i = lastCP[3] + 1;
            } else {
                new_i = cur_i + 1;
                new_r = r;
            }
            return [new_i, new_r];
        }
    },
    generateVoucher(voucher, qty, eraseOld = false) {
      if(eraseOld) this.generatedVouchers = [];
      if(voucher) this.generatedVouchers.push({
        vAmount: voucher.vAmount,
        sellingprice: voucher.sellingprice,
        qty: qty
      });
    },
    toggleSection(sectionDetails) {
      if(sectionDetails.allowHeaderClick) {
        sectionDetails.showSection = !sectionDetails.showSection;
        // If content is visible, footer is invisibile (& vice-versa):
        if(!sectionDetails.showSection) sectionDetails.showFooter = true;
        else sectionDetails.showFooter = false;
      }
    },
    showSection(sectionDetails) {
      sectionDetails.showSection = true;
      sectionDetails.showFooter = false;
    },
    checkCompleteness() {
      /* Gift Card (Voucher) Completeness Check: */
      if(this.amount && !this.giftCardDetails.amountError) this.giftCardDetails.sectionComplete = true;
      else this.giftCardDetails.sectionComplete = false;

      /* SenderReceiver Completeness Check: */
      if(this.giftCardDetails.sectionComplete) {
        if(this.senderReceiverDetails.toEmail && 
           this.senderReceiverDetails.fromName &&
           validateEmail(this.senderReceiverDetails.toEmail)) {
          if(this.senderReceiverDetails.giftToSelf === 'N') {
            if(this.senderReceiverDetails.toName &&
               this.senderReceiverDetails.message) {
              this.senderReceiverDetails.sectionComplete = true;
            } else this.senderReceiverDetails.sectionComplete = false;
          } else this.senderReceiverDetails.sectionComplete = true;
        } else this.senderReceiverDetails.sectionComplete = false;
      } else this.senderReceiverDetails.sectionComplete = false;
      

      /* Summary Completeness Check: */
      if(this.giftCardDetails.sectionComplete && 
         this.senderReceiverDetails.sectionComplete) {
        this.summaryDetails.sectionComplete = true;
      } else this.summaryDetails.sectionComplete = false;

      /* If all are complete, return true: */
      if(this.giftCardDetails.sectionComplete && 
         this.senderReceiverDetails.sectionComplete && 
         this.summaryDetails.sectionComplete) {
        return true;
      }
      return false;

      /* Inner Functions */
      function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    },
    finishGiftCardSection() {
      this.checkCompleteness();
      if(this.giftCardDetails.sectionComplete) {
        this.toggleSection(this.giftCardDetails);
        this.giftCardDetails.continue = true;
      }
      if(this.giftCardDetails.sectionComplete) {
        this.senderReceiverDetails.allowHeaderClick = true;
        this.showSection(this.senderReceiverDetails);
      }
    },
    finishSenderReceiverSection() {
      this.checkCompleteness();
      if(this.senderReceiverDetails.sectionComplete) {
        this.toggleSection(this.senderReceiverDetails);
        this.senderReceiverDetails.continue = true;
      }
      if(this.senderReceiverDetails.sectionComplete) {
        this.summaryDetails.allowHeaderClick = true;
        this.showSection(this.summaryDetails);
      }
    },
    purchaseVoucher() {
      // IMPORTANT: Make sure all fields are complete!
      if(this.checkCompleteness() && this.isLoggedIn()) {
        this.makePurchaseCall();
      }
    },
    isLoggedIn() {
      return !!this.profile.email;
    },
    loginUser() {
      /* Data required for callback (through closure) */
      let _giftcard = this;
      UTILS.setupWindowLogin(null, "bonusapp", true, loginSuccess);
      /* Inner Functions: */ 
      function loginSuccess() {
        _giftcard.$store.dispatch('fetchProfile');
      }
    },
    makePurchaseCall() { 
      let _giftcard = this;     
      let data = {
        store: this.storeDetails.name,
        productId: this.storeDetails.productId,
        totalVoucherAmount: this.amount,
        totalUserPayment: this.totalYouPay,
        vouchers: this.generatedVouchers,
        sendersName: this.senderReceiverDetails.fromName,
        recipientEmail: this.senderReceiverDetails.toEmail,
        profile: {
          email: this.profile.email,
          name: this.profile.name
        }
      };
      if(this.senderReceiverDetails.giftToSelf === 'N') {
        data.gift = true;
        data.message = this.senderReceiverDetails.message;
        data.receiversName = this.senderReceiverDetails.toName;
      }

      /* Perform Payment form submit */
      this.formSubmit('https://www.bonusapp.com/gc/transact.php?source=cron', data, 'post');
    },
    refreshPage() { // Without query parameters
      window.location = window.location.href.split("?")[0];
    },
    displayTnC() {
      this.showTnCModal = true;
    },
    formSubmit(path, params, method) {
      /**
       * sends a request to the specified url from a form. this will change the window location.
       * @param {string} path the path to send the post request to
       * @param {object} params the paramiters to add to the url
       * @param {string} [method=post] the method to use on the form
       */
      method = method || "post"; // Set method to post by default if not specified.

      var form = document.createElement("form");
      form.setAttribute("method", method);
      form.setAttribute("action", path);

      for(var key in params) {
          if(params.hasOwnProperty(key)) {
              var hiddenField = document.createElement("input");
              hiddenField.setAttribute("type", "hidden");
              hiddenField.setAttribute("name", key);
              if(typeof params[key] === "object") {
                hiddenField.setAttribute("value", JSON.stringify(params[key]));
              } else {
                hiddenField.setAttribute("value", params[key]);
              }
              
              form.appendChild(hiddenField);
          }
      }

      document.body.appendChild(form);
      form.submit();
    }
  }
};

</script>
<style lang="less">
@import "../style/bonus_profile.less";

@border-radius: 8px;
@heavy-box-shadow: 0px 1px 6px 0px #dfe1e8;

@bg-white: #ffffff;
@bg-light-blue: #4a90e2;
@color-light-blue: #4a90e2;
@color-grey-moderate: #bbbbbb;
@color-dark-blue: #0d426c;
@color-faded-red: #ed4454;
@border-light-blue: #4a90e2;
@border-dark-blue: #0d426c;
@border-radio: #b4bfc9;

.hidden {
  display: none;
}

.error.error {
  color: @color-red;
}

.gft {
  &-wrpr {
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

    &--payment &__img {
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

      & + & {
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
    overflow: hidden;

    &__sctn {
      box-shadow: @heavy-box-shadow;
      border-radius: @border-radius;
      overflow: hidden;
      margin: 10px;

      &&--sndr {
        position: relative;
      }

      .gft-chckt__lft &:first-child {
        border-top: none;
      }

      &__hdr {
        font-size: @font-size-xs;
        height: 45px;
        line-height: 45px;
        text-transform: uppercase;
        font-weight: @semi-bold;
        padding: 0 15px;

        &.done {
          .image-2x('https://assets.mspcdn.net/image/upload/v1543486267/msp-ui/giftcards/icons/tick@2x.png', 20px, auto);
          background-position: 15px center;
          padding-left: 45px;
          color: @color-grey-2;
        }
      }

      &__ftr { 
        padding-left: 45px;
        margin: 0 10px 15px 0;
        overflow: hidden;

        &-lft {
          float: left;
          width: 170px;
          .line-clamp(1);
        }
        &-rght {
          float: right;
          color: @color-blue;
          font-size: @font-size-xs;
        }
      }

      &__cntnue,
      &__lgn-btn {
        margin: 0 auto;
        margin-top: 30px;
        height: 36px;
        line-height: 36px;
        font-size: @font-size-xs;
        font-weight: @semi-bold;
        color: @color-white;
        text-align: center;
        background-color: @color-grey-moderate;
        border-radius: 18px;
        text-transform: uppercase;
        transition: opacity 0.25s ease-in;
        cursor: pointer;
        box-shadow: @box-shadow;

        &:active {
          opacity: 0.9;
        }
        span {
          display: none;
        }
        &.enabled.enabled {
          background-color: @color-green;
        }
      }

      &__lgn {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.6);

        &-btn {
          width: 200px;
          margin: 120px auto;
          background-color: @color-green;
        }
      }

      &__sbmt {
        display: none;
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
        min-width: 38px;
        padding: 0 10px;
        height: 36px;
        margin-bottom: 10px;
        border: 1px solid transparent;
        border-radius: @border-radius;
        line-height: 36px;
        box-shadow: @box-shadow-2;
        font-size: @font-size-xs;
        text-align: center;
        color: @color-dark-blue;
        margin-right: 12px;
        cursor: pointer;

        &:hover,
        &:active,
        &.slctd {
          border: 1px solid @border-light-blue;
         /* font-weight: @semi-bold;*/
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
        
        &-err {
          font-size: @font-size-xs;
          margin-top: 5px;
          color: @color-red;
        }
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
          margin-top: 15px;

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

        &-fld {
          margin-top: 24px;
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
              filter: brightness(70%);
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
          padding: 0 48px 30px 48px;
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
          min-width: 18px;
          height: 18px;
          line-height: 18px;
          padding: 0 5px;
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
        padding: 0 0 20px 0;
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

      &__dscnt {
        font-size: @font-size-xs;
        margin: 15px 0 10px 0;
        overflow: hidden;

        &-ttl {
          float: left;
        }
        &-amt {
          float: right;
        }
      }

      &__cshbck {
        border: 1px solid @color-green;
        background-color: @color-green-light;
        border-radius: @border-radius;
        padding: 13px 8px;
        color: @color-green;
        font-weight: @semi-bold;
        font-size: @font-size-xs;
        text-indent: 20px;
        margin-bottom: 5px;

        .image-2x('https://assets.mspcdn.net/msp-ui/giftcards/icons/tick-circle@2x.png', 16px, 16px);
        background-position: 10px center;

        span {
          float: right;
          text-indent: 0;
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
        margin-top: 5px;
        padding-top: 5px;
        text-indent: 20px;
        font-size: @font-size-2xs;
        padding-bottom: 5px;

        .image-2x('https://assets.mspcdn.net/image/upload/v1543485888/msp-ui/giftcards/icons/info_icon@2x.png', 14px, 14px);
        background-position: 0 center;
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
      padding: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      overflow: hidden;

      &__lft,
      &__rght {
        margin-bottom: 20px;
      }

      &__lft {
        float: left;
        width: 614px;
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
        margin: 5px;

        &&--sndr {
          min-height: 282px;
        }

        & + & {
          border-top: none;
          margin-top: 20px;
        }

        &__hdr {
          display: none;
        }

        &__ftr {
          display: none;
        }

        &__cntnt {
          padding: 20px;

          && {
            display: block;
          }
        }

        &__cntnue {
          display: none;
        }

        &__lgn {
          &-btn {
            margin: 130px auto;
          }
        }

        &__lng-hdr {
          font-size: @font-size-xl;
        }

        &__vchr {
          &:last-child {
            margin-right: 30px;
          }
          &-wrpr {
            margin-top: 20px;
            float: left;
          }
        }

        &__amt {
          height: 37px;
          line-height: 37px;

          &-wrpr {
            float: left;
            margin-top: 24px;
          }
          &-err {
            width: 175px;
          }
        }

        &__frm {
          margin-top: 40px;

          &-inpt {
            width: 275px;

            textarea& {
              width: 100%;
              height: 72px;
            }
          }
        }

        &__gift-img {
          margin-left: auto;
        }

        &__sbmt {
          display: block;
          padding: 12px 23px;
          background-color: @bg-color;

          .gft-chckt__sctn__cntnue {
            display: block;
            background-color: @color-grey-moderate;
            margin-top: 0;
          }
        }
      }
    }
  }
}

</style>
