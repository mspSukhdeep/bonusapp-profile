<template>
    <div>
        <div class="rdm-wdgt__inr">
            <div class="rdm-wdgt__scss">
                <div class="rdm-wdgt__err-img-wrpr">
                    <img class="rdm-wdgt__err-img" src="https://assets.mspcdn.net/f_auto/bonus_in/icon/alert.png" />
                </div>
                <div class="rdm-wdgt__scss-msg">
                    Uh-Oh! There was a problem
                </div>
                <div class="rdm-wdgt__flr-item">
                    {{message}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "RedemptionSuccessMessage",
  props: ['message']
};
</script>
<style lang="less">
.rdm-wdgt__flr-item{
    margin-top: 10px;
    line-height: 1.5;
}
</style>
