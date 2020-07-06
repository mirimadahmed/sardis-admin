import axios from 'axios'

const axiosObj = axios.create({
  baseURL: 'https://bookable.pk/magoo/'
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
  }
}
