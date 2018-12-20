import Vue from "vue";
import Router from "vue-router";

const HomePage = () => import("../components/HomePage"),
      Passbook = () => import("../components/Passbook"),
      ActivityHistory = () => import("../components/ActivityHistory"),
      RedeemPage = () => import("../components/RedeemPage"),
      ClaimPage = () => import("../components/ClaimPage"),
      ReferPage = () => import("../components/ReferPage"),
      ContactPage = () => import("../components/ContactPage"),
      ChangeNumber = () => import("../components/ChangeNumber"),
      EditProfile = () => import("../components/EditProfile"),
      HowItWorks = () => import("../components/HowItWorks"),
      FAQPage = () => import("../components/FAQ"),
      BlockedPage = () => import("../components/BlockedPage"),
      GiftCardCheckoutPage = () => import("../components/GiftCardCheckout");


Vue.use(Router);

export default new Router({
  base: "/me/",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/passbook",
      name: "Passbook",
      component: Passbook,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/activity",
      name: "Activity",
      component: ActivityHistory,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/redeem",
      name: "Redeem",
      component: RedeemPage,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/refer",
      name: "Refer",
      component: ReferPage,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/claims",
      name: "Claims",
      component: ClaimPage,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/edit",
      name: "EditProfile",
      component: EditProfile,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/change-number",
      name: "ChangeNumber",
      component: ChangeNumber,
      meta: {
        pageType: 'standAlone',
        disableCheck: true
      }
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactPage,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/how-it-works",
      name: "HowItWorks",
      component: HowItWorks,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/faq",
      name: "FAQPage",
      component: FAQPage,
      meta: {
        pageType: 'default'
      }
    },
    {
      path: "/blocked",
      name: "BlockedPage",
      component: BlockedPage,
      meta: {
        pageType: 'standAlone'
      }
    },
    {
      path: "/checkout/gc/:store",
      name: "GiftCardCheckout",
      props: true,
      component: GiftCardCheckoutPage,
      meta: {
        pageType: 'headered',
        disableLoginCheck: true
      }
    },
    {
      path: "/orderstatus/gc/:orderid",
      name: "GiftCardStatus",
      props: true,
      component: GiftCardCheckoutPage,
      meta: {
        pageType: 'headered',
        disableLoginCheck: true
      }
    }
  ]
});
