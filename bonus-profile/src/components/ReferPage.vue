<template>
    <div class="sctn rfr">
    <div class="rfr__ttl">Now help your friends<br />save upto 20% on their online shopping</div>
    <div class="rfr__ttl-sub">Invite your friends to install Bonusapp app</div>
    <div class="rfr__wrk" @click="showDetailInfo=!showDetailInfo">
        LEARN HOW REFERRAL WORKS
    </div>
    <ol class="rfr__wrk-info" v-if="showDetailInfo">
        <li class="rfr__wrk-item">Share your referral link via Whatsapp, Facebook or Message.</li>
        <li class="rfr__wrk-item">Your friend installs Bonusapp App using your referral link.</li>
        <li class="rfr__wrk-item">That's it. You have helped your friend save upto 20% on all his online purchases</li>
        <div class="rfr__wrk-cls" @click="showDetailInfo=false">
            &times;
        </div>
    </ol>
    <img class="rfr__img" src="https://assets.mspcdn.net/f_auto/bonus_in/page/friends.png" />
    <div class="rfr__lnk-hd">
        YOUR INVITE LINK
    </div>
    <div class="rfr__lnk clearfix" @click="copyLink">
        <div class="rfr__lnk-txt">
            {{refer.display_link}}
        </div>
        <div class="rfr__lnk-btn">
            {{textCopied?"COPIED":"COPY"}}
        </div>
    </div>
    <div class="rfr__optn-hd">
        OR INVITE USING
    </div>
    <div class="rfr__optn-wrpr">
        <img class="rfr__optn rfr__optn--fb" @click="facebookShare()" src="https://assets.mspcdn.net/f_auto/v2/bonus_in/page/fb.png" />
        <img class="rfr__optn rfr__optn--wapp" @click="whatsappShare()" src="https://assets.mspcdn.net/f_auto/v2/bonus_in/page/whatsapp.png" />
        <img class="rfr__optn rfr__optn--mail" @click="mailShare()" src="https://assets.mspcdn.net/f_auto/v2/bonus_in/page/mail.png" />
    </div>
    <div class="rfr__tbl">
        <div class="rfr__tbl-hd">
            INVITED FRIENDS
        </div>
        <div class="rfr__tbl-body">
            <div v-if="refer.invite_history.length>0" class="rfr__tbl-row clearfix" v-for="(user, index) in refer.invite_history" :key="index">
                <div class="rfr__tbl-usr">{{user.name}}</div>
                <div class="rfr__tbl-sts">{{user.status}}</div>
            </div>
            <div v-else class="rfr__tbl-row clearfix">
                Your friends are yet to install the Bonusapp App
            </div>
        </div>
    </div>
</div>
</template>
<script>
import UTILS from '../utils/';

export default {
    name: 'ReferPage',
    computed: {
        refer: function(){
            return this.$store.state.refer;
        }
    },
    beforeMount(){
      this.$store.dispatch('fetchReferInfo');
    },
    data: function(){
        return {
            renderTempInput: false,
            textCopied: false,
            showDetailInfo: false
        }
    },
    methods: {
        copyLink: function(){
            if(UTILS.copyText(this.refer.link, "REFER")){
                this.textCopied = true;
            }
        },
        composeMessage: function(link, source){
            link = link + '?utm_source=' + source;
            return 'Hi,\
\n\n\
I would like to invite you to Bonusapp which has helped me to save plenty while shopping online.\n\
You will get best price by comparing among 100+ stores and also additional cashback on every purchase.\
\n\n\
Join Bonusapp - ' + link + '\
';
        },
        facebookShare: function() {
            let link = encodeURIComponent(this.refer.link + '?utm_source=fb_msngr'),
                fbLink =  'https://www.facebook.com/dialog/send?app_id=253242341485828&link=' + link + '&redirect_uri=https://www.bonusapp.in/me/refer?utm_source=post_fb_msngr';

            window.open(fbLink, "_blank");
        },
        whatsappShare: function() {
            let link = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(this.composeMessage(this.refer.link, "whatsapp"));
            window.open(link, "_blank");
        },
        mailShare: function(){
            let subject = "Invitation to Join Bonusapp",
                body = this.composeMessage(this.refer.link, "mail"),
                cc = "refer@mysmartprice.com",
                link = 'https://mail.google.com/mail/?view=cm&fs=1&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body) + '&cc=' + encodeURIComponent(cc);
            
            window.open(link, "_blank");
        }

    }
}
</script>
<style lang="less">
@import "../style/bonus_profile.less";

.rfr{
    padding: 30px 0;
    text-align: center;
    width: 480px;
    margin: 0 auto;

    &__ttl{
        font-size: @font-size-4xl;
        line-height: 32px;
        font-weight: @bold;
        color: @fg-color-light;

        &-sub{
            color:@color-grey;
            margin-top: 10px;
            font-size: @font-size-xl;
            line-height: 23px;
        }
    }
    &__wrk{
        color: @color-blue;
        margin-top: 10px;
        cursor: pointer;
        font-size: @font-size-2xs;

        &:hover{
            text-decoration: underline;
        }
        &-cls{
            position: absolute;
            top: 10px;
            right: 10px;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: @font-size;
            color: @fg-color-light;
            cursor: pointer;
        }
        &-info{
            margin-top: 20px;
            position: relative;
            background-color: fade(@color-blue, 10%);
            border:1px solid fade(@color-blue, 20%);
            padding: 13px 15px;
            color: @fg-color-light;
            border-radius: 3px;
            width: 100%;
            text-align: left;
            counter-reset: info-item;
        }
        &-item{
            line-height: 19px;
            font-size: @font-size-xs;
            &:before{
                counter-increment: info-item;
                content: counter(info-item) ".";
                font-weight: @bold;
            }
            & + &{
                margin-top: 5px;
            }
        }
    }
    &__img{
        width: 160px;
        margin-top: 40px;
    }
    &__lnk{
            border: 1px solid @color-blue-light;
            border-radius: 3px;
            display: inline-block;
            margin-top: 13px;
            transition: .2s ease-in;
            overflow: hidden;
            background-color: @bg-color;
            cursor: text;

        &-txt{
            float: left;
            padding: 8px 13px 8px 10px;
            line-height: 23px;
            font-size: @font-size-xl;
            min-width: 200px;
            text-align: left;
        }
        &-btn{
            float: left;
            width: 92px;
            color: @color-white;
            font-size: @font-size;
            line-height: 18px;
            background-color: @color-blue-light;
            padding: 11px 0;
            transition: .2s ease-in;
            .user-select();
        }
        &-hd{
            margin-top: 40px;
            color: @color-grey;
            font-size: @font-size-xs;
        }
        &:hover{
            cursor: pointer;
            border-color: darken(@color-blue-light, 5%);

            .rfr__lnk-btn{
                background-color: darken(@color-blue-light, 5%);
            }
        }
    }
    &__optn{
        width: 48px;
        transition: .2s ease-in;
        margin: 0 20px;
        cursor: pointer;

        &:hover{
            transform: scale(1.1);
        }
        &-hd{
            margin-top: 28px;
            color: @color-grey;
        }
        &-wrpr{
            margin-top: 20px;
        }
    }
    &__tbl{
        margin-top: 60px;

        &-hd{
            color: @fg-color;
            font-size: @font-size-xl;
            line-height: 21px;
            font-weight: @bold;
        }
        &-body{
            margin-top: 28px;
            border-top: 1px solid @border-color;
        }
        &-row{
            border-bottom: 1px solid @border-color;
            padding: 15px 10px;
            color: @color-grey-2;
            font-size: @font-size-xs;
        }
        &-usr{
            float: left;
            color: @fg-color-light;
            font-size: @font-size;
            line-height: 18px;
            
        }
        &-sts{
            float: right;
            text-align: right;
            color: @color-green;
            font-size: @font-size;
            line-height: 18px;
            font-weight: @bold;

        }

    }
}

@media screen and (max-width: @breakpoint) {
    .rfr{
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        background-color: @color-white;

        &__ttl{
            font-size: @font-size-l;
            line-height: 1.5;
            &-sub{
                font-size: @font-size-l;
            }
        }
        &__wrk{
            &-info{
                box-sizing: border-box;
            }
        }
        &__optn{
            &-hd{
                font-size: @font-size-xs;
            }
        }
        &__tbl{
            &-hd{
                font-size: @font-size-l;
            }
            &-usr{
                font-size: @font-size-xs;
            }
            &-sts{
                font-size: @font-size-xs;
            }
            &-body{
                margin-top: 20px;
            }
        }
    }
}
</style>
