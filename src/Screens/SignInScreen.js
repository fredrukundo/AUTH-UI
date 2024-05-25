import React, { useState} from "react";
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
// import { signIn } from "aws-amplify/auth";


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, "username is Invalid")
    .required("username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInScreen = () => {


  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  
  const onSignInFacebook = () => {
    console.warn("Sign in facebook");
  };

  const onSignInGoogle = () => {
    console.warn("Sign in google");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("forgotPassword");
    // console.warn('forgot');
  };

  const onSignUpPressed = () => {
   navigation.navigate("sign-up");
     //console.warn('Sign up');
  };

  // const handleLogin = async (values, formikActions) => {
  //   try {
  //     const user = await signIn({
  //       username: values.username,
  //       password: values.password,
  //     });
  //     console.log('Signed in user:', user);
  //   } catch (error) {
  //     if (error.code) {
  //       switch (error.code) {
  //         case 'UserNotFoundException':
  //           console.error('User does not exist.');
  //           break;
  //         case 'NotAuthorizedException':
  //           console.error('Incorrect username or password.');
  //           break;
  //         case 'UserNotConfirmedException':
  //           console.error('User not confirmed.');
  //           break;
  //         default:
  //           console.error('An unknown error occurred:', error.message);
  //       }
  //     } else {
  //       console.error('An unknown error occurred:', error);
  //     }
  //     formikActions.resetForm();
  //   }
  // }
  
  const handleLogin = async (values, formikActions) => {
    console.log(values.username);
    formikActions.resetForm();
  }


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
                  placeholder="username"
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
              text="forgot password?"
              onPress={onForgotPasswordPressed}
              type="TERTIARY"
            />

            {/* signin up using other accounts */}
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
    padding:Platform.OS === 'ios' ? '4%' : "1.5%",
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