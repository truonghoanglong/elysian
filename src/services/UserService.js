import axios from './customize-axios'

const fetchAllUser = (page) => {
    return axios.get(`/users?page=${page}`)
}

export { fetchAllUser }
