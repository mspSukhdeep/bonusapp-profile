<template>
    
<div class="prfl-sctn">
    <div class="clearfix">
        <div class="prfl-sctn__ttl" v-display="'desktop'">Cashback Passbook</div>
        <div v-display="'mobile'" class="prfl-cb__wdgt">
            <cashback-widget>
            </cashback-widget>
        </div>
        <div class="prfl__fltr-wrpr">
            <div class="prfl__fltr" :class="{'prfl__fltr--actv': filter.value === selectedFilter}" v-for="(filter, index) in filters" :key="index" @click="changeFilter(filter)">
                {{filter.label}}
            </div>
        </div>
    </div>
    <div class="prfl-tbl">
        <div class="prfl-tbl__hd clearfix" v-display="'desktop'">
            <div class="prfl-tbl__date">Transaction Date</div>
            <div class="prfl-tbl__entry">Entry</div>
            <div class="prfl-tbl__cb">Cashback</div>
        </div>
        <empty-table v-if="filteredPassbook.length===0" :type="selectedFilter">
        </empty-table>
        <div class="prfl-tbl__body" v-else>
           <passbook-entry 
                :entry="entry" 
                v-for="(entry, index) in filteredPassbook" 
                :key="index"
           >
           </passbook-entry>
            
            <!--
            <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                </div>
                <div class="prfl-tbl__cb"><span class="prfl-tbl__cb--pndng">₹43</span></div>
            </div>
            <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">21 Aug 2018</div>
                <div class="prfl-tbl__entry"> Paytm Cash
                    <div class="prfl-tbl__dscrptn">Amount: <span class="txt--bold">₹250</span></div>
                    <div class="prfl-tbl__sts prfl-tbl__sts--pndng">Processing</div>
                </div>
                <div class="prfl-tbl__cb txt--red">-₹250</div>
            </div>
            <div class="prfl-tbl__row prfl-tbl__row--exprd clearfix">
                <div class="prfl-tbl__date">16 May 2018</div>
                <div class="prfl-tbl__entry"> Cashback Expired
                </div>
                <div class="prfl-tbl__cb txt--red"><span class="txt--red">-₹500</span></div>
            </div>
             <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                    <div class="prfl-tbl__dscrptn">Expiry Date: <span class="txt--bold">21 Dec 2019</span></div>
                </div>
                <div class="prfl-tbl__cb txt--grn">₹127</div>
            </div>
            <div class="prfl-tbl__row prfl-tbl__row--cncld clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                    <div class="prfl-tbl__sts prfl-tbl__sts--fld">Order Cancelled</div>
                </div>
                <div class="prfl-tbl__cb txt--strk">₹127</div>
            </div>
             <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                    <div class="prfl-tbl__dscrptn">Expiry Date: <span class="txt--bold">21 Dec 2019</span></div>
                </div>
                <div class="prfl-tbl__cb txt--grn">₹127</div>
            </div>
            <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">21 Aug 2018</div>
                <div class="prfl-tbl__entry"> Paytm Cash
                    <div class="prfl-tbl__dscrptn">Amount: <span class="txt--bold">₹250</span></div>
                    <div class="prfl-tbl__sts prfl-tbl__sts--fld">Redemption Failed</div>
                </div>
                <div class="prfl-tbl__cb txt--strk">-₹250</div>
            </div>
            -->
        </div>
    </div>
</div>    
</template>
<script>
import EmptyTable from "./EmptyTable";
import PassbookEntry from "./PassbookEntry";
import CashbackWidget from './CashbackWidget';

export default {
  name: "Passbook",
  components: {
    EmptyTable,
    PassbookEntry,
    CashbackWidget
  },
  data: function() {
    return {
      filters: [
        {
          label: "ALL",
          value: ""
        },
        {
          label: "CONFIRMED",
          value: "confirmed"
        },
        {
          label: "PENDING",
          value: "pending"
        },
        {
          label: "REDEEMED",
          value: "redeemed"
        },
        {
          label: "CANCELLED",
          value: "cancelled"
        },
        {
          label: "EXPIRED",
          value: "expired"
        }
      ],
      selectedFilter: ""
    };
  },
  methods: {
    changeFilter(filter) {
      this.selectedFilter = filter.value;
    }
  },
  computed: {
    filteredPassbook: function() {
      return this.$store.state.passbook.filter(entry => {
        return this.selectedFilter ? entry.type === this.selectedFilter : true;
      });
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchPassbook");
  }
};
</script>
<style lang="less">
    @import "../style/bonus_profile.less";

</style>
