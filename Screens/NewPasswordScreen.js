import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import ButtonCustom from "../components/ButtonCustom/ButtonCustom";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native"

const validationSchema = yup.object().shape({
  NewPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("NewPassword"), null], "Passwords must match")
    .required("confirmPassword is required"),
});

const NewPasswordScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigation = useNavigation();

  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
    <ScrollView onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.header}>Set a new Password</Text>
          <Text style={styles.subTitle}>
            create a new password. Ensure it differ from the previous ones for
            the security.
          </Text>
          <Formik
            initialValues={{
              NewPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle form submission here
              console.log(values);
              // if all fields are successful verified and submitted navigate to sign in
              navigation.navigate("sign-in");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.passwordContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your new password"
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("NewPassword")}
                    onBlur={handleBlur("NewPassword")}
                    value={values.NewPassword}
                  />
                  {values.NewPassword && (
                    <FontAwesome
                      name={showPassword ? "eye" : "eye-slash"}
                      size={24}
                      color="#888"
                      style={styles.passwordIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  )}
                </View>
                {touched.NewPassword && errors.NewPassword && (
                  <Text style={styles.errorText}>{errors.NewPassword}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Re-enter password"
                    secureTextEntry={!showRepeatPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                  {values.confirmPassword && (
                    <FontAwesome
                      name={showRepeatPassword ? "eye" : "eye-slash"}
                      size={24}
                      color="#888"
                      style={styles.passwordIcon}
                      onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                  )}
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
                <View style={{marginTop: "4%"}}>
                  <ButtonCustom
                    text="Update Password"
                    onPress={handleSubmit}
                    type="PRIMARY"
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
    </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop:Platform.OS === 'ios' ? "25%" : "15%",
    backgroundColor: "white",
  },
  passwordIcon: {
    position: "absolute",
    right: "3%",
    top: "55%",
  },
  passwordContainer: {
    position: "relative",
    marginTop: "4%",
  },
  input: {
    //marginTop: "4%",
    padding: Platform.OS === "ios" ? "4%" : "1.5%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#051C60",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
    color: "gray",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    marginBottom: 20,
  },
});

export default NewPasswordScreen;
