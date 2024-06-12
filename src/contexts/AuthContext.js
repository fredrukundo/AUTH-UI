import React, {createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};

// import React, { createContext, useState, useEffect } from 'react';
// import * as Keychain from 'react-native-keychain';
// import { Auth } from 'aws-amplify';

// const AuthContext = createContext(null);
// const { Provider } = AuthContext;

// const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     accessToken: null,
//     refreshToken: null,
//     authenticated: false,
//   });

//   useEffect(() => {
//     const loadAuthState = async () => {
//       try {
//         const credentials = await Keychain.getGenericPassword();
//         if (credentials) {
//           const { accessToken, refreshToken } = JSON.parse(credentials.password);
//           setAuthState({
//             accessToken,
//             refreshToken,
//             authenticated: true,
//           });
//         }
//       } catch (error) {
//         console.error('Failed to load authentication state:', error);
//       }
//     };

//     loadAuthState();
//   }, []);

//   return (
//     <Provider value={{ authState, setAuthState }}>
//       {children}
//     </Provider>
//   );
// };

// export { AuthContext, AuthProvider };
