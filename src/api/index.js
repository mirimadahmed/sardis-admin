import axios from 'axios'

const axiosObj = axios.create({
  baseURL: 'http://ghoomo.com.pk/mobile_app/admin_api/',
  // headers: { 'Cache-Control': 'no-cache' }
})


export default {
  users(page) {
    return axiosObj.get(`/get_users.php?page=${page}`)
  },
  activate(id) {
    let form = new FormData();
    form.append('id', id);
    form.append('status', 'active');
    return axiosObj.post(`/update_userstatus.php`, form)
  },
  suspend(id) {
    let form = new FormData();
    form.append('id', id);
    form.append('status', 'suspended');
    return axiosObj.post(`/update_userstatus.php`, form)
  },
  listings(page) {
    return axiosObj.get(`/get_listings.php?page=${page}&type=tour`)
  },
  experiences(page) {
    return axiosObj.get(`/get_listings.php?page=${page}&type=experience`)
  },
  activateListing(id) {
    let form = new FormData();
    form.append('id', id);
    form.append('status', 'active');
    return axiosObj.post(`/update_listingstatus.php`, form)
  },
  suspendListing(id) {
    let form = new FormData();
    form.append('id', id);
    form.append('status', 'suspended');
    return axiosObj.post(`/update_listingstatus.php`, form)
  },
  reportedUsers(page) {
    return axiosObj.get(`/get_reporteditems.php?page=${page}&type=users`)
  },
  reportedListings(page) {
    return axiosObj.get(`/get_reporteditems.php?page=${page}&type=listings`)
  }
}
