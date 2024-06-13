import React, {createContext, useContext, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: 'http://ec2-3-66-47-131.eu-central-1.compute.amazonaws.com/api',
  });

  const publicAxios = axios.create({
    baseURL: 'http://ec2-3-66-47-131.eu-central-1.compute.amazonaws.com/api',
  });

  useEffect(() => {
    const setAuthHeader = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const { accessToken } = JSON.parse(token);
        authAxios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
    };

    setAuthHeader();
  }, [authContext.authState.accessToken]);

  authAxios.interceptors.request.use(
    config => {
      const token = authContext.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async failedRequest => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const { refreshToken } = JSON.parse(token);

      const options = {
        method: 'POST',
        data: { refreshToken },
        url: 'http://ec2-3-66-47-131.eu-central-1.compute.amazonaws.com/api/refreshToken',
      };

      return axios(options)
        .then(async tokenRefreshResponse => {
          const { accessToken } = tokenRefreshResponse.data;

          authContext.setAuthState({
            ...authContext.authState,
            accessToken: accessToken,
          });

          await AsyncStorage.setItem(
            'token',
            JSON.stringify({
              accessToken: accessToken,
              refreshToken: refreshToken,
            })
          );

          failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;

          return Promise.resolve();
        })
        .catch(e => {
          authContext.setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false,
          });
        });
    }
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};
