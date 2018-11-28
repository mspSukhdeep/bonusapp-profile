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
      component: HomePage
    },
    {
      path: "/passbook",
      name: "Passbook",
      component: Passbook
    },
    {
      path: "/activity",
      name: "Activity",
      component: ActivityHistory
    },
    {
      path: "/redeem",
      name: "Redeem",
      component: RedeemPage
    },
    {
      path: "/refer",
      name: "Refer",
      component: ReferPage
    },
    {
      path: "/claims",
      name: "Claims",
      component: ClaimPage
    },
    {
      path: "/edit",
      name: "EditProfile",
      component: EditProfile
    },
    {
      path: "/change-number",
      name: "ChangeNumber",
      component: ChangeNumber,
      meta: {
        standAlone: true,
        disableCheck: true
      }
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactPage
    },
    {
      path: "/how-it-works",
      name: "HowItWorks",
      component: HowItWorks
    },
    {
      path: "/faq",
      name: "FAQPage",
      component: FAQPage
    },
    {
      path: "/blocked",
      name: "BlockedPage",
      component: BlockedPage,
      meta: {
        standAlone: true
      }
    },
    {
      path: "/checkout/gc/:store",
      name: "GiftCardCheckout",
      props: true,
      component: GiftCardCheckoutPage,
      meta: {
        headered: true
      }
    }
  ]
});
