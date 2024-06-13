import React, {useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../../Navigations/navigation';
import { AuthContext } from '../contexts/AuthContext';
import HomeScreen from '../HomeScreen';

const MainApp = () => {
  const authContext = useContext(AuthContext);
 

  const loadJWT = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        const jwt = JSON.parse(value);

        authContext.setAuthState({
          accessToken: jwt.accessToken || null,
          refreshToken: jwt.refreshToken || null,
          authenticated: jwt.accessToken !== null,
        });
      } else {
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
          authenticated: false,
        });
      }
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);


  if (authContext?.authState?.authenticated === false) {
    return <Navigation />;
  } else {
    return <HomeScreen />;
  }
};

export default MainApp;
