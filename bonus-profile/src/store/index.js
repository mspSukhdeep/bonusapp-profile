import Vue from 'vue';
import Veux from 'vuex';
import Axios from 'axios';
import UTILS from '../utils';

import router from '../router'

Vue.use(Veux);

const API = Axios.create({
    withCredentials: true
});

function ResourceURL(resource = '', page = 1) {
    return `https://www.bonusapp.com/me/page_info.php?function=${resource}&format=2&page=${page}`;
}

export default new Veux.Store({
    state: {
        app: {
            window: {
                width: 1280,
                height: 600
            }
        },
        passbook: [],
        history: [],
        profile: {
            verified_cashback: UTILS.number.toInt(UTILS.cookie.get("msp_verified_cb")),
            pending_cashback: UTILS.number.toInt(UTILS.cookie.get("msp_pending_cb")),
            image: "https://assets.mspcdn.net/f_auto/bonus_in/icon/user.png",
            isLocal: true
        },
        refer: {
            link: "",
            invite_history: [],
            display_link: "bonusapp.in/r/XXXXXXX"
        },
        claimHistory: []
    },
    mutations: {
        updateProfileData(state, payload) {
            state.profile = {
                email: payload.email,
                name: payload.name,
                image: payload.picture
            }
            router.push('/passbook');
        },
        updatePassbook(state, payload) {
            state.passbook = payload?payload.map(item=>{
                if(item.info.store){
                    item.label = item.info.store;
                    delete item.info.store;
                }
                else if(item.info.redeem){
                    item.label = item.info.redeem;
                    item.info.redemption_amount = '₹'+Math.abs(item.cashback);
                    delete item.info.redeem;
                }
                if(item.info.product_price){
                    item.info.product_price = '₹'+item.info.product_price;
                }
                item.status==="valid" && (item.status = "pending");
                return item;
            }):[];
        },
        updateProfile(state, payload){
            if(!payload.data || !payload.data.email){
                if(payload.disableLoginCheck){
                    return;
                }
                let params = "?utm_source=bonusapp&desturl=" + encodeURIComponent(window.location.href);
                UTILS.login("login", params);
                return;
            }
            // delete payload.mobile;
            UTILS.setProfileCookies(payload.data);
            state.profile = payload.data;
            state.profile.name = state.profile.name || UTILS.cookie.get("msp_login_name");
        },
        updateReferInfo(state, payload){
            state.refer = payload;
        },
        updateClaimHistory(state, payload){
            state.claimHistory = payload.claims_history;
        },
        updateWindowSize(state, payload){
            state.app.window = payload;
        },
        updateUserHistory(state, payload){
            state.history = payload.click_history;
        },
        updateAppState(state, payload){
            state.app.device = payload.device;
            state.app.type = payload.type;
        }
    },
    actions: {
        fetchPassbook(context, payload = {}) {
            return new Promise((resolve, reject) => {
                API.get(ResourceURL('passbook'), payload.page).then(response => {
                    if(response.status===200){
                        context.commit('updatePassbook', response.data.passbook);
                        resolve();
                    }
                    else{
                        //Log some errors here
                        reject();
                    }
                });
            });
        },
        fetchProfile(context, payload = {}) {
            return new Promise((resolve, reject) => {
                API.get(ResourceURL('profile'), payload.page).then(response => {
                    if(response.status===200){
                        let params = {
                            data: response.data,
                            disableLoginCheck: payload.disableLoginCheck
                        }
                        context.commit('updateProfile', params);
                        resolve();
                    }
                    else{
                        //Log some errors here
                        reject();
                    }
                });
            });
        },
        fetchReferInfo(context, payload={}){
            return new Promise((resolve, reject) => {
                API.get(ResourceURL('referral'), payload.page).then(response => {
                    if(response.status === 200){
                        context.commit('updateReferInfo', response.data);
                    }
                    else{
                        reject();
                    }
                })
            });
        },
        fetchUserHistory(context, payload={}){
            return new Promise((resolve, reject) => {
                API.get(ResourceURL('activity_details'), payload.page).then(response => {
                    if(response.status === 200){
                        context.commit('updateUserHistory', response.data);
                    }
                    else{
                        reject();
                    }
                })
            });
        },
        fetchClaimHistory(context, payload={}){
            return new Promise((resolve, reject) => {
                API.get(ResourceURL('claims_issues'), payload.page).then(response => {
                    if(response.status === 200){
                        context.commit('updateClaimHistory', response.data);
                    }
                    else{
                        reject();
                    }
                })
            });
        },
        saveOAuthToken(context, payload = {}) {
            return new Promise((resolve, reject) => {
              let _URL = "https://dealsfinder.in/track/api/token.php?code="+payload.code;
              Axios.get(_URL).then(
                response => {
                  if (response.status === 200) {
                    console.log(response.data);
                    if(response.data){
                      context.commit("updateProfileData", response.data);
                    }
                    resolve();
                  } else {
                    //Log some errors here
                    reject();
                  }
                }
              );
            });
          }
    },
});
