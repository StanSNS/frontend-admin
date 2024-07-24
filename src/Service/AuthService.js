import axios from "axios";
import {AUTH_COOKIE_NAME, AUTH_TOKEN_KEY, BACKEND_BASE_URL, SUPER_SECRET_ENCRYPT_KEY} from "../Constant/globalConst";
import CryptoJS from 'crypto-js';

export const authenticateUser = (data) => {
    return axios.post(BACKEND_BASE_URL + "/admin/auth/login", data).then((response) => {
        if (response.status === 200) {
            console.log(response)
            saveAdditionalData(response.data.role);
            storeToken(response.data.accessToken);
            setCookie(response.data.accessToken, response.data.expirationDate)
            window.location.href = "/"
        }
    }).catch(() => {
        console.error("Failed to login ");
    });
};

const storeToken = (token) => sessionStorage.setItem(AUTH_TOKEN_KEY, encryptData(token));

export const getToken = () => {
    const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);

    if (authToken) {
        return decryptData(authToken)
    }
    return null;
};

export const isAdministrator = () => {
    let role = sessionStorage.getItem("Roles");

    if (role) {
        role = decryptData(role);
        if (role.includes("ADMIN")) {
            return true;
        }
    }
    return false;
}

export const isUserAuthenticated = () => {
    if (getCookie() && getToken()) {
        if (getCookie() === getToken() && isAdministrator()) {
            return true;
        }
    }
    emptyAuthorization()
    return false;
}

export function emptyAuthorization() {
    deleteCookie();
    deleteToken();
    deleteAdditionalData()
}

function setCookie(value, milliseconds) {
    let expires = "";
    if (milliseconds) {
        let date = new Date();
        date.setTime(date.getTime() + milliseconds);
        expires = "; expires=" + date.toUTCString();
    }

    value = encryptData(value);
    document.cookie = AUTH_COOKIE_NAME + "=" + (value || "") + expires + "; path=/";
}

function getCookie() {
    let nameEQ = AUTH_COOKIE_NAME + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return decryptData(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

function deleteCookie() {
    document.cookie = AUTH_COOKIE_NAME + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

function deleteToken() {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

function deleteAdditionalData() {
    sessionStorage.removeItem("Roles");
}

export const saveAdditionalData = (role) => {
    sessionStorage.setItem("Roles", encryptData(role));
}

const encryptData = (data) => {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), SUPER_SECRET_ENCRYPT_KEY).toString()
    } catch (error) {
        emptyAuthorization()
    }
}

const decryptData = (data) => {
    try {
        let bytes = CryptoJS.AES.decrypt(data, SUPER_SECRET_ENCRYPT_KEY);
        let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedData) {
            return JSON.parse(decryptedData);
        }
    } catch (error) {
        emptyAuthorization()
    }
}