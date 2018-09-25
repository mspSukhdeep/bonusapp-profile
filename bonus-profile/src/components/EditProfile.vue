<template>
<div class="prfl-sctn">
    <div class="prfl-edit__ttl" v-display="'desktop'">
            Edit Profile
        </div>
    <div class="prfl-edit">
        <div class="prfl-edit__inr">
<div class="prfl-edit__form">
    <div class="inpt-wrpr inpt-wrpr--dsbld"  v-if="profile.name">
        <label class="inpt-lbl inpt-lbl--vsbl">Full Name</label>
        <input class="inpt" placeholder="Full Name*" v-model="profile.name" readonly>
        <div class="inpt-err"></div>
    </div>
    <div class="inpt-wrpr inpt-wrpr--dsbld">
        <label class="inpt-lbl inpt-lbl--vsbl">Email</label>
        <input type="email" class="inpt" placeholder="Email*" v-model="profile.email" readonly>
        <div class="inpt-err"></div>
    </div>
    <div class="inpt-wrpr--msg">
        <div class="inpt-wrpr inpt-wrpr--mob">
            <label class="inpt-lbl inpt-lbl--vsbl">Mobile Number</label>
            <input type="text" class="inpt" placeholder="Mobile Number" v-model="profile.mobile">
            <span class="inpt-link" @click="changeMobile" v-if="!changeRequestStatus">Change Mobile</span>
            <div class="inpt-ldr" v-if="changeRequestStatus==='sent'"></div>
            <div class="inpt-err"></div>
        </div>
        <div class="inpt-status txt--grn" v-if="changeRequestStatus==='received'">
                A confirmation email has been sent to your registered email
        </div>
    </div>
    <div class="inpt-wrpr--rdio clearfix" v-if="editing">
        <label class="inpt-lbl inpt-lbl--vsbl">Gender</label>
        <div class="rdio-grp">
            <input type="radio" class="rdio" value="m" name="gender" id="gender1">
            <label for="gender1">Male</label>
        </div>
        <div class="rdio-grp">
            <input type="radio" class="rdio" value="f" name="gender" id="gender2">
            <label for="gender2">Female</label>
        </div>
        <div class="inpt-err"></div>
    </div>
</div>
<div class="prfl-edit__btn-wrpr" v-if="editing"><button class="btn btn--l">Save Changes</button></div>
</div>
</div>
</div>
</template>
<script>
import Axios from "axios";

const API = Axios.create({
                    withCredentials: true
            }),
        MOBILE_CHANGE_API = 'https://www.bonusapp.com/me/update.php';

export default {
  name: "EditProfile",
  computed: {
    profile: function() {
      return this.$store.state.profile;
    }
  },
  data: function(){
      return {
          changeRequestStatus: "",
          changeRequestError: false,
          editing: false
      }
  },
  methods: {
    changeMobile: function() {
    this.changeRequestStatus = "sent";
      API.get(MOBILE_CHANGE_API).then(response => {
        if (response.data.status === "success") {
          this.changeRequestStatus = "received";
        } else {
          this.changeRequestError = true;
        }
      });
    }
  }
};
</script>
<style lang="less">

</style>
