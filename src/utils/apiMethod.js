import axios from 'axios';
import Config from './Config';

const get = (url) => {
    axios.get(Config.hostname + url).then((res) => {
        return {
            status: "success",
            data: res
        };

    }).catch((err) => {
        return {
            status: "error",
            data: err
        };
    })
}


const post = (url, payload) => {
    return axios.post(Config.hostname + url, payload).then((res) => {
        // console.log("res:", res)
        // return {
        //     status: "success",
        //     data: res
        // };

    })
}


export { get, post };