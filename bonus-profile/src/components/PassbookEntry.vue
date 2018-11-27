<template>
    <div class="prfl-tbl__row clearfix"
            :class="{'prfl-tbl__row--exprd': entry.type==='expired', 'prfl-tbl__row--fld': entry.status==='failure', 'prfl-tbl__row--cncld': entry.type==='cancelled'}"
            @click="expanded=!expanded"
            >
                <div v-if="isDesktop">
                    <div class="prfl-tbl__date" :class="{'prfl-tbl__date--l':type==='claim'}">
                        {{ entry.date }}
                    </div>
                    <div :class="{'prfl-tbl__issue': type==='claim', 'prfl-tbl__entry': type!=='claim'}">
                        {{ title }}
                        <div class="prfl-tbl__dscrptn" 
                            v-for="(value, key) in entry.info" 
                            :key="key" v-if="value">
                                {{ formatKey(key) }}: <span class="txt--bold">{{value}}</span>
                        </div>
                        <div class="prfl-tbl__sts" 
                            v-if="entry.type==='redeemed'" 
                            :class="{'prfl-tbl__sts--fld':entry.status==='failure', 'prfl-tbl__sts--clsd':entry.status==='success', 'prfl-tbl__sts--pndng':entry.status==='pending'}">
                                {{entry.status}}
                            </div>
                            <div class="prfl-tbl__sts" 
                                v-if="type==='claim'"
                                :class="{'prfl-tbl__sts--clsd':entry.status==='Closed', 'prfl-tbl__sts--pndng': entry.status==='Pending'}">
                                    {{entry.status}}
                            </div>
                    </div>
                    <div class="prfl-tbl__cb" 
                        v-if="entry.cashback"
                        :class="{ 'txt--grn': entry.cashback>0, 'txt--red': entry.cashback<0, 'txt--strk txt--gry-2': (entry.status==='failure' || entry.type==='cancelled') }">
                            <span v-if="entry.type==='pending'" class="prfl-tbl__cb--pndng">₹{{Math.abs(entry.cashback)}}</span>
                            <div v-else>
                                <span v-if="entry.type!='cancelled'" class="txt--bold">{{getSign(entry.cashback)}}</span> 
                                ₹{{Math.abs(entry.cashback)}}
                            </div>
                    </div>
                    <div class="prfl-tbl__lng-dsc"
                        v-if="type==='claim'"
                        >
                            {{entry.description}}
                    </div>
                </div>
                <div v-else>
                    <div class="prfl-tbl__top clearfix">
                        <div class="prfl-tbl__ttl">
                            {{ title }}
                        </div>
                        <div class="prfl-tbl__cb"
                                v-if="entry.cashback"
                                :class="{ 'txt--grn': entry.cashback>0, 'txt--red': entry.cashback<0, 'txt--strk txt--gry-2': entry.status==='failure' }">
                            <span v-if="entry.type==='pending'" class="prfl-tbl__cb--pndng">₹{{Math.abs(entry.cashback)}}</span>
                            <div v-else>
                                <span class="txt--bold">{{getSign(entry.cashback)}}</span> 
                                ₹{{Math.abs(entry.cashback)}}
                            </div>
                        </div>
                    </div>
                    <div class="prfl-tbl__dscrptn" 
                            v-for="(value, key) in entry.info" 
                            :key="key" v-if="value">
                                {{ formatKey(key) }}: <span class="txt--bold">{{value}}</span>
                    </div>
                    <div class="prfl-tbl__btm clearfix">
                        <div class="prfl-tbl__date">
                            {{ entry.date }}
                        </div>
                        <div class="prfl-tbl__sts" 
                                v-if="entry.type==='redeemed'"
                                :class="{'prfl-tbl__sts--fld':entry.status==='failure', 'prfl-tbl__sts--clsd':entry.status==='success', 'prfl-tbl__sts--pndng':entry.status==='pending'}">
                                    {{entry.status}}
                        </div>
                        <div class="prfl-tbl__sts" 
                            v-if="type==='claim'"
                            :class="{'prfl-tbl__sts--clsd':entry.status==='Closed', 'prfl-tbl__sts--pndng': entry.status==='Pending'}">
                                {{entry.status}}
                        </div>

                    </div>
                    <div class="prfl-tbl__dtls" v-if="entry.description && expanded">
                        {{ entry.description }}
                    </div>
                </div>
    </div>
</template>
<script>
export default {
  name: "PassbookEntry",
  props: ["entry", "type"],
  data: function(){
      return {
          expanded: false
      }
  },
  computed: {
    isDesktop: function() {
      return this.$store.state.app.window.width > 720;
    },
    title: function() {
      return this.entry.label || this.entry.title || "Purchase Tracked";
    }
  },
  methods: {
    formatKey(inputString) {
      return inputString.replace("_", " ");
    },
    getSign(value) {
      return value > 0 ? "+" : "-";
    }
  }
};
</script>
<style lang="less">
.prfl-tbl__dtls {
  color: #444;
  margin-top: 10px;
  border-top: 1px dashed #dfe1e8;
  padding-top: 10px;
}
</style>
