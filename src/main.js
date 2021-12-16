import Vue from "vue";
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate";
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(Vuex);
Vue.use(PaperDashboard);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    }
  },
  plugins: [createPersistedState()],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !store.state.authenticated) next({ name: 'login' })
  else next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");




