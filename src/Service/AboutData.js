import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const getAboutData = () => {
    return axios.get(BACKEND_BASE_URL + "/admin/about-data").then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get about-data.');
        }
    }).catch((error) => {
        throw error;
    });
};

export const changeAboutData = (newAboutData) => {
    return axios.put(BACKEND_BASE_URL + "/admin/about-data", newAboutData).then((response) => {
            return response;
    }).catch((error) => {
        throw error;
    });
};