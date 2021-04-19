
import axios from "axios";

class Request {
    constructor() {
        this.request = axios.create({
            baseURL: "http://localhost:8000/" ,
            timeout: 1000
        })
    }

    get = (url) => {
        let config = {};
        return this.request.get(url ,config);
    };

    post = (url, params) => {
        return this.request.post(url, params, {});
    };

    delete = (url, params) => {
        return this.request.post(url, params, {});
    };
}

export const request = new Request();