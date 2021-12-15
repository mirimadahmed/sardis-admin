import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import Users from "@/pages/Users.vue";
import Transactions from "@/pages/Transactions.vue";
import Analytics from "@/pages/Analytics.vue";
import KYC from "@/pages/KYC.vue";
import StaticInfo from "@/pages/StaticInfo.vue";
import Translations from "@/pages/Translations.vue";
import Referrals from "@/pages/Referrals.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/analytics",
    children: [
      {
        path: "users",
        name: "users",
        component: Users
      },
      {
        path: "analytics",
        name: "analytics",
        component: Analytics
      },
      {
        path: "referrals",
        name: "referrals",
        component: Referrals
      },
      {
        path: "kycs",
        name: "kycs",
        component: KYC
      },
      {
        path: "transactions",
        name: "transactions",
        component: Transactions
      },
      {
        path: "translations",
        name: "translations",
        component: Translations
      },
      {
        path: "static-info",
        name: "static-info",
        component: StaticInfo
      }
    ]
  },
  { path: "*", component: NotFound }
];

export default routes;
