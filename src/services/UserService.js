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

const DeleteDataUser = (id) => {
    return axios.delete(`/users?page=${id}`)
}

const loginApi = (email, password) => {
    return axios.post(`/login`, { email, password })
}

export { fetchAllUser, postCreatUser, PutUpdateUser, DeleteDataUser, loginApi }
