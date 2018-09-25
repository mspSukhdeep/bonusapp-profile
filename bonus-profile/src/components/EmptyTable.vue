<template>
    <div class="prfl-tbl__body" v-if="type==='expired'">
        <div class="empty-wrpr">
            <div class="empty-anim empty-anim--exprd">
                <img class="empty-anim__1" src="https://assets.mspcdn.net/f_auto/bonus_in/icon/bin.png" />
                <div class="bee">
                </div>
            </div>
            <div class="empty-ttl">
                No entries yet
            </div>
            <div class="empty-txt">
                You haven't let any expire yet. Kudos!
            </div>
        </div>
    </div>
    <div class="prfl-tbl__body" v-else-if="type==='redeemed'">
        <div class="empty-wrpr">
            <div class="empty-anim empty-anim--rdm">
                <img class="empty-anim__1" src="https://assets.mspcdn.net/f_auto/bonus_in/icon/belt.png" />
                <img class="empty-anim__2" src="https://assets.mspcdn.net/f_auto/bonus_in/icon/gift-white.png" />
                <div class="empty-anim__3"></div>
                <div class="empty-anim__4"></div>
            </div>
            <div class="empty-ttl">
                No redemptions yet
            </div>
            <div class="empty-txt">
                When you redeem gifts using Cashback, your redemptions will show up here. 
                <span v-if="hasEnoughCashback">
                    You have saved up enough to <router-link to="/redeem">do your first redemption.</router-link>
                </span>
            </div>
        </div>
    </div>
    <div class="prfl-tbl__body" v-else>
        <div class="empty-wrpr">
            <div class="empty-anim empty-anim--psbk">
                <img class="empty-anim__1" src="https://assets.mspcdn.net/f_auto/bonus_in/icon/book.png" />
                <img class="empty-anim__2" src="https://assets.mspcdn.net/f_auto/bonus_in/icon/calculator.png" />
                <div class="empty-anim__3"></div>
            </div>
            <div class="empty-ttl">
                No entries yet
            </div>
            <div class="empty-txt">
                When your purchases are confirmed by the stores, the tracked purchases will show up here. <a href="/">Go ahead & shop</a> on your favourite stores.
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    name: 'EmptyTable',
    props: ['type'],
    calculated: {
        hasEnoughCashback: function(){
            return this.$store.state.profile.verified_cashback>20;
        }
    }
}
</script>
<style lang="less">

</style>