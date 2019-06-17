const axios = require("axios");

function get(url) {
    return axios.get(url, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
};

function post(url, data) {
    return axios.post(url, data,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    );
};

module.exports = {
    get: get,
    post: post
};
