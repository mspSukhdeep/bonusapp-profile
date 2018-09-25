<template>
    <div class="cntct-wrpr">
        <img src="https://assets.mspcdn.net/f_auto/bonus_in/icon/email.png" class="cntct__img" />
        <div class="cntct__txt">
            For any queries, please write an email to <a href="mailto:hi@bonusapp.in" class="link">hi@bonusapp.in</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ContactPage'
}
</script>

<style lang="less">
@import "../style/bonus_profile.less";

.cntct{
    &-wrpr{
        text-align: center;
        margin: 50px;
    }
    &__txt{
        font-size: @font-size-xl;
        margin-top: 20px;
    }
}
</style>
