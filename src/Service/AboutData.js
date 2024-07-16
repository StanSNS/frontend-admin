import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const getAboutData = () => {
    return axios.get(BACKEND_BASE_URL + "/about-data").then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get about-data.');
        }
    }).catch((error) => {
        throw error;
    });
};