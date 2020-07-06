import axios from 'axios'

const axiosObj = axios.create({
  baseURL: 'http://ghoomo.com.pk/mobile_app/admin_api/'
})


export default {
  targets(page) {
    return axiosObj.get(`/targets.php?page=${page}`)
  },
  create(target) {
    return axiosObj.post('/targets.php', target)
  },
  delete(target_id) {
    return axiosObj.get(`/DeleteTarget.php?target_id=${target_id}`)
  },
  users() {
    return axiosObj.get(`/get_users.php`)
  },
  activate(id) {
    return axiosObj.get(`/update_userstatus.php?id=${id}&status=active`)
  },
  suspend(id) {
    return axiosObj.get(`/update_userstatus.php?id=${id}&status=suspend`)
  },
  listings(page) {
    return axiosObj.get(`/get_listings.php?page=${page}`)
  },
}
