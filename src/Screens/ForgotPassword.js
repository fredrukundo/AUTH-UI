import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform
} from "react-native";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { Formik } from "formik";
import * as yup from "yup";
import {useNavigation} from "@react-navigation/native"

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const navigation = useNavigation();

  const onSignInPressed = () => {
   navigation.navigate("sign-in");
    //console.warn('back to Sign in');
  };

  return (
    
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
        <View style={{marginTop: "30%"}}>
            <Text style={styles.header}>Forgot password</Text>
            <Text style={styles.subTitle}>please enter your email to reset your password</Text>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle form submission here
              console.log(values);

              // if all fields are successful verified and submitted navigate to confirm-email
              navigation.navigate("confirm-email", {email: values.email});
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
              <View>
              <Text style={styles.label}>your Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <View style={styles.bottonSection}>
                <ButtonCustom
                  text="Reset Password"
                  onPress={handleSubmit}
                  type="PRIMARY"
                />
                </View>

              </View>
            )}
          </Formik>
          <View style={styles.button2}>
            <ButtonCustom
              text="Back to Sign In"
              onPress={onSignInPressed}
              type="TERTIARY"
            />
          </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  bottonSection: {
    marginVertical: 12,
  },
  input: {
    padding:Platform.OS === 'ios' ? '4%' : "1.5%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    color: 'gray',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    marginBottom: 20,
  },
label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#051C60",
    marginBottom: 5,
  },
  
});

export default ForgotPassword;
