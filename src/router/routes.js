import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import Agents from "@/pages/Agents.vue";
import Customers from "@/pages/Customers.vue";
import AgentRequests from "@/pages/AgentRequests.vue";
import WithdrawalRequests from "@/pages/WithdrawalRequests.vue";
import FAQ from "@/pages/FAQ.vue";
import Analytics from "@/pages/Analytics.vue";
import Prices from "@/pages/Prices.vue";
import UserProfile from "@/pages/UserProfile.vue";
import EditFAQ from "@/pages/EditFAQ.vue";
import AddFAQ from "@/pages/AddFAQ.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/prices",
    children: [
      {
        path: "customers",
        name: "customers",
        component: Customers
      },
      {
        path: "prices",
        name: "prices",
        component: Prices
      },
      {
        path: "agents",
        name: "agents",
        component: Agents
      },
      {
        path: "agents/:id",
        name: "agents",
        component: UserProfile
      },
      {
        path: "approval-requests",
        name: "approval-requests",
        component: AgentRequests
      },
      {
        path: "withdrawal-requests",
        name: "withdrawal-requests",
        component: WithdrawalRequests
      },
      {
        path: "faqs",
        name: "faqs",
        component: FAQ
      },
      {
        path: "faq/:id",
        name: "faqs",
        component: EditFAQ
      },
      {
        path: "faq-new",
        name: "add-faqs",
        component: AddFAQ
      },
      {
        path: "static-pages",
        name: "static-pages",
        component: Analytics
      }
    ]
  },
  { path: "*", component: NotFound }
];

export default routes;
