import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default abstract class Api {
    public readonly instance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...config,
            validateStatus: (status) => {
                return [200, 204].includes(status);
            },
        }

        this.instance = axios.create(config);
    }
}