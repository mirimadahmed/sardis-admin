<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/analytics" name="Analytics" icon="ti-stats-up" />
        <sidebar-link to="/users" name="Users" icon="ti-user" />
        <sidebar-link to="/kycs" name="KYC" icon="ti-medall-alt" />
        <sidebar-link
          to="/transactions"
          name="Transactions"
          icon="ti-direction-alt"
        />
        <sidebar-link to="/referrals" name="Referral Rewards" icon="ti-money" />
        <sidebar-link to="/translations" name="Languages" icon="ti-flag" />
        <sidebar-link to="/static-info" name="Static Info" icon="ti-info" />
        <li class="nav-item">
          <a @click="logout()" class="nav-link" href="#"
            ><i class="ti-hand-point-left" />
            <p>Logout</p>
          </a>
        </li>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-back"></i>
            <p>Logout</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import Moralis from "moralis";
const appId = "sB5QUUYtdPWRnifYozTfmnh5oPL5lXoEIDFpDjvw";
const serverUrl = "https://utvs1gompwym.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout() {
      Moralis.User.logOut();
      this.$store.commit("setAuthentication", false);
      this.$router.push("/login");
    },
  },
};
</script>
