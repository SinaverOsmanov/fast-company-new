import axios from "axios";
import localStorageService from "./localStorage.service";

// const httpAuth = axios.create({
//     baseURL: "https://identitytoolkit.googleapis.com/v1/",
//     params: {
//         key: process.env.REACT_APP_FIREBASE_KEY
//     }
// });

const authService = {
    register: async ({ email, password }) => {
        const { data } = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`,
            {
                email,
                password,
                returnSecureToken: true
            }
        );
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`,
            {
                email,
                password,
                returnSecureToken: true
            }
        );
        return data;
    },
    refresh: async () => {
        const { data } = await axios.post(
            `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`,
            {
                grant_type: "refresh_token",
                refresh_token: localStorageService.getRefreshToken()
            }
        );
        return data;
    }
};

export default authService;
