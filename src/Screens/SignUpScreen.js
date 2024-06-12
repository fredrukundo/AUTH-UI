import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import Buttons from "../../components/ButtonCustom/Buttons";
import LoadingButtonUp from "../../components/ButtonCustom/signUpButton/LoadingButtonUp";
import { registerUser } from "../../services/UserApi";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, "username is Invalid")
    .required("username is required"),
  firstName: yup
    .string()
    .trim()
    .min(3, "fistname is Invalid")
    .required("firstName is required"),
  lastName: yup
    .string()
    .trim()
    .min(3, "lastName is Invalid")
    .required("lastName is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});

const SignUpScreen = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  // functions
  const navigation = useNavigation();

  const onSignInFacebook = () => {
    console.warn("Sign in facebook");
  };

  const onSignInGoogle = () => {
    console.warn("Sign in google");
  };

  const onTermsPressed = () => {
    console.warn("Terms and conditions");
  };

  const onPrivacyPressed = () => {
    console.warn("Privacy and conditions");
  };

  const onSignInPressed = () => {
    navigation.navigate("sign-in");
    //console.warn("sing in");
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.head}>
            <Text style={styles.title}>Create an Account</Text>
          </View>
          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              title: "Mr.",
              email: "",
              password: "",
              repeatPassword: "",
              phoneNumber: "+123456789",
              gender: "not set",
              birthDate: "1990-01-01",
              nationality: "not set",
              preferredCurrency: "USD",
              lang: "en",
            }}
            validationSchema={validationSchema}
           
            onSubmit={async (values, formikActions) => {
              try {
                // Call the registerUser function
                await registerUser(values);
                // Optionally, navigate to a success screen or perform other actions
              } catch (error) {
                console.error("Registration failed:", error);
                // Handle errors, e.g., display error message to the user
              } finally {
                //formikActions.resetForm();
                formikActions.setSubmitting(false);
              }
            }}
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

                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
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

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Repeat Password"
                    secureTextEntry={!showRepeatPassword}
                    onChangeText={handleChange("repeatPassword")}
                    onBlur={handleBlur("repeatPassword")}
                    value={values.repeatPassword}
                  />
                  {values.repeatPassword && (
                    <FontAwesome
                      name={showRepeatPassword ? "eye" : "eye-slash"}
                      size={24}
                      color="#888"
                      style={styles.passwordIcon}
                      onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                  )}
                </View>
                {touched.repeatPassword && errors.repeatPassword && (
                  <Text style={styles.errorText}>{errors.repeatPassword}</Text>
                )}

                <LoadingButtonUp
                  submitting={isSubmitting}
                  text="Register"
                  onPress={handleSubmit}
                  type="PRIMARY"
                />
              </View>
            )}
          </Formik>

          <View>
            <Text style={styles.text}>
              By registering, you confirm that you accept our{" "}
              <Text style={styles.link} onPress={onTermsPressed}>
                Terms of Use
              </Text>{" "}
              and{" "}
              <Text style={styles.link} onPress={onPrivacyPressed}>
                Privacy Policy
              </Text>
            </Text>
          </View>
          {/* signin up using other accounts */}
          <View style={styles.head}>
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
              text="Have an account? Sign In"
              onPress={onSignInPressed}
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
    paddingHorizontal: "3%",
    paddingTop: "15%",
    backgroundColor: "white",
  },
  head: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: Platform.OS === "ios" ? "8%" : "2%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
  },
  passwordIcon: {
    position: "absolute",
    right: "3%",
    top: "39%",
  },
  passwordContainer: {
    position: "relative",
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  input: {
    marginTop: "4%",
    padding: Platform.OS === "ios" ? "4%" : "1.5%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
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
  appleButton: {
    backgroundColor: "#e3e3e3",
    marginTop: 8,
  },
  appleButtonTitle: {
    color: "#363636",
  },
});

export default SignUpScreen;

