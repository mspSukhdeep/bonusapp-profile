import axios from "axios";

let UTILS = {
  number: {
    format: function(x) {
      return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
    },
    toInt: function(x) {
      return parseInt(x) || 0;
    }
  },
  showToast: function(message) {
    let toastWrapper = document.createElement("div");
    toastWrapper.innerHTML = `<div>${message}</div>`;
    toastWrapper.className = "toast-wrpr";
    document.body.appendChild(toastWrapper);

    setTimeout(function() {
      toastWrapper.outerHTML = "";
    }, 3000);
  },
  copyText: function(text, type) {
    let textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      if (type === "REFER") {
        this.showToast(`REFER CODE COPIED`);
      } else {
        this.showToast(`COUPON CODE COPIED`);
      }
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
    return true;
  },
  setProfileCookies: function(profile) {
    profile.name && this.cookie.set("msp_login_name", profile.name, 365);
    this.cookie.set("msp_verified_cb", profile.verified_cashback, 365);
    this.cookie.set("msp_pending_cb", profile.pending_cashback, 365);
    this.cookie.set(
      "msp_loyalty_points",
      profile.verified_cashback + profile.pending_cashback,
      365
    );
  },
  logout: function() {
    if (typeof Android != "undefined") {
      try {
        Android.logout();
      } catch (ex) {
        console.warn("Failed to Perform App logout");
      }
    }

    axios
      .get("https://www.mysmartprice.com/users/login_check.php?type=logout", {
        withCredentials: true
      })
      .then(response => {
        if (window.location.href.indexOf("/me/") > -1) {
          window.location.href = "/";
        }
      });

    this.cookie.remove("msp_loyalty_points");
    this.cookie.remove("msp_login_email");
    this.cookie.remove("msp_login_name");
    this.cookie.remove("msp_user_image");
    this.cookie.remove("msp_login");
    this.cookie.remove("msp_user_mobile");
    this.cookie.remove("msp_pending_cb");
    this.cookie.remove("msp_verified_cb");
  },
  title: {
    get: function(loc) {
      let title;
      if (loc.indexOf("/redeem") > -1) {
        title = "Redeem Cashback";
      } else if (loc.indexOf("/passbook") > -1) {
        title = "Cashback Passbook";
      } else if (loc.indexOf("/activity") > -1) {
        title = "Store Visits";
      } else if (loc.indexOf("/track") > -1) {
        title = "Purchase Tracking";
      } else if (loc.indexOf("/claims") > -1) {
        title = "Claims & Issues";
      } else if (loc.indexOf("/faq") > -1) {
        title = "FAQs";
      } else if (loc.indexOf("/contact") > -1) {
        title = "Contact Us";
      } else if (loc.indexOf("/edit") > -1) {
        title = "Edit Profile";
      } else if (loc.indexOf("/change-number") > -1) {
        title = "Change Number";
      } else if (loc.indexOf("/how-it-works") > -1) {
        title = "How it works";
      } else if (loc.indexOf("/blocked") > -1) {
        title = "Blocked";
      } else {
        title = "My Profile";
      }
      return title;
    }
  },
  cookie: {
    get: cookieName => {
      let i,
        x,
        y,
        ARRcookies = document.cookie.split(";");
      let ret_val;
      for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == cookieName) {
          ret_val = unescape(y);
        }
      }
      return ret_val;
    },
    remove: function(c_name) {
      this.addCookie(c_name, "", -1);
    },
    set: function(c_name, value, recentexdays) {
      this.addCookie(c_name, value, recentexdays);
    },
    addCookie: function(c_name, value, expDays) {
      this.addCookieMins(c_name, value, expDays * 24 * 60);
    },
    addCookieMins: function(c_name, value, expMins) {
      let expDate,
        domain_name = this.TLD();
      if (expMins) {
        expDate = new Date();
        expDate.setTime(expDate.getTime() + expMins * 60 * 1000);
        expDate = expDate.toUTCString();
      }
      let c_value =
        escape(value) +
        (!expDate ? "" : "; expires=" + expDate) +
        ";domain=" +
        domain_name +
        " ; path=/";

      document.cookie = c_name + "=" + c_value + ";";

      if (expMins < 0) {
        c_value = escape(value) + "; expires=" + expDate + "; path=/";
        document.cookie = c_name + "=" + c_value + ";";
      }
    },
    TLD: () => {
      var i,
        h,
        weird_cookie = "weird_get_top_level_domain=cookie",
        hostname = document.location.hostname.split(".");
      for (i = hostname.length - 1; i >= 0; i--) {
        h = hostname.slice(i).join(".");
        document.cookie = weird_cookie + ";domain=." + h + ";";
        if (document.cookie.indexOf(weird_cookie) > -1) {
          document.cookie =
            weird_cookie.split("=")[0] +
            "=;domain=." +
            h +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          return h;
        }
      }
      return window.location.hostname;
    }
  },
  login: (loginType, queryParams) => {
    let pageURL = "https://www.mysmartprice.com/users/login.php";

    if (loginType == "signup") {
      pageURL = "https://www.mysmartprice.com/users/signup.php";
    } else if (loginType == "login") {
      pageURL = "https://www.mysmartprice.com/users/login.php";
    }
    window.location.href = pageURL + queryParams;
  },
  windowLogin(pageType, queryParams, callback = null){
    var pageURL = "https://www.mysmartprice.com/users/";
    pageURL = (pageType == "signup") ? "https://www.mysmartprice.com/users/signup.php" 
              : ((pageType == "login") ? "https://www.mysmartprice.com/users/login.php" : pageURL);
    var newWindow = window.open(pageURL + queryParams);
    window.addEventListener("message", receiveWindowMessage, false);
    /* Inner Functions: */
    function receiveWindowMessage(event) {
      newWindow.close();
      if(event.data === 'update_ui') {
        if(callback) callback();
      }
    }
  },
  setupWindowLogin(page, ref, mustClose, callback = null) { // ref param not used; kept for calling consistency with MSP
    var windowParams = "?ref=bonusapp&destUrl=" + encodeURIComponent(window.location.href);
    if ((window.screenTop || window.screenY) || navigator.platform.toUpperCase().indexOf('MAC')==-1 || mustClose) {
        windowParams += "&close=1";
    }
    this.windowLogin(page, windowParams, callback);
  },
  queryString: searchOrHash => {
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
  }
};

export default UTILS;
