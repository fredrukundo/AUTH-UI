import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
} from "react-native";
import Logo from "../../assets/images/logo_safe.png";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import Buttons from "../../components/ButtonCustom/Buttons";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import LoadButtonIn from "../../components/ButtonCustom/signInButton/LoadButtonIn";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { AuthContext } from "../contexts/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, "Username is invalid")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { setAuthState, setLogedInUser, LogedInUser } = useContext(AuthContext);

  const onSignInFacebook = () => {
    console.warn("Sign in with Facebook");
  };

  const onSignInGoogle = () => {
    console.warn("Sign in with Google");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("forgotPassword");
  };

  const onSignUpPressed = () => {
    navigation.navigate("sign-up");
  };

  const handleLogin = async (values, formikActions) => {
    try {
      const user = await Auth.signIn(values.username, values.password);
      const { signInUserSession } = user;
      const { accessToken, refreshToken } = signInUserSession;

      await AsyncStorage.setItem(
        'token',
        JSON.stringify({ accessToken, refreshToken })
      );

      setAuthState({
        accessToken: accessToken.jwtToken,
        refreshToken: refreshToken.token,
        authenticated: true,
      });
      setLogedInUser(user);
      console.log(user);
      formikActions.setSubmitting(false);
      formikActions.resetForm();
    } catch (error) {
      if (error.code === 'UserNotFoundException') {
        console.error('User does not exist.');
      } else if (error.code === 'NotAuthorizedException') {
        console.error('Incorrect username or password.');
      } else if (error.code === 'UserNotConfirmedException') {
        console.error('User not confirmed.');
      } else {
        console.error('An unknown error occurred:', error);
      }
      formikActions.setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headpic}>
            <Image
              source={Logo}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode="contain"
            />
          </View>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {values.password && (
                    <FontAwesome
                      name={showPassword ? "eye" : "eye-slash"}
                      size={24}
                      color="#888"
                      style={styles.passwordIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  )}
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <LoadButtonIn
                  text="Sign In"
                  onPress={handleSubmit}
                  type="PRIMARY"
                  submitting={isSubmitting}
                />
              </View>
            )}
          </Formik>
          <View style={styles.headpic}>
            <ButtonCustom
              text="Forgot password?"
              onPress={onForgotPasswordPressed}
              type="TERTIARY"
            />
            <Buttons
              title="Sign In with Facebook"
              onPress={onSignInFacebook}
              buttonStyle={styles.facebookButton}
              titleStyle={styles.facebookButtonTitle}
            />
            <Buttons
              title="Sign In with Google"
              onPress={onSignInGoogle}
              buttonStyle={styles.googleButton}
              titleStyle={styles.googleButtonTitle}
            />
            <ButtonCustom
              text="Don't have an account? Create one"
              onPress={onSignUpPressed}
              type="TERTIARY"
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "white",
  },
  input: {
    marginTop: "4%",
    padding: Platform.OS === 'ios' ? '4%' : "1.5%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
  },
  passwordIcon: {
    position: "absolute",
    right: "3%",
    top: "39%",
  },
  passwordContainer: {
    position: "relative",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  headpic: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  facebookButton: {
    backgroundColor: "#E7EAF4",
    marginTop: 8,
  },
  facebookButtonTitle: {
    color: "#4765A9",
  },
  googleButton: {
    backgroundColor: "#FAE9EA",
    marginTop: 8,
  },
  googleButtonTitle: {
    color: "#DD4D44",
  },
});

export default SignInScreen;
