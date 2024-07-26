import axios from 'axios';

const BASE_URL = `http://localhost:8080`;

export class ApiRequest {
    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL,
            timeout: 600000, // 요청 시간 제한 (10초)
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.api
                .request(config)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

    get(endpoint) {
        return this.request({
            method: 'get',
            url: endpoint,
        });
    }

    post(endpoint, data) {
        return this.request({
            method: 'post',
            url: endpoint,
            data,
        });
    }

    put(endpoint, data) {
        return this.request({
            method: 'put',
            url: endpoint,
            data,
        });
    }

    delete(endpoint, data) {
        return this.request({
            method: 'delete',
            url: endpoint,
            data,
        });
    }
}
