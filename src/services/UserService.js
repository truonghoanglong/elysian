import axios from './customize-axios'

const fetchAllUser = (page) => {
    return axios.get(`/users?page=${page}`)
}

const postCreatUser = (name, job) => {
    return axios.post('/users', { name, job })
}

const PutUpdateUser = (name, job) => {
    return axios.put('/users/', { name, job })
}

export { fetchAllUser, postCreatUser, PutUpdateUser }
