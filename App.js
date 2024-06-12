import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Navigation from './Navigations/navigation';
import { AuthProvider } from './src/contexts/AuthContext';
import { AxiosProvider } from './src/contexts/AxiosContext';
import { Amplify, Auth } from 'aws-amplify';
import MainApp from './src/Screens/MainApp';

Amplify.configure({
  Auth: {
      userPoolId: 'eu-north-1_Dphj2vJhz',
      userPoolWebClientId: '78msm1t92uq6fjm3vokb1oeh4d',
      region: 'eu-north-1',
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: 'travelmate-auth.auth.eu-north-1.amazoncognito.com',
          scopes: [
            'phone',
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin'
          ],
          redirectSignIn: ['http://localhost:3000/'],
          redirectSignOut: ['http://localhost:3000/'],
          responseType: 'code'
        }
      }
  }
});



export default function App() {
  return (
    <AuthProvider>
    <AxiosProvider>

      <MainApp/>
      
    </AxiosProvider>
    </AuthProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
