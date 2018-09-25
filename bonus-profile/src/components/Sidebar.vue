<template>
    <div class="prfl__sdbr">
    <div class="list">
        <router-link :to="isMobile?(item.mobileLink?item.mobileLink:item.link):item.link" v-for="(item, index) in nav.main" :key="index">
            <button class="list-item ripple ripple--l" :class="{'list-item--pdng': item.isSmall}">
                <div class="list-item__inr">
                    <img class="list-item__img" :src="item.icon">
                    <div class="list-item__info">
                        <div class="list-item__ttl">{{item.label}}</div>
                        <div class="list-item__txt">{{item.description}}</div>
                    </div>
                </div>
            </button>
        </router-link>
    </div>
    
    <div class="list list--s">
        <router-link  v-for="(item, index) in nav.secondary" :key="index" :to="item.link">
            <button class="list-item ripple ripple--l" :class="{'list-item--lgt': item.link.indexOf('logout')>-1}">
                <img class="list-item__img list-item__img--2" :src="item.icon">
                <div class="list-item__info">
                    <div class="list-item__txt">
                        {{item.label}}
                    </div>
                </div>
            </button>
        </router-link>
        <a>
        <button class="list-item ripple ripple--l list-item--lgt" @click="logout" v-if="showLogout">
                <div class="list-item__info">
                    <div class="list-item__txt">
                        Logout
                    </div>
                </div>
        </button>
        </a>
    </div>
</div>
</template>
<script>
import UTILS from '../utils';

export default {
  name: 'Sidebar',
  computed: {
      isMobile: function(){
            return this.$store.state.app.window.width < 720;
      },
      showLogout: function(){
          return this.$store.state.app.type!="MSP"
      }
  },
  data: function(){
      return{
          nav: {
            main: [
                {
                    link: "/",
                    mobileLink: "/passbook",
                    icon: "https://assets.mspcdn.net/f_auto/bonus_in/icon/rupee_1.png",
                    label: "Cashback Passbook",
                    description: "Earned & redeemed cashback"
                },
                {
                    link: "/activity",
                    icon: "https://assets.mspcdn.net/f_auto/bonus_in/icon/foot.png",
                    label: "Store Visits",
                    description: "History of your store visits",
                    isSmall: true
                }
            ],
            secondary: [
                {
                    link: '/edit',
                    label: 'Edit Profile',
                    icon: 'https://assets.mspcdn.net/f_auto/bonus_in/icon/profile.png'
                },
                {
                    link: '/refer',
                    label: 'Refer your friends',
                    icon: 'https://assets.mspcdn.net/f_auto/bonus_in/icon/refer.png'
                },
                {
                    link: '/claims',
                    label: 'Claims & Issues',
                    icon: 'https://assets.mspcdn.net/f_auto/bonus_in/icon/flag.png'
                },
                {
                    link: '/how-it-works',
                    label: 'How it Works',
                    icon: 'https://assets.mspcdn.net/f_auto/bonus_in/icon/info.png'
                },
                {
                    link: '/faq',
                    label: 'FAQs',
                    icon: 'https://assets.mspcdn.net/f_auto/bonus_in/icon/help.png'
                },
                {
                    link: '/contact',
                    label: 'Contact Us',
                    icon: 'https://assets.mspcdn.net/f_auto/bonus_in/icon/email.png'
                }
            ]
        }
      }
  },
  methods: {
      logout: function() {
          UTILS.logout();
      }
  }
};
</script>
<style lang="less">
@import "../style/bonus_profile.less";

</style>
