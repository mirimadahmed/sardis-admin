<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/tours" name="Tours" icon="ti-camera"/>
        <sidebar-link to="/experiences" name="Experiences" icon="ti-ticket"/>
        <sidebar-link to="/users" name="Users" icon="ti-user"/>
        <sidebar-link to="/reported-users" name="Reported Users" icon="ti-shield"/>
        <sidebar-link to="/reported-listings" name="Reported Listings" icon="ti-flag"/>
        <sidebar-link to="/analytics" name="Analytics" icon="ti-stats-up"/>
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
