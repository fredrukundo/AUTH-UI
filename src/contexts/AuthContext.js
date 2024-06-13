import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [LogedInUser, setLogedInUser] = useState({ attributes: {} });
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadAuthState = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const { accessToken, refreshToken } = JSON.parse(token);
        setAuthState({
          accessToken,
          refreshToken,
          authenticated: !!accessToken,
        });

        try {
          const user = await Auth.currentAuthenticatedUser();
          setLogedInUser(user);
        } catch (error) {
          console.error('Error loading authenticated user:', error);
        }
      }
    };

    loadAuthState();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await Auth.signOut();
      setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
      setLogedInUser({ attributes: {} });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const setAuthTokens = async ({ accessToken, refreshToken }) => {
    setAuthState({
      accessToken,
      refreshToken,
      authenticated: !!accessToken,
    });
    await AsyncStorage.setItem('token', JSON.stringify({ accessToken, refreshToken }));
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState: setAuthTokens,
        LogedInUser,
        setLogedInUser,
        logout
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
