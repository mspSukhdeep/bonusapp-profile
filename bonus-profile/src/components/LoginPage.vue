<template>
  <div>
  <div class="wrpr">
    <h1 class="title">Accelerated Cashback on your every purchase</h1>
    <p class="para">
      We will give you additional cashback on your every online purchase made through our platform. To do the same, we need access to your order related emails. Our automated systems will detect your shopping related emails and process cashback at much faster rate.
      We would never share your personal data with any third party without your consent.
    </p>
    <div class="btn" @click="googleLogin">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 48 48"
        class="abcRioButtonSvg"
      >
        <g>
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          ></path>
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          ></path>
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          ></path>
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          ></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </g>
      </svg>
      <span class="btn-inr">Sign In</span>
    </div>
    <img class="bnr" src="https://assets.mspcdn.net/bonus/home/home.png" />
  </div>
  <Footer></Footer>
  </div>
</template>
<script>
import Footer from "./Footer";

export default {
  name: "LoginPage",
  components: {
    Footer
  },
  data: function() {
    return {
      google: {
        OAUTHURL: "https://accounts.google.com/o/oauth2/auth?",
        SCOPE:
          "https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly",
        CLIENTID:
          "682606172338-jjvdidkgb4g69gg2psp8nokub5of8vrm.apps.googleusercontent.com",
        REDIRECT: "https://www.bonusapp.com/home/redirect/",
        REDIRECT2: "redirect",
        TYPE: "code",
        code: null
      }
    };
  },
  methods: {
    queryString: function(searchOrHash) {
      var query,
        query_string = {},
        vars;

      if (searchOrHash) {
        query = searchOrHash;
      } else if (window.location.search) {
        query = window.location.search;
      } else if (window.location.hash) {
        query = window.location.hash;
      } else {
        return {};
      }

      vars = query.substring(1).split("&");

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined")
          query_string[pair[0]] = decodeURIComponent(pair[1]);
        else if (typeof query_string[pair[0]] === "string") {
          var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
          query_string[pair[0]] = arr;
        } else query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }

      return query_string;
    },
    googleLogin: function() {
      let _url =
        this.google.OAUTHURL +
        "scope=" +
        this.google.SCOPE +
        "&client_id=" +
        this.google.CLIENTID +
        "&redirect_uri=" +
        encodeURIComponent(this.google.REDIRECT) +
        "&access_type=offline&response_type=" +
        this.google.TYPE;

      let win = window.open(_url, "_blank");
      win.focus();
      var pollTimer = window.setInterval(() => {
        try {
          var url = win.document.URL;
          console.log(url);
          if (url.indexOf(this.google.REDIRECT2) != -1) {
            window.clearInterval(pollTimer);
            let urlObj = new URL(url.replace('#/',''));
            console.log(this);
            this.google.code = this.queryString(urlObj.search).code;
            win.close();
            console.log(this.google.code);

            if (this.google.code) {
              this.$store.dispatch("saveOAuthToken", {
                code: this.google.code
              });
            } else {
              //
              console.log("Error Occurred");
            }
          }
        } catch (e) {
          console.log("Error Occured");
          console.log(e);
        }
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.wrpr {
  background-color: #fff;
  text-align: center;
  padding: 30px
}

.title {
  font-size: 24px;
}

.btn {
  padding: 8px 20px;
  height: auto;
  font-size: 20px;
  background-color: #fff;
  color: #444;
  text-transform: none;
  font-weight: 400;
  &-inr {
    margin-left: 15px;
    vertical-align: middle
  }
  svg{
      vertical-align: middle
  }
}

.para {
  margin: 30px 40px;
  line-height: 1.5;
}

.bnr{
  max-width: 100%;
  margin-top: 30px;
}
</style>
