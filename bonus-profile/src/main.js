// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

Vue.directive("display", {
  inserted: function(el, binding, vnode){
    let condition = vnode.context.$store.state.app.window.width<720;
    condition = (binding.value==="desktop")?condition:!condition;
    condition && vnode.elm.remove();
  },
  update: function(el, binding, vnode) {
    let condition = vnode.context.$store.state.app.window.width<720;
    condition = (binding.value==="desktop")?condition:!condition;
    condition && vnode.elm.remove();
  }
});


Vue.directive("disable", {
  inserted: function(el, binding, vnode){
    let device = vnode.context.$store.state.app.device,
        disabledDevice = binding.value;
    (device===disabledDevice) && vnode.elm.remove();
  },
  update: function(el, binding, vnode) {
    let device = vnode.context.$store.state.app.device,
        disabledDevice = binding.value;
    (device===disabledDevice) && vnode.elm.remove();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
