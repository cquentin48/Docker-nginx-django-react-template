import axios from "axios";

const client = axios.create({
    baseURL: "http://0.0.0.0/api/v1/",
    responseType: 'json'
})

export default client
