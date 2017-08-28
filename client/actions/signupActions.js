import axios from "axios";

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.get("https://5981a9d2139db000114a2d9c.mockapi.io/exampleUsers").then((users) => {
            return axios.post("/api/users", [userData, users.data]);
        });
    };
}

export function isUserExists(identifier) {
    return dispatch => {
        return axios.get("https://5981a9d2139db000114a2d9c.mockapi.io/exampleUsers").then((users) => {
            let user = users.data.filter(item => item[identifier[1]] === identifier[0]);

            return { user: user[0] };
        });
    };
}
