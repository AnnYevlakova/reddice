import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem("jwtToken");
        /*setAuthorizationToken(false);*/
        dispatch(setCurrentUser({}));
    };
}

export function login(data) {
    return dispatch => {
        return axios.get("https://5981a9d2139db000114a2d9c.mockapi.io/exampleUsers").then((users) => {
            return axios.post("/api/auth", [users.data, data]);
        }).then(res => {
            const token = res.data.token;

            localStorage.setItem("jwtToken", token);
            /*setAuthorizationToken(token);*/
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    };
}
