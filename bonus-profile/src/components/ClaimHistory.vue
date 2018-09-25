<template>
    <div v-if="filteredHistory.length>0">
        <div class="prfl-sctn__ttl">Claims History</div>
        <div class="prfl-tbl">
    <div class="prfl-tbl__hd clearfix" v-display="'desktop'">
        <div class="prfl-tbl__date prfl-tbl__date--l">date </div>
        <div class="prfl-tbl__issue">claims/Issues </div>
        <div class="prfl-tbl__lng-dsc">description </div>
    </div>
    <div class="prfl-tbl__body">
        <passbook-entry 
                :entry="entry" 
                v-for="(entry, index) in filteredHistory" 
                :key="index"
                type="claim"
           >
        </passbook-entry>
        <div class="prfl-tbl__more-btn" v-if="!showAll">
            <div class="btn btn--inv btn--l" @click="showAll=true">Show Complete History</div>
        </div>
    </div>
</div>
    </div>
</template>
<script>
import PassbookEntry from "./PassbookEntry";

export default {
  name: "ClaimHistory",
  data: function() {
    return {
      showAll: false,
      maxLimit: 2
    };
  },
  computed: {
    filteredHistory: function() {
        let itemCount = 0;
        return this.$store.state.claimHistory.filter((item) => {
            if(this.showAll || (item.status === "Pending" && itemCount<2)){
                itemCount++;
                return true;
            }
            return false;
        });
    }
  },
  methods: {
    formatKey(inputString) {
      return inputString.replace("_", " ");
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchClaimHistory");
  },
  components: {
      PassbookEntry
  }
};
</script>
<style lang="less">
@import "../style/bonus_profile.less";

@media screen and (max-width: @breakpoint) {
    .prfl{
        &-sctn{
            &__ttl{
                padding: 10px;
                font-weight: @bold;
                font-size: @font-size-l;
            }
        }
    }
}
</style>
