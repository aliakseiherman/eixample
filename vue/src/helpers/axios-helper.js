import { notify } from './notification-helper';

const axios = require("axios");

function buildHeaders() {
    return { Authorization: "Bearer " + localStorage.getItem("token") };
}

axios.interceptors.request.use(function (config) {
    config.headers = buildHeaders();
    return config;
}, function (error) {
    console.error(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    response.headers = buildHeaders();
    return response;
}, function (error) {
    console.error(error);

    // unauthorised
    if (error.response.status === 401) {
        window.location = "/";
    }

    notify('error', error.response.data.error);

    return Promise.reject(error);
});

const baseUrl = 'http://localhost:8080/api/';

function get(url) {
    return axios.get(baseUrl + url)
};

function post(url, data) {
    return axios.post(baseUrl + url, data);
};

export default {
    get: get,
    post: post
};
