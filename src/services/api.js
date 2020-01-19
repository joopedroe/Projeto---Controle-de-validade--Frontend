import axios from 'axios';

const api = axios.create({
    baseURL:'https://controle-validade-backend.herokuapp.com/'
})

export default api;