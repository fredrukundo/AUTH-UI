import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import {useNavigation, useRoute} from "@react-navigation/native"

const CheckEmailScreen = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const inputRefs = Array(5).fill(0).map((_, i) => React.createRef());
  const route = useRoute();

  const {email} = route.params;
  const navigation = useNavigation();

  const handleVerificationCodeChange = (index, code) => {
    // Limit input to 1 character
    if (code.length <= 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = code;
      setVerificationCode(newVerificationCode);

      // Move focus to next input
      if (code.length === 1 && index < 4) {
        inputRefs[index + 1].current.focus();
      }
    }
  };
    const handleVerifyCode = () => {
      // Check if all verification code digits are filled
      const isCodeFilled = verificationCode.every(code => code.length === 1);
    
      if (isCodeFilled) {
        const code = verificationCode.join('');
        console.log("Verifying code:", code);
        navigation.navigate("Confirm-Reset-passward");
        // Implement verification logic here
    
        // Dismiss keyboard after verification
        Keyboard.dismiss();
      } else {
        // Alert user to fill in all digits
        alert("Please fill in all digits of the verification code.");
      }
    };

  const handleResendEmail = () => {
    console.log("Resending email...");
    // Implement resend email logic here

    // Dismiss keyboard after resend email action
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>Check Your Email</Text>
      <View style={styles.subTitle}>
      <Text>We sent a link to <Text style ={{fontWeight: "bold", fontSize: 16}}>{email}</Text></Text>
      <Text>Enter 5 digits mentioned in email.</Text>
      </View>
      
      <View style={styles.codeInputContainer}>
        {verificationCode.map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.digitInput}
            value={verificationCode[index]}
            onChangeText={(code) => handleVerificationCodeChange(index, code)}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>
      
      <ButtonCustom
        text="Verify Code"
        onPress={handleVerifyCode}
        type="PRIMARY"
      />
      <TouchableOpacity onPress={handleResendEmail}>
        <Text style={styles.resendText}>Haven't got the email yet? Resend email</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    //backgroundColor: "#ffffff",
    marginTop: "30%"
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  digitInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 50,
    fontSize: 16,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  resendText: {
    color: '#007bff',
    marginTop: 20,
  },
});

export default CheckEmailScreen;
