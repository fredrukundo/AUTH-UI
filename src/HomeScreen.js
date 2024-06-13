// import { View, Text, StyleSheet, Button } from "react-native";
// import React ,{useContext} from "react";
// import { AuthContext } from "./contexts/AuthContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Auth } from "aws-amplify";

// const HomeScreen = () => {
//   const { authState,setAuthState,LogedInUser } = useContext(AuthContext);

//   const logout = async () => {
//     try {
//       // Clear tokens from AsyncStorage
//       await AsyncStorage.removeItem('token');
      
//       // Sign out from AWS Cognito
//       await Auth.signOut();
      
//       // Clear auth state
//       setAuthState({
//         accessToken: null,
//         refreshToken: null,
//         authenticated: false,
//       });
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       {authState.authenticated ? (
//         <>
//           <Text>Welcome, user!</Text>
//            <Text>Welcome, {LogedInUser.attributes.email}!</Text>
//           <Text>user id: {LogedInUser.attributes.sub}!</Text>
//           <Button title="Sign Out" onPress={logout} />
//         </>
//       ) : (
//         <Text>Not signed in</Text>
//       )}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
// export default HomeScreen;

import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "./contexts/AuthContext";

const HomeScreen = () => {
  const { authState, LogedInUser, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {authState.authenticated ? (
        <>
          <Text>Welcome, user!</Text>
          {LogedInUser.attributes ? (
            <>
              <Text>Welcome, {LogedInUser.attributes.email}!</Text>
              <Text>user id: {LogedInUser.attributes.sub}!</Text>
            </>
          ) : (
            <Text>Loading user details...</Text>
          )}
          <Button title="Sign Out" onPress={logout} />
        </>
      ) : (
        <Text>Not signed in</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
