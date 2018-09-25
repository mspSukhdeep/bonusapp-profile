<template>
    <div class="prfl-sctn">
        <div class="prfl-edit__ttl" v-display="'desktop'">
            Frequently asked questions
        </div>
        <div class="acrdn" v-for="(item, index) in faqs" :key="index">
                <div class="acrdn__qstn" @click="shownItem=(shownItem===index)?'':index">
                    {{item.question}}
                </div>
                <div class="acrdn__answr" v-html="item.answer" v-if="index===shownItem">
                </div>
            </div>
    </div>
</template>
<script>
export default {
  name: "FAQ",
  data: function() {
    return {
    shownItem: "",
      faqs: [
        {
          question: "What is ‘Cashback’ program?",
          answer:
            "‘Cashback’ program is a unique loyalty and rewards program that lets you earn Cashback on all your purchases via BonusApp.in."
        },
        {
          question: "Are there any charges to be part of 'Cashback' program?",
          answer: "There are no charges to be part of 'Cashback' program."
        },
        {
          question: "What is my 'Cashback' membership identifier?",
          answer:
            "Your email address or Facebook/Google+ login is your 'Cashback' membership identifier. Please make sure that you are always logged in before making any purchases via BonusApp.in to get cashback."
        },
        {
          question: "How can I join 'Cashback' program?",
          answer:
            "'Cashback' program is absolutely free, you can join by simply registering on our website or Mobile app using your email address or Facebook/Google+ login."
        },
        {
          question: "Are all users eligible for Cashback program?",
          answer:
            "Cashback program is currently applicable only for desktop, Android App & Mobile web users of BonusApp & Mysmartprice Deals."
        },
        {
          question: "How long is my 'Cashback' program membership valid?",
          answer: "'Cashback' membership is valid for lifetime of the program."
        },
        {
          question:
            "Do I need to be 'Cashback' program member to use your website/app?",
          answer:
            "You are free to search/browse on BonusApp.in and proceed to partner stores for completing the purchase without being a 'Cashback' program member (as a guest user). However, in order to get cashback and other program benefits and offers, you must register as a 'Cashback' program member. Make sure you login before making any purchases."
        },
        {
          question:
            "Are there different membership levels in 'Cashback' Program?",
          answer:
            "No, there are no membership levels in 'Cashback' program. All users will get flat cashback on all categories from 100+ stores."
        },
        {
          question: "How much cashback do I earn from each purchase?",
          answer:
            "Cashback for each purchase depends on the store & category you are purchasing. You can check the exact cashback from store pages on BonusApp.in"
        },
        {
          question: "How do I ensure that I receive cashback for my purchase?",
          answer:
            "Follow below steps to get Cashback:\n1. Sign up or login on BonusApp.in\n2. Visit partner store via BonusApp.in & complete your purchase\n3. Wait for a maximum of 3-5 days to get Cashback in your account\nPlease note, you have to repeat the above steps every time before making purchase. Also, do not open any other website during the purchase."
        },
        {
          question:
            "I need to return an item I purchased - will I lose my cashback from this purchase?",
          answer:
            "Yes - Cashback earned for a purchase that is the subject of a return or cancellation will be deducted from your account in the amount equal to the cashback earned during the original transaction."
        },
        {
          question: "Do cashback earned expire?",
          answer:
            "- Cashback which is credited for purchases (Transactional Cashback) shall expire in 24 months from the day it is confirmed.\n- Cashback credited by BonusApp as Sign up bonus (Promotional Cashback) shall expire in 90 days if the user doesn't make any purchase."
        },
        {
          question: "How do I report missing cashback?",
          answer:
            "Fill the form at Claims/Issues tab on “My Cashback” page. Before reporting, just make sure that it has been 5 days since you made your purchase as cashback will be credited only after 5 days of purchase. <br /><br />Kindly raise your claim for missing cashback before 7th of the next month. No claims will be considered after 7th.<br /></br><a href='/me/claims'>Click here</a> to raise a claim now."
        },
        {
          question:
            "I have not received my Paytm cash/Amazon gift card, what should I do now?",
          answer:
            "If you have not received your Paytm cash in 2 days after your redemption date or If you have not received your Amazon gift card in 15 days after your redemption date, please raise a claim accordingly from “Claim/Issues” tab of “My Cashback” page. Click here to raise a claim now."
        },
        {
          question:
            "I have not received my cashback in my bank account, what should I do now?",
          answer:
            "Don't worry. Please mail us the 'redemption id' & your registered email to hi@bonusapp.in. We shall verify & credit the amount to your account as soon as possible."
        },
        {
          question:
            "How long does it take to see the cashback for a purchase in my account?",
          answer:
            "Cashback will be credited within 5 days after you make your purchase. If your cashback is not credited even after 5 days of purchase, please mail your invoice to hi@bonusapp.in and fill the form at Claims/Issues tab in 'My Cashback' page."
        },
        {
          question:
            "How can I find out how much cashback will I get for for purchasing a product?",
          answer:
            "The cashback that can be earned for a product is displayed on the store pages of BonusApp.in. Please note that the cashback displayed are indicative and the final cashback that you will receive could be different based on the final transaction details."
        },
        {
          question: "Why do I have negative Cashback?",
          answer:
            "If your purchases get rejected by the store due to reasons such as returns/cancellations, non-payment etc. post confirmation date of your purchase then the cashback credited for such purchases will be deducted. In case you have utilized your cashback for redemption before deduction, then you will have negative cashback. However as and when you accumulate more csahback in future, your cashback will become positive."
        },
        {
          question:
            "What is the difference between Confirmed, Pending, Declined and Expired Cashback?",
          answer:
            "Confirmed: Once the purchase has been confirmed by the store, Cashback becomes Available for redemption. Cashback is generally confirmed within 4-12 weeks after the purchase. Pending: Once the purchase has been reported to us by the store, Cashback will be credited to your account but won’t be available for redemption until return/cancel confirmation from store.\nDeclined: In case of cancellation/ return, Cashback will be deducted from your account in the amount equal to the cashback earned during the original transaction.\nExpired: Cashback credited for purchases will expire in 24 months from the day they are confirmed. Cashback credited by BonusApp.in as sign up bonus (promotional cashback) shall expire in 90 days if the user doesn't make any purchase."
        },
        {
          question: "How do I view my confirmed cashback?",
          answer:
            'To view your confirmed cashback, sign into your account on BonusApp.in and navigate to "My Cashback" page via the drop down located on the upper right corner. Your account dashboard will highlight your Confirmed Cashback along with your Total Cashback.'
        },
        {
          question: "Can I re-instate the expired Cashback?",
          answer: "No, we cannot re-instate your expired Cashback."
        },
        {
          question: "How do I redeem my Cashback?",
          answer:
            "Log on to BonusApp.in, and go to the 'My Cashback' page. Under the 'Redeem Now' tab, you will see the options to redeem your cashback. You can either transfer the Cashback to your bank account or select any Paytm/Amazon gift card. Please note that only Confirmed Cashback can be redeemed. Click here tab for details."
        },
        {
          question: "When can I redeem my cashback?",
          answer:
            "For Bank Transfer: You can transfer your cashback to your bank account once you have a minimum of Rs 200 confirmed cashback. For Paytm/Amazon gift cards: You can redeem for a minimum of Rs 200 Paytm cash or for a minimum of Rs 250 Amazon gift cards. Check 'Redeem Now' tab for details."
        },
        {
          question: "What can I get with cashback I earn?",
          answer:
            "You can transfer the Cashback to your Bank account or You can redeem the cashback for Paytm cash or Amazon gift vouchers. Check 'Redeem Now' tab on 'My Cashback' page for details."
        },
        {
          question:
            "Can I get my Amazon gift cards on different email than the registered email?",
          answer:
            "No, Amazon gift cards will be sent to your registered email only."
        },
        {
          question:
            "Can I get my cashback as Paytm cash to a different mobile number than the already linked mobile number?",
          answer:
            "No, Paytm cash will be credited to the mobile number already linked to your account."
        },
        {
          question: "Can I cancel my redemption request?",
          answer:
            "No. You cannot cancel your redemption request once it is placed."
        },
        {
          question:
            "Can I transfer my cashback to any other 'Cashback' program member?",
          answer: "No. Cashback is non-transferable."
        },
        {
          question: "I have forgotten the login password. What should I do?",
          answer:
            "On the login pop-up, click ‘Forgot Password’ link and submit with your registered email. You will receive a link to rest your password on the registered email."
        },
        {
          question: "How do I change my registered email?",
          answer: "No, you cannot change your registered email."
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
    .prfl-sctn{
        background-color: #fff;
    }
    .acrdn{
        padding: 0 10px;
    }
</style>
