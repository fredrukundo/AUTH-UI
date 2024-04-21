import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const Buttons = ({ title, onPress, buttonStyle, titleStyle }) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={[styles.buttonTitle, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Platform.OS === 'ios' ? 200 : 200,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#2196F3',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Buttons;
