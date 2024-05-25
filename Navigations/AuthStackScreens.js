import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../src/Screens/SignInScreen";
import ImageUpload from "../src/Screens/ImageUpload";
import NewPasswordScreen from "../src/Screens/NewPasswordScreen";
import ForgotPassword from "../src/Screens/ForgotPassword";
import ConfirmResetPswd from "../src/Screens/ConfirmResetPswd";
import CheckEmailScreen from "../src/Screens/ConfirmEmailScreen";
import SignUpScreen from "../src/Screens/SignUpScreen";

const AuthStack = createNativeStackNavigator();

const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName="sign-in">
        <AuthStack.Screen
            name='sign-in'
            component={SignInScreen}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='upload-profile'
            component={ImageUpload}
            // options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='sign-up'
            component={SignUpScreen}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='forgotPassword'
            component={ForgotPassword}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='confirm-email'
            component={CheckEmailScreen}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='newPassword'
            component={NewPasswordScreen}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='Confirm-Reset-passward'
            component={ConfirmResetPswd}
            options={{headerShown:false}}
          />
    </AuthStack.Navigator>
  )
}

export default AuthStackScreens