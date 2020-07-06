import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import Experiences from "@/pages/Experiences.vue";
import Tours from "@/pages/Tours.vue";
import Users from "@/pages/Users.vue";
import ReportedUser from "@/pages/ReportedUser.vue";
import ReportedListing from "@/pages/ReportedListing.vue";
import Analytics from "@/pages/Analytics.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/analytics",
    children: [
      {
        path: "tours",
        name: "tours",
        component: Tours
      },
      {
        path: "experiences",
        name: "experiences",
        component: Experiences
      },
      {
        path: "users",
        name: "users",
        component: Users
      },
      {
        path: "reported-users",
        name: "reported users",
        component: ReportedUser
      },
      {
        path: "reported-listings",
        name: "reported listings",
        component: ReportedListing
      },
      {
        path: "analytics",
        name: "analytics",
        component: Analytics
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
