import axios from "axios";
import {API_BASE_URL, KEYCLOAK_BASE_URL} from "@env"


export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/users`, userData);
        if (response.status === 200) {
            console.warn("User registered successfully");
            return true;
        } else {
            console.warn("User registration failed:", response.data.message);
            return false;
        }
    } catch (error) {
        console.error("Error during registration:", error.message);
        return false;
    }
};


export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${KEYCLOAK_BASE_URL}/realms/travelmate/protocol/openid-connect/token`,
            {
                client_id: "travelmate",
                username: email,
                password: password,
                grant_type: "password"
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    registerUser,
    loginUser,
};

