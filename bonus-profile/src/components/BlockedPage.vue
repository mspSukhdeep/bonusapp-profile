<template>
    <div class="blckd">
        <div class="blckd__ttl">Your account has been blocked!</div>
        <div class="blckd__qna">
            <div class="blckd__qstn">Why are you seeing this? </div>
            <div class="blckd__answr">We have identified malicious activity from your account. There could be many reasons for blocking Eg: you have been purchasing a lot of items &amp; canceling your orders; you have created multiple accounts etc </div>
        </div>
        <div class="blckd__qna">
            <div class="blckd__qstn">What do you need to do? </div>
            <div class="blckd__answr">You can verify that you own this account &amp; reactivate your account. Please mail your email &amp; contact number to <a href="mailto:hi@bonusapp.com">hi@bonusapp.com</a> to initiate the unlocking process.</div>
        </div>
    </div>
</template>

<style lang="less">
.blckd {
  padding: 60px 20px;
  top: 0;
  left: 0;
  z-index: 0;
  background: #fff;
  box-sizing: border-box;
}

.blckd__ttl {
  font-size: 24px;
  text-align: center;
  font-weight: 500;
  color: #c00;
  background: url("https://assets.mspcdn.net/image/upload/f_auto/bonus_in/icon/blocked.png")
    no-repeat top center/96px;
  padding-top: 115px;
  margin-bottom: 60px;
}

.blckd__qna {
  margin-top: 30px;
}

.blckd__qna::first-child {
  margin-top: 60px;
}

.blckd__qstn {
  font-size: 16px;
  font-weight: 500;
  color: #111;
}

.blckd__answr {
  margin-top: 15px;
  font-size: 16px;
  color: #444;
}
</style>

<script>
export default {
  name: "BlockedPage"
};
</script>
