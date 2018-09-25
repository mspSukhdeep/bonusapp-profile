<template>
<div>
  <div v-if="!profile.mobile && !newVerified">
  <div class="rdm-wdgt__inr rdm-wdgt__inr--w" >
     <div class="rdm-wdgt__top">
          <div class="rdm-wdgt__ttl">Account Verification Required</div>
          <div class="rdm-wdgt__dscrptn">
              Enter a valid mobile number. We will verify it with an OTP.
          </div>
        </div>
        <div class="rdm-wdgt__mob">
          <input class="rdm-wdgt__mob-inpt" type="text" maxlength="10" placeholder="" v-model="newNumber.data">
          <div class="rdm-wdgt__err-box">
            {{newNumber.error}}
          </div>
        </div>
  </div>
   <div class="rdm-wdgt__ftr">
          <div class="btn rdm-wdgt__btn" :class="{'btn--ldng': waiting, 'btn--dsbld': incompleteMobileNumber}" @click="!incompleteMobileNumber && sendOTP(newNumber.data, 'verify')">Send OTP</div>
        </div>
  </div>
  <div v-else>
    <div class="rdm-wdgt__inr rdm-wdgt__inr--w">
        <div class="rdm-wdgt__top">
          <div class="rdm-wdgt__ttl">Enter One-Time Password (OTP)</div>
          <div class="rdm-wdgt__dscrptn">
              A six digit OTP has been sent to your registered mobile number:
              <span class="txt--bold txt--blk">{{profile.mobile}}</span>
          </div>
        </div>
        <div class="rdm-wdgt__otp">
            <div>
                <input class="rdm-wdgt__otp-inpt" v-model="OTP" type="text" maxlength="6" placeholder="••••••">
            </div>
            <span v-if="!message.text" class="text-link" @click="resendOTP">Resend OTP</span>
            <span class="rdm-wdgt__msg-box" :class="{'txt--red': message.type==='fail', 'txt--grn': message.type==='success', 'txt--orng': message.type==='processing'}">{{message.text}}</span>
        </div>
        
    </div>
    <div class="rdm-wdgt__ftr">
          <div class="btn rdm-wdgt__btn" :class="{'btn--ldng': waiting, 'btn--dsbld': incompleteOTP}" @click="submitOTP()">Submit OTP</div>
      </div>
  </div>
</div>
</template>
<script>
import Axios from "axios";

const AUTH_API = "https://www.bonusapp.com/users/mobile_number_auth.php",
  API = Axios.create({
    withCredentials: true
  });

export default {
  name: "OtpWidget",
  data: function() {
    return {
      OTP: "",
      waiting: false,
      message: {},
      newNumber: {
        data: "",
        error: ""
      },
      sendingOTP: false,
      newVerified: false
    };
  },
  created() {
    if (this.profile.mobile) {
      this.sendOTP();
    }
  },
  computed: {
    profile: function() {
      return {
        email: this.$store.state.profile.email,
        mobile: this.$store.state.profile.mobile
      };
    },
    incompleteOTP() {
      return String(this.OTP).length < 6;
    },
    incompleteMobileNumber() {
      return String(this.newNumber.data).length < 10;
    }
  },
  methods: {
    showMessage(text, type, autoHide = true) {
      this.message = {
        text,
        type
      };

      if (autoHide) {
        setTimeout(() => {
          this.message = {};
        }, 2000);
      }
    },
    sendOTP(mobileNumber = this.profile.mobile, type) {
      let params = new URLSearchParams();

      params.append("process", "send_otp");
      params.append("mobile_number", mobileNumber);
      params.append("email", this.profile.email);

      if (type) {
        this.waiting = true;
      }

      API.post(AUTH_API, params)
        .then(response => {
          if (response.data) {
            if (response.data.otp_sent) {
              if (type === "verify") {
                this.newVerified = true;
                this.showMessage("OTP Sent!", "success");
                this.$store.dispatch("fetchProfile");
              } else if (type === "resend") {
                this.showMessage("OTP Sent!", "success");
              }
            } else {
              this.showMessage("Could not send OTP", "fail");
            }
          }
          this.waiting = false;
        })
        .catch(error => {
          // Gotta Catch 'em all
          this.waiting = false;
        })
        .then(() => {});
    },
    resendOTP() {
      // Add some messaging and all
      this.showMessage("Sending OTP...", "processing", false);
      this.sendOTP(null, "resend");
    },
    submitOTP() {
      let params = new URLSearchParams();

      params.append("process", "verify_otp");
      params.append("otp", this.OTP);
      params.append("email", this.profile.email);

      this.waiting = true;

      API.post(AUTH_API, params)
        .then(response => {
          if (!response.data.error) {
            this.$emit("verified", true);
          } else {
            this.showMessage("OTP Verified Failed!", "fail");
            this.waiting = false;
          }
        })
        .catch(error => {
          console.log("Some Error: " + error);
        });
    }
  }
};
</script>
<style lang="less">
</style>
