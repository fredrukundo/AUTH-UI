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
import {useNavigation} from "@react-navigation/native"


const ConfirmResetPswd = () => {
const navigation = useNavigation();

  const onConfirmPressed = () => {
   navigation.navigate("newPassword");
  };

  return (
    
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
        <View style={{marginTop: "30%"}}>
            <Text style={styles.header}>Password Reset</Text>
            <Text style={styles.subTitle}>your password has been successfully reset. click confirm to set a new Password</Text>
          <View style={styles.button2}>
            <ButtonCustom
              text="Confirm"
              onPress={onConfirmPressed}
              type="PRIMARY"
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
});

export default ConfirmResetPswd;
