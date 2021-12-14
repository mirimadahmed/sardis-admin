import axios from 'axios'

const axiosObj = axios.create({
  baseURL: './api/admin/',
  // headers: { 'Cache-Control': 'no-cache' }
})


export default {
  getUCOPrices() {
    return axiosObj.get(`get_ucoprice.php`)
  },
  setUCOPrices(price) {
    return axiosObj.get(`set_ucoprice.php?price=${price}`)
  },
  getCustomers() {
    return axiosObj.get(`get_customers.php`)
  },
  updateCustomerStatus(status, id) {
    return axiosObj.get(`update_customerstatus.php?status=${status}&user_id=${id}`)
  },
  withdrawRequest(type, status) {
    return axiosObj.get(`get_withdrawalrequests.php?status=${status}&user_type=${type}`)
  },
  updateWithdrawalStatus(status, id) {
    return axiosObj.get(`update_withdrawalstatus.php?status=${status}&id=${id}`)
  },
  getAgents() {
    return axiosObj.get(`get_agents.php`)
  },
  getAgent(id) {
    return axiosObj.get(`get_agent.php?agent_id=${id}`)
  },
  updateAgentStatus(status, id) {
    return axiosObj.get(`update_agentstatus.php?status=${status}&agent_id=${id}`)
  },
  getAgentsForApproval() {
    return axiosObj.get(`get_newagents.php`)
  },
  getFAQ(type) {
    return axiosObj.get(`get_faqs.php?user_type=${type}`)
  },
  getSingleFAQ(id) {
    return axiosObj.get(`get_faq.php?id=${id}`)
  },
  addFAQ(type, question, answer) {
    return axiosObj.get(`add_faq.php?user_type=${type}&question=${question}&answer=${answer}`)
  },
  updateFAQ(type, question, answer, id) {
    return axiosObj.get(`update_faq.php?user_type=${type}&question=${question}&answer=${answer}&id=${id}`)
  },
  removeFAQ(id) {
    return axiosObj.get(`delete_faq.php?id=${id}`)
  },
  getContent() {
    return axiosObj.get(`get_static.php`)
  },
  updatedStatic(terms, privacy) {
    return axiosObj.get(`update_static.php?terms=${terms}&privacy=${privacy}`)
  },
}
