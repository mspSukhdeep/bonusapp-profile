<template>
<div>
		<div class="clms__ttl" data-id="new-claim">Raise a new Claim</div>
		<div class="clms__note">
			Note: It takes 5-7 days to credit Cashback after your purchase date. This is due to the time taken by our partner stores in sending your transaction details to us.
		</div>
		<div class="clms__ttl-sub">SELECT YOUR ISSUE</div>
		<div class="clms-item-wrpr">
      <div class="clms-item" :class="{'clms-item--slctd': view==='cashback'}">
          <div class="clms-item__inr clearfix" @click="changeView('cashback')">
            <div class="clms-item__img-wrpr"><img src="https://assets.mspcdn.net/f_auto/bonus_in/icon/cashback-failed.png" class="clms-item__img"></div>
            <div class="clms-item__info">
                <div class="clms-item__txt">
                    Did not get Cashback
                </div>
                <div class="clms-item__txt-sub">
                    Purchased an item more than 5 days ago and did not receive cashback.
                </div>
            </div>
          </div>
          <div v-if="view==='cashback'">
            <div v-if="isAndroidApp" class="clms-wdgt__msg">
              To raise a claim, please email us with your registered email id & purchase invoice at <a target="_blank" href="mailto:hi@bonuapp.in">hi@bonusapp.in</a>
            </div>
            <div v-else-if="subView===0">
              <div class="clms-wdgt__inr clearfix">
                <div class="clms-wdgt__body">
                  <form class="form__cntnr" enctype="multipart/form-data">
                  <div class="inpt-wrpr" :class="{'inpt-wrpr--err': form.cashback.date.error, 'inpt-wrpr--focus': form.cashback.date.focus}">
                      <label class="inpt-lbl" :class="{'inpt-lbl--vsbl': form.cashback.date.data}">Date of Purchase</label>
                      <datepicker 
                        v-model="form.cashback.date.data"
                        input-class="inpt"
                        placeholder="Date of Purchase"
                        @selected="form.cashback.date.error=''"
                        format="dd/MM/yyyy"
                      >
                      </datepicker>
                      <div class="inpt-err">{{form.cashback.date.error}}</div>
                    </div>
                    
                    <material-input v-model="form.cashback.price" placeholder="Price"></material-input>
                    <material-input v-model="form.cashback.store" placeholder="Store"></material-input>
                    <div class="inpt-wrpr inpt-wrpr--fl" :class="{'inpt-wrpr--err': form.cashback.file.error}">
                      <label class="inpt-lbl" :class="{'inpt-lbl--vsbl': true}">Invoice Attachment (pdf, jpg, png, bmp)</label>
                      <input type="file"
                        class="inpt" 
                        placeholder="Invoice Attachment" 
                        @change="onFileChange"
                      />
                      <div class="inpt-err">{{form.cashback.file.error}}</div>
                    </div>
                    <div class="btn btn--l clms__btn" :class="{'btn--ldng': isLoading.submitCashbackClaim}" @click="submitCashbackClaim()"> SUBMIT CLAIM </div>
                  </form>
                </div>
              </div>
            </div>
            <success-message v-if="subView===1" title="Your issue has been submitted." description="Our team is looking into it right now. We will resolve your issue & get back to you.">
            </success-message>
          </div>
      </div>
      <div class="clms-item" :class="{'clms-item--slctd': view==='redemption'}">
          <div class="clms-item__inr clearfix" @click="changeView('redemption')">
            <div class="clms-item__img-wrpr"><img src="https://assets.mspcdn.net/f_auto/bonus_in/icon/redemption-failed.png" class="clms-item__img"></div>
            <div class="clms-item__info">
                <div class="clms-item__txt">
                    Cashback redemption failed
                </div>
                <div class="clms-item__txt-sub">
                    Unable to redeem Cashback or redemption process failed.
                </div>
            </div>
            </div>
            <div v-if="view==='redemption'">
              <div v-if="subView===0">
                <div class="clms-wdgt__inr">
                   <div class="clms-wdgt__hd">
                    <div class="clms-wdgt__dscrptn">Please choose one or more redemption request(s) that are not processed</div>
                   </div>
                  <div class="clms-wdgt__rwrd clearfix">
                    <form class="clms-wdgt__optn-frm">
                      <div class="prfl-tbl__hd clearfix">
                        <div class="prfl-tbl__optn"></div>
                        <div class="prfl-tbl__date">Date </div>
                        <div class="prfl-tbl__entry">Description </div>
                        <div class="prfl-tbl__cb">Status
                        </div>
                      </div>
                      <div class="prfl-tbl__body clearfix">
                        <div class="prfl-tbl__row clearfix" :class="{'prfl-tbl__row--actv': (containsObject(item, selectedItems)>-1)}" v-for="(item, index) in filteredPassbook" :key="index" @click="addRemoveItem(item)">
                          <div class="prfl-tbl__optn">
                            <div class="ofr-fltrs-drpdwn__item"></div>
                          </div>
                          <div class="prfl-tbl__date">{{item.date}}</div>
                          <div class="prfl-tbl__entry"> {{item.label}}
                            <div class="prfl-tbl__dscrptn">Amount: <span class="txt--bold">₹{{Math.abs(item.cashback)}}</span></div>
                          </div>
                          <div class="prfl-tbl__cb">
                            <div class="prfl-tbl__sts" :class="{'prfl-tbl__sts--fld':item.status==='failure', 'prfl-tbl__sts--clsd':item.status==='success', 'prfl-tbl__sts--pndng':item.status==='pending'}">{{item.status}}</div>
                          </div>
                        </div>
                      </div>
                      <div class="clms-wdgt__more" @click="showOnlyFailed=!showOnlyFailed">{{switcherLabel}}</div>
                    </form>
                  </div>
                </div>
                <div class="clms-wdgt__ftr">
                  <div class="btn btn--l clms-wdgt__btn" @click="subView++">PROCEED</div>
                </div>
              </div>
              <div v-if="subView===1">
                <div class="clms-wdgt__inr">
                  <div class="clms-wdgt__hd">
                    <div class="clms-wdgt__dscrptn">You have selected following redemptions for raising the issue: </div>
                    <div class="clms-wdgt__slctd-wrpr">
                      <div class="clms-wdgt__slctd" v-for="(item, index) in selectedItems" :key="index">
                        <div class="clms-wdgt__slctd-amt"> ₹{{Math.abs(item.cashback)}} </div>
                        <div class="clms-wdgt__slctd-item"> {{item.label}} </div>
                        <div class="clms-wdgt__slctd-date"> {{item.date}} </div>
                      </div>
                    </div>
                  </div>
                  <div class="clms-wdgt__cmnts clearfix">
                    <div class="clms-wdgt__cmnts-ttl">
                      Please provide us a few details about your issue
                    </div>
                    <form class="clms-wdgt__optn-frm">
                      <textarea class="clms-wdgt__cmnts-box" placeholder="Any Info that you might want to add" v-model="form.redemption.comment.data"></textarea>
                    </form>
                    <div class="clms-wdgt__ps">
                      We will check your redemption details and will get back to you after verifying with us. Rest assured you cashback is safe with us.
                    </div>
                  </div>
                </div>
                <div class="clms-wdgt__ftr">
                  <div class="btn btn--l clms-wdgt__btn" :class="{'btn--ldng': isLoading.submitRedemptionClaim}" @click="submitRedemptionClaim">Submit Claim</div>
                </div>
              </div>
              <success-message v-if="subView===2" title="Your issue has been submitted." description="Our team is looking into it right now. We will resolve your issue & get back to you.">
              </success-message>
            </div>
        </div>
      </div>
</div>   
</template>
<script>
import UTILS from "../utils/";
import Axios from "axios";
import MaterialInput from "./MaterialInput";
import SuccessMessage from "./SuccessMessage";
import Datepicker from "vuejs-datepicker";

const API = {
    INVOICE_UPLOAD: "https://loyality-invoice.s3.amazonaws.com/",
    CLAIM_SUBMIT: "https://www.bonusapp.com/me/claims_issues_help.php"
  },
  S3Credentials = {
    acl: "public-read",
    "Content-Type": "image/png",
    success_action_redirect:
      "https://loyality-invoice.s3.amazonaws.com/successful_upload.html",
    "x-amz-meta-uuid": "14365123651274",
    "x-amz-server-side-encryption": "AES256",
    "X-Amz-Credential":
      "AKIAITKQG5QG6CAEFJYA/20201212/ap-southeast-1/s3/aws4_request",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Date": "20201212T000000Z",
    "x-amz-meta-tag": "",
    Policy:
      "eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0xMlQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoibG95YWxpdHktaW52b2ljZSJ9LFsic3RhcnRzLXdpdGgiLCIka2V5IiwiaW52b2ljZSJdLHsiYWNsIjoicHVibGljLXJlYWQifSx7InN1Y2Nlc3NfYWN0aW9uX3JlZGlyZWN0IjoiaHR0cDovL2xveWFsaXR5LWludm9pY2UuczMuYW1hem9uYXdzLmNvbS9zdWNjZXNzZnVsX3VwbG9hZC5odG1sIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCJpbWFnZS9wbmciXSx7IngtYW16LW1ldGEtdXVpZCI6IjE0MzY1MTIzNjUxMjc0In0seyJ4LWFtei1zZXJ2ZXItc2lkZS1lbmNyeXB0aW9uIjoiQUVTMjU2In0sWyJzdGFydHMtd2l0aCIsIiR4LWFtei1tZXRhLXRhZyIsIiJdLHsieC1hbXotY3JlZGVudGlhbCI6IkFLSUFJVEtRRzVRRzZDQUVGSllBLzIwMjAxMjEyL2FwLXNvdXRoZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotZGF0ZSI6IjIwMjAxMjEyVDAwMDAwMFoifV19",
    "X-Amz-Signature":
      "35658c6171827e3eda357ec130727af6a6ff3189f76f26743eefe3d598002c81"
  };

function convertToFormData(dataObject) {
  let formData = new FormData();

  Object.entries(dataObject).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}

function appendS3Credentials(data) {
  Object.entries(S3Credentials).forEach(([key, value]) => {
    data.append(key, value);
  });
}

function submitClaimRequest({ payload }) {
  return new Promise((resolve, reject) => {
    let data = convertToFormData(payload),
      response = {};

    Axios({
      method: "post",
      url: API.CLAIM_SUBMIT,
      data,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      processData: true
    })
      .then(apiResponse => {
        if (apiResponse.data) {
          if (apiResponse.data.Success == "1") {
            response = {
              status: "success",
              message: "request submitted",
              data: apiResponse
            };
            resolve(response);
          } else {
            response = {
              status: "failure",
              message: apiResponse.data.Message
            };
            reject(response);
          }
        } else {
          response = {
            status: "failure",
            message: "Submit Claim API returned unexpected response"
          };
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function uploadFile(requestParam) {
  return new Promise((resolve, reject) => {
    let timestamp = Date.now(),
      uid = UTILS.cookie.get("msp_login_email"),
      imageUrl = `invoice-${uid}-${timestamp}.png`,
      file = requestParam.data.file,
      response = {};

    if (!file) {
      response = {
        status: "failed",
        message: "No file attached"
      };

      reject(response);
    } else {
      let formData = new FormData();
      formData.append("key", imageUrl);

      if (file.size > 2 * 1024 * 1024 || !isValidFile(file.name)) {
        response = {
          status: "failed",
          message: "Invalid File (Type or Size)"
        };
        reject(response);
      }

      formData.append("file", file);

      appendS3Credentials(formData);

      Axios({
        method: "post",
        url: API.INVOICE_UPLOAD,
        data: formData
      }).then(apiResponse => {
        response = {
          status: "success",
          message: "file uploaded",
          payload: {
            formType: requestParam.formType,
            email: requestParam.email,
            purchaseDate: requestParam.data.date,
            productPrice: requestParam.data.price,
            store: requestParam.data.store,
            invoice_url: `https://s3-ap-southeast-1.amazonaws.com/loyality-invoice/${imageUrl}`
          }
        };
        resolve(response);
      });
    }
  });
}

function getFormData(formObject) {
  let data = {};
  for (let key in formObject) {
    data[key] = formObject[key].data;
  }
  return data;
}

function isValidFile(fileName) {
  return fileName.match(/\.(jpeg|jpg|bmp|png|pdf)$/) != null;
}

function intialState() {
  return {
    showOnlyFailed: true,
    selectedItems: [],
    view: "",
    subView: 0,
    isLoading: {
      submitCashbackClaim: false,
      redemptionCashbackClaim: false
    },
    form: {
      cashback: {
        date: {
          data: "",
          error: "",
          type: "text"
        },
        price: {
          data: "",
          error: "",
          type: "text"
        },
        store: {
          data: "",
          error: "",
          type: "text"
        },
        file: {
          data: "",
          error: "",
          type: "file"
        }
      },
      redemption: {
        comment: {
          data: "",
          error: ""
        }
      }
    }
  };
}

export default {
  name: "RaiseClaim",
  data: function() {
    return intialState();
  },
  computed: {
    isAndroidApp: function(){
      return this.$store.state.app.device==="app";
    },
    display: function() {
      return this.$store.state.app.window.width > 720 ? "desktop" : "mobile";
    },
    switcherLabel: function() {
      return this.showOnlyFailed
        ? "Show All Redemptions"
        : "Show Only Failed Redemptions";
    },
    filteredPassbook: function() {
      return this.$store.state.passbook.filter(entry => {
        let flag = entry.type === "redeemed";

        if (this.showOnlyFailed) {
          flag = entry.status === "failure";
        }

        return flag;
      });
    }
  },
  methods: {
    resetComponentState() {
      this.$data = intialState();
    },
    changeView(view) {
      this.view = view;
      this.subView = 0;
    },
    validateCashbackClaim() {
      let isValid = true,
        form = this.form.cashback;

      if (!form.date.data) {
        isValid = false;
        form.date.error = "Purchase date is required";
      }
      if (!form.file.data) {
        isValid = false;
        form.file.error = "Attach tax invoice of purchase";
      }
      if (!form.price.data) {
        isValid = false;
        form.price.error = "Price is required";
      }
      if (!form.store.data) {
        isValid = false;
        form.store.error = "Store name is required";
      }

      return isValid;
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.form.cashback.file.data = null;
      } else {
        this.form.cashback.file.data = files[0];
      }
    },
    submitCashbackClaim: function() {
      if (this.validateCashbackClaim()) {
        let request = {
          formType: "MSPCoins",
          data: getFormData(this.form.cashback),
          email: UTILS.cookie.get("msp_login_email")
        };
        this.isLoading.submitCashbackClaim = true;

        uploadFile(request)
          .then(submitClaimRequest)
          .then(response => {
            this.subView++;
            this.isLoading.submitCashbackClaim = false;
          })
          .catch(error => {
            console.log(error);
            this.form.cashback.file.error = error.message;
            this.isLoading.submitCashbackClaim = false;
          });
      }
    },
    submitRedemptionClaim: function() {
      let param = {
        payload: {
          formType: "cashback",
          email: UTILS.cookie.get("msp_login_email"),
          redemptionId: this.selectedItems.reduce((acc, current) => {
            acc.push(current.redemption_id);
            return acc;
          }, []),
          comment: this.form.redemption.comment.data
        }
      };

      this.isLoading.submitRedemptionClaim = true;

      submitClaimRequest(param)
        .then(response => {
          this.subView++;
          this.isLoading.submitRedemptionClaim = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading.submitRedemptionClaim = falsec;
        });
    },
    containsObject: function(obj, list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return i;
        }
      }
      return -1;
    },
    addRemoveItem: function(item) {
      let index = this.containsObject(item, this.selectedItems);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(item);
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchPassbook");
  },
  components: {
    MaterialInput,
    Datepicker,
    SuccessMessage
  }
};
</script>

<style lang="less">
</style>
