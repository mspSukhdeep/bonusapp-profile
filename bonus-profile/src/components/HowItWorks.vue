<template>
    <div class="sctn hiw">
        <div class="hiw__sctn" align="center">
            <div class="hiw__ttl hiw__ttl--clr">
                Earn Cashback in Just 3 Simple Steps
            </div>
            <div class="clearfix hiw__stps-item-wrpr">
                <div class="hiw__stps-item">
                    <div class="hiw__stps-icon">
                        <img src="https://assets.mspcdn.net/msp-ui/icons/login-works@2x.png">
                    </div>
                    <div class="hiw__stps-cnt">
                        Step 1
                    </div>
                    <div class="hiw__stps-sub">
                        Login
                    </div>
                    <div class="hiw__stps-dscrptn">
                        Login or
                        Sign up and browse cashback offers on 100+stores
                    </div>
                </div>
                <div class="hiw__stps-item">
                    <div class="hiw__stps-icon">
                        <img src="https://assets.mspcdn.net/msp-ui/icons/shop-works@2x.png">
                    </div>
                    <div class="hiw__stps-cnt">
                        Step 2
                    </div>
                    <div class="hiw__stps-sub">
                        Shop
                    </div>
                    <div class="hiw__stps-dscrptn">
                        Click through to your favourite stores via BonusApp and shop as usual
                    </div>
                </div>
                <div class="hiw__stps-item">
                    <div class="hiw__stps-icon">
                        <img src="https://assets.mspcdn.net/msp-ui/icons/cashbackicon@2x.png">
                    </div>
                    <div class="hiw__stps-cnt">
                        Step 3
                    </div>
                    <div class="hiw__stps-sub">
                        Earn Cashback
                    </div>
                    <div class="hiw__stps-dscrptn">
                        We will track all your purchases and add real cash in your account
                    </div>
                </div>
            </div>
            <router-link to="/login" class="btn">
                Get Started
            </router-link>
        </div>
        <div class="hiw__sctn" align="center">
            <div class="hiw__ttl">
                3 Easy Options to Redeem Cashback
            </div>
            <div class="clearfix flex">
                <div class="hiw__stps-item hiw__stps-item--4">
                    <img class="hiw__rdm-icon" src="https://assets.mspcdn.net/msp-ui/icons/bank_transfer_redeem@2x.png">
                    <div class="hiw__stps-sub">
                        Bank Transfer
                    </div>
                </div>
                <div class="hiw__stps-item hiw__stps-item--4">
                    <img class="hiw__rdm-icon" src="https://doypaxk1e2349.cloudfront.net/img/paytm-200.png">
                    <div class="hiw__stps-sub">
                        PAYTM WALLET
                    </div>
                </div>
                <div class="hiw__stps-item hiw__stps-item--4">
                    <img class="hiw__rdm-icon" src="https://doypaxk1e2349.cloudfront.net/img/amazon-250.png">
                    <div class="hiw__stps-sub">
                        AMAZON GIFT CARD
                    </div>
                </div>
            </div>
        </div>
        <div class="hiw__sctn" align="center">
            <div class="hiw__ttl hiw__ttl--clr">
                Top Cashback Stores
            </div>
            <img src="https://assets.mspcdn.net/msp-ui/banners/15nov_cashback_page_banner.png" width="100%">
        </div>
        <div class="hiw__sctn" align="center">
            <div class="hiw__ttl">
                What Our Users Say About Us
            </div>
            <div class="clearfix flex">
                <div class="hiw__rvws-item">
                    <img src="http://www.mycustomer.com/sites/all/themes/pp/img/default-user.png" class="hiw__rvws-img">
                    <div class="hiw__rvws-usr">
                        <div class="hiw__rvws-usr-name clearfix">
                            Priya Katiyar
                        </div>
                        <div class="rtng-star">
                            <div class="rtng-star__inr" style="width: 100% "></div>
                        </div>
                    </div>
                    <div class="hiw__rvws-txt">
                        This is so awesome! Free money back for buying things you were going to buy anyway. Real cash in bank account! Can't beat that! Love BonusApp! </div>
                </div>
                <div class="hiw__rvws-item">
                    <img src="http://www.mycustomer.com/sites/all/themes/pp/img/default-user.png" class="hiw__rvws-img">
                    <div class="hiw__rvws-usr">
                        <div class="hiw__rvws-usr-name clearfix">
                            Shirish Kumar
                        </div>
                        <div class="rtng-star">
                            <div class="rtng-star__inr" style="width: 93% "></div>
                        </div>
                    </div>
                    <div class="hiw__rvws-txt">
                        Just superb! Cashback on Travel, Food, Movies, Electrnics, Fashion nd everythin'! One stop destination for cash backs! </div>
                </div>
                <div class="hiw__rvws-item">
                    <img src="http://www.mycustomer.com/sites/all/themes/pp/img/default-user.png" class="hiw__rvws-img">
                    <div class="hiw__rvws-usr clearfix">
                        <div class="hiw__rvws-usr-name">
                            Phani Manne
                        </div>
                        <div class="rtng-star">
                            <div class="rtng-star__inr" style="width: 95% "></div>
                        </div>
                    </div>
                    <div class="hiw__rvws-txt">
                        I always check BonusApp before I make an online purchase. Great customer support. I love the cash back!
                    </div>
                </div>
                
            </div>
        </div>
        <div class="hiw__sctn">
            <div class="hiw__ttl hiw__ttl--clr">
                <center>Frequently Asked Questions (FAQs)</center>
            </div>
            <div class="acrdn" v-for="(item, index) in questions" :key="index">
                <div class="acrdn__qstn" @click="shownItem=(shownItem===index)?'':index">
                    {{item.question}}
                    
                </div>
                <div class="acrdn__answr" v-html="item.answer" v-if="index===shownItem">
                </div>
            </div>
       
            <div class="hiw__faq-lnk"><a href="https://www.bonusapp.in/me/faq.php" class="text-link">See more</a> FAQs about the Cashback program</div>
        </div>
        <div class="hiw__sctn hiw__sctn--wht" align="center">
            <div class="hiw__ttl hiw__ttl--clr">
                Highlights of our Cashback Programme
            </div>
            <div class="hiw__stps-cntnr flex clearfix">
                <div class="hiw__stps-item hiw__stps-item--4">
                    <div class="hiw__stps-icon">
                        <img src="https://assets.mspcdn.net/msp-ui/icons/plus_stores@2x.png">
                    </div>
                    <div class="hiw__stps-dscrptn">
                        Over 100+ cashback stores
                    </div>
                </div>
                <div class="hiw__stps-item hiw__stps-item--4">
                    <div class="hiw__stps-icon">
                        <img src="https://assets.mspcdn.net/msp-ui/icons/happy_users@2x.png">
                    </div>
                    <div class="hiw__stps-dscrptn">
                        Over 1.5 million happy users
                    </div>
                </div>
                <div class="hiw__stps-item hiw__stps-item--4">
                    <div class="hiw__stps-icon">
                        <img src="https://assets.mspcdn.net/msp-ui/icons/customer_service@2x.png">
                    </div>
                    <div class="hiw__stps-dscrptn">
                        Outstanding Customer Service
                    </div>
                </div>
                <div class="hiw__stps-item hiw__stps-item--4">
                    <div class="hiw__stps-icon">
                        <img src="https://assets.mspcdn.net/msp-ui/icons/exclusive_coupons@2x.png">
                    </div>
                    <div class="hiw__stps-dscrptn">
                        Exclusive coupons &amp; hand-picked deals
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "HowItWorks",
  data: function(){
      return {
          shownItem: "",
          questions: [
                {
                    question: `How to get cashback for my purchase?`,
                    answer: `Follow below steps to get cashback for all your purchases:
                    <ol>
                        <li>1. Sign up/Login on BonusApp</li>
                        <li>2. Select the store &amp; the offer</li>
                        <li>3. Click “Shop Now” or “show code” or “grab the deal” (Give your email if you are not already logged in)</li>
                        <li>4. Complete the purchase from the store</li>
                        <li>5. Cashback will be credited in 3-4 days after your purchase</li>
                    </ol>`
                },
                {
                    question: `How many days will it take to get cashback for my purchase?`,
                    answer: `Cashback will be credited in 3-4 days after your purchase from the store. Please note that the cashback credited in your account will be verified in 4-12 weeks after confirming from the store for returns/cancellations (if applicable). Once verified, Cashback can be transferred to your Bank A/c or redeemed for Paytm cash/Amazon Gift Vouchers.`
                },
                {
                    question: `How will I receive my cashback?`,
                    answer: `Cashback from BonusApp is real cash that you can transfer to your Bank A/c or redeem against Paytm cash / Amazon gift vouchers after verification`
                },
                {
                    question: `After how many days, I can use my cashback?`,
                    answer: `Cashback will get verified in 4-12 weeks after your purchase. The delay is because the store has to confirm returns/cancellations (if applicable) with us which is usually done by the store in 4-12 weeks.`
                },
                {
                    question: `I have done my purchase but haven’t received my cashback?`,
                    answer: `Ideally, you should be able to see the cashback amount against your purchase in 3-4 days. In case you haven’t received cashback for your purchase, you can raise claim from Cashback Activity page. <a href="https://www.bonusapp.in/me/#tabOpen=claims_issues" target="_blank">Click here</a> to raise claim now.`
                },
                {
                    question: `How to check cashback for my purchases?`,
                    answer: `You can check the cashback credited for all your purchases under 'Cashback Earned' tab of your Cashback account page. You can login or sign up using the same email that you have used for your purchases. <a href="https://www.bonusapp.in/me/#tabOpen=points_earned" target="_blank">Click here</a> to check your account now.`
                }
            ]
      }
  }
};
</script>
<style lang="less">
.sctn {
  border-bottom: 1px solid #dfe1e8;
  background-color: #fff;
}
.hiw {
  &__sctn {
    padding: 25px 15px 30px;
    &:nth-child(even) {
      background-color: rgba(242, 243, 245, 0.6);
    }
  }
  &__ttl {
    color: #111;
    font-size: 24px;
    margin-bottom: 50px;
    &--clr {
      color: #0a9181;
    }
  }
  &__stps {
    &-item {
    flex-grow: 1;
      &-wrpr{
          display: flex;
      }
    }
    &-icon {
      height: 24px;
      width: 24px;
      padding: 20px;
      border-radius: 32px;
      background-color: rgba(242, 243, 245, 0.6);
      img {
        max-width: 100%;
      }
    }
    &-cnt {
      width: 40px;
      background-color: #0a9181;
      border-radius: 3px;
      font-size: 11px;
      margin-top: -8px;
      font-weight: 600;
      padding: 0 3px;
      color: #fff;
      text-transform: uppercase;
    }
    &-sub {
      font-size: 14px;
      color: #444;
      font-weight: 600;
      margin-top: 12px;
      text-transform: uppercase;
    }
    &-dscrptn {
      margin: 10px 20px 40px;
      font-size: 14px;
      color: #444;
      line-height: 22px;
    }
    .text-link {
      color: #0066c0;
      cursor: pointer;
    }
  }
  &__rdm {
    &-icon {
      height: 42px;
    }
  }
  &__rvws {
    &-txt {
      margin-top: 20px;
      float: left;
      width: 100%;
      text-align: left;
      font-size: 14px;
      line-height: 22px;
      color: #444;
      min-height: 88px;
    }
    &-usr {
      margin-left: 15px;
      width: 180px;
      float: left;
      &-name {
        text-align: left;
        font-size: 15px;
        color: #0a9181;
        margin-bottom: 4px;
      }
    }
    &-img {
      height: 42px;
      width: 42px;
      float: left;
      border-radius: 21px;
    }
    &-item {
      padding: 15px;
      margin: 8px;
      border-radius: 3px;
      border: 1px solid #dfe1e8;
      background-color: #fff;
    }
  }
  &__faq-lnk {
    text-align: left;
    color: #444;
    font-size: 15px;
    margin-top: 30px;
  }
}

@media screen and (max-width: 480px) {
.hiw{
    &__stps{
        &-sub{
            font-size: 13px;
        }
        &-item{
            float: none;
            margin: 0 auto;
            &--4{
                float: left;
                &:nth-child(n+3){
                    margin-top: 20px;
                }
                & + &{
                    // margin-top: 20px;
                }
            }
        }
    }
    &__rdm{
        &-icon{
            height: 64px;
        }
    }
}
}

.flex{
    display: flex
}
</style>
