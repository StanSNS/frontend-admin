import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const getAllOrderData = () => {
    return axios.get(BACKEND_BASE_URL + "/admin").then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get all order data.');
        }
    }).catch((error) => {
        throw error;
    });
};

export const modifyOrderStatus = (status, randomNumber) => {
    return axios.put(BACKEND_BASE_URL + `/admin?status=${status}&randomNumber=${randomNumber}`).then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const tasteColorExecution = () => {
    return axios.put(BACKEND_BASE_URL + "/admin/taste-color-execute").then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const brandTasteExecution = () => {
    return axios.put(BACKEND_BASE_URL + "/admin/brand-taste-data-execute").then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const productDataExecute = () => {
    return axios.put(BACKEND_BASE_URL + "/admin/product-data-execute").then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const productDataDetailsExecute = () => {
    return axios.put(BACKEND_BASE_URL + "/admin/product-data-details-execute").then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const productDataDetailsSheetExecute = () => {
    return axios.put(BACKEND_BASE_URL + "/admin/product-data-details-sheet-execute").then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const productDataDetailsWebExecute = () => {
    return axios.put(BACKEND_BASE_URL + "/admin/product-data-details-web-execute").then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const speedyOfficesExecute = () => {
    return axios.put(BACKEND_BASE_URL + "/admin/speedy-offices-execute").then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};

export const allExecute = () => {
    return axios.put(BACKEND_BASE_URL + "/admin/all-execute").then((response) => {
        return response;
    }).catch((error) => {
        throw error;
    });
};
