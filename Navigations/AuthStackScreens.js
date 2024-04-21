import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../Screens/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import ImageUpload from "../Screens/ImageUpload";
import NewPasswordScreen from "../Screens/NewPasswordScreen";
import ForgotPassword from "../Screens/ForgotPassword";
import ConfirmResetPswd from "../Screens/ConfirmResetPswd";
import CheckEmailScreen from "../Screens/ConfirmEmailScreen";


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