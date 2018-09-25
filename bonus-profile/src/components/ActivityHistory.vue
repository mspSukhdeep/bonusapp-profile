<template>
<div class="prfl-sctn">
    <div class="prfl-sctn__ttl" v-display="'desktop'">Store Visits</div>
     <div class="prfl-tbl">
        <div class="prfl-tbl__hd clearfix">
            <div class="prfl-tbl__date prfl-tbl__date--l">Visit Date</div>
            <div class="prfl-tbl__entry prfl-tbl__entry--l">Store</div>
            <div class="prfl-tbl__clicks">Clicks</div>
        </div>
        <div class="prfl-tbl__body">
                <div class="prfl-tbl__row clearfix" v-for="(item, index) in filteredHistory" :key="index">
                  <div class="prfl-tbl__date prfl-tbl__date--l">{{item.date}}</div>
                  <div class="prfl-tbl__entry prfl-tbl__entry--l"> {{item.info.store}} </div>
                  <div class="prfl-tbl__clicks">{{countWord(item.click_count)}}</div>
            </div>
        </div>
     </div>
</div>
</template>
<script>
export default {
  name: "ActivityHistory",
  computed: {
    filteredHistory: function() {
      return this.$store.state.history;
    }
  },
  methods: {
    countWord(count) {
      let word = count > 1 ? "clicks " : "click";
      return count + " " + word;
    }
  },
  created() {
    this.$store.dispatch("fetchUserHistory");
  }
};
</script>
<style lang="less">
@import "../style/bonus_profile.less";
.prfl-tbl {
  @media screen and (max-width: @breakpoint) {
    &__row {
      min-width: auto;
    }

    &__date {
      font-size: @font-size-xs;
      margin: 0;
    }
    &__entry {
      font-size: @font-size-s;
    }
    &__clicks {
      font-size: @font-size-xs;
    }
  }
}
</style>
