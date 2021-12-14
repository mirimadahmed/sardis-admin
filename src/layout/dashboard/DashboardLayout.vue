<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/prices" name="UCO Prices" icon="ti-camera"/>
        <sidebar-link to="/customers" name="Customers" icon="ti-ticket"/>
        <sidebar-link to="/agents" name="Agents" icon="ti-user"/>
        <sidebar-link to="/approval-requests" name="Approval Requests" icon="ti-shield"/>
        <sidebar-link to="/withdrawal-requests" name="Withdrawal Requests" icon="ti-flag"/>
        <sidebar-link to="/faqs" name="FAQ" icon="ti-stats-up"/>
        <sidebar-link to="/static-pages" name="Static" icon="ti-stats-up"/>
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

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
