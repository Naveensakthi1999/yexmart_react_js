import axios from "axios";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/apps/loginUser/LoginUserSlice";
import { baseUrl } from "../services/api";

let store;

export const injectStore = _store => {
    store = _store;
};

export default function req() {
    const call = axios.create({
        baseURL: baseUrl,
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });


    call.interceptors.request.use(
        config => {
            // const userData = store?.user;
            // const tokenKey = userData?.user.access_token;
            let local = localStorage.getItem("persist:root") ?? "{}";
            local = JSON.parse(local);
            local.user = JSON.parse(local?.user ?? '{}');
            const token = local?.user?.access_token;

            if (token) {
                // config.headers['authorization'] = 'Bearer ' + tokenKey;
                config.headers.Authorization = 'Bearer ' + token;
            }
            // config.headers['Content-Type'] = 'application/json';
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    call.interceptors.response.use(
        response => {
            return response;
        }, error => {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    // Clear authentication state and redirect
                    window.localStorage.removeItem("persist:root");
                    window.location.href = "/auth/login";
                }
            }
            return Promise.reject(error);
        }
    );


    return call;
}