import axios from "axios";
import { AxiosContext } from "../src/contexts/AxiosContext";
import React, {useContext} from 'react';



const publicAxios = axios.create({
    baseURL: 'http://ec2-3-66-47-131.eu-central-1.compute.amazonaws.com/api',
  });
export const registerUser = async (userData) => {
    //const { publicAxios} = useContext(AxiosContext);
    
    try {
        const response = await publicAxios.post(`/users`, userData);
        if (response.status === 200) {
            console.warn("User registered successfully");
            return true;
        } else {
            console.warn("User registration failed:", response.data);
            return false;
        }
    } catch (error) {
        console.error("Error during registration:", error);
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

