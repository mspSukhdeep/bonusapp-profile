<template>
    <div>
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
                    {{text}}
                </div>
                <div class="rdm-wdgt__scss-ntfctn">
                    An email regarding your redemption has been sent to <span class="txt--bold">{{email}}</span>
                </div>
            </div>
        </div>
        <div class="rdm-wdgt__ftr">
            <router-link to="/" class="btn rdm-wdgt__btn">SHOW CASHBACK PASSBOOK</router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: "RedemptionSuccessMessage",
  props: ['text', 'email']
};
</script>
