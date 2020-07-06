import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import Listings from "@/pages/Listings.vue";
import Users from "@/pages/Users.vue";
import Reported from "@/pages/Reported.vue";
import Analytics from "@/pages/Analytics.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/listings",
    children: [
      {
        path: "listings",
        name: "listings",
        component: Listings
      },
      {
        path: "users",
        name: "users",
        component: Users
      },
      {
        path: "reported",
        name: "reported",
        component: Reported
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
