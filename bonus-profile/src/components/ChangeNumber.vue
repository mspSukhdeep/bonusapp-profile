<template>
<div class="body-wrpr">
  <div class="logo__wrpr">
    <img src="https://assets.mspcdn.net/f_auto/bonus_in/logo/bonus_colour.png" class="logo" />
  </div>
<div class="prfl-sctn">
    <div class="prfl-edit__ttl" v-display="'desktop'" v-if="view!='verified'">
            Change Mobile Number
    </div>
    <div class="prfl-edit">
        <div class="prfl-edit__inr" v-if="view!='verified'">
            <div class="prfl-edit__form">
                <material-input 
                    v-model="profile.email"
                    placeholder="Email"
                ></material-input>
                <material-input 
                    v-model="mobile"
                    placeholder="New Mobile Number"
                ></material-input>
                <material-input 
                    v-model="otp"
                    placeholder="OTP"
                    v-if="otpSent" 
                ></material-input>
                <div class="prfl-edit__btn-wrpr">
                    <button class="btn btn--l" :class="{'btn--wait': isLoading}" @click="proceedNext">{{buttonLabel}}</button>
                </div>
            </div>
        </div>
        <div v-else>
            <success-message title="Your mobile number is updated.">
            </success-message>
        </div>
    </div>
</div>
</div>
</template>
<script>
import Axios from "axios";

import SuccessMessage from "./SuccessMessage";
import MaterialInput from "./MaterialInput";

const API = Axios.create({
    withCredentials: true
  }),
  AUTH_API = "https://www.bonusapp.com/users/mobile_number_auth.php",
  ERROR_CODE = {
    number_already_used: "Number is already in use"
  };

function getErrorCode(code) {
  return ERROR_CODE[code] || code;
}

export default {
  name: "ChangeNumber",
  computed: {
    isLoading: function() {
      return this.view === "sending_otp" || this.view === "submitting_otp";
    },
    buttonLabel: function() {
      let label = "Confirm Number";

      if (this.view === "sending_otp") {
        label = "Confirming...";
      } else if (this.view === "otp_sent") {
        label = "Validate OTP";
      } else if (this.view === "submitting_otp") {
        label = "Validating...";
      } else if (this.view === "verified") {
        label = "Go to My Profile";
      }

      return label;
    },
    profile: function() {
      return {
        email: {
          data: this.$route.query.email,
          disabled: true
        }
      };
    }
  },
  data: function() {
    return {
      mobile: {
        data: "",
        error: "",
        disabled: false
      },
      otp: {
        data: "",
        error: ""
      },
      view: "",
      otpSent: false
    };
  },
  methods: {
    proceedNext: function() {
      switch (this.view) {
        case "":
          this.sendOTP();
          break;
        case "otp_sent":
          this.verifyOTP();
          break;
      }
    },
    sendOTP: function() {
      let params = new URLSearchParams();
      params.append("process", "update_mobile");
      params.append("mobile_number", this.mobile.data);
      params.append("email", this.profile.email.data);
      params.append("key", this.$route.query.key);
      this.view = "sending_otp";

      API.post(AUTH_API, params)
        .then(response => {
          if (response.data.otp_sent == true) {
            this.view = "otp_sent";
            this.otpSent = true;
            this.mobile.disabled = true;
          } else {
            this.mobile.error = getErrorCode(response.data.error);
            this.view = "";
          }
        })
        .catch(error => {
          // Gotta Catch 'em all
        })
        .then(() => {});
    },
    verifyOTP() {
      let params = new URLSearchParams();

      params.append("process", "verify_mobile_otp");
      params.append("otp", this.otp.data);
      params.append("email", this.profile.email.data);

      this.view = "submitting_otp";

      API.post(AUTH_API, params)
        .then(response => {
          if (!response.data.error) {
            this.view = "verified";
          } else {
            this.otp.error = "OTP Verification failed!";
            this.view = "otp_sent";
          }
        })
        .catch(error => {
          console.log("Some Error: " + error);
        });
    }
  },
  components: {
    MaterialInput,
    SuccessMessage
  }
};
</script>
<style lang="less">
@import "../style/bonus_profile.less";
body {
  color: @bg-color;
}
.body{
  &-wrpr{
    margin: 50px 0;
  }
}
.logo{
  width: 150px;
  &__wrpr{
    text-align: center;
    margin-bottom:10px;
  }
}
.prfl {
  &-sctn {
    background-color: @color-white;
    box-shadow: @box-shadow-2;
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
  }
  &-edit{
    &.prfl-edit{
      background-color: @color-white;
      padding: 0;
    }
    &__ttl{
      color: @fg-color;
      margin: 0 0 20px 0;
    }
    &__inr{
      width: 100%;
    }
  }
}



@media screen and (max-width: @breakpoint) {
  .prfl-edit__form{
    padding: 15px;
  }
}
</style>