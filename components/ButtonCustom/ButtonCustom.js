import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const ButtonCustom = ({ onPress, text, type }) => {
  let buttonStyles, textStyles;

  switch (type) {
    case 'PRIMARY':
      buttonStyles = styles.container_PRIMARY;
      textStyles = styles.textPrimary;
      break;
    case 'SECONDARY':
      buttonStyles = styles.container_SECONDARY;
      textStyles = styles.textSECONDARY;
      break;
    case 'TERTIARY':
      buttonStyles = styles.container_TERTIARY;
      textStyles = styles.text_TERTIARY;
      break;
    default:
      buttonStyles = styles.container;
      textStyles = styles.text;
      break;
  }

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyles]}>
      {(type === 'TERTIARY' || type === 'SECONDARY' || type === 'PRIMARY') && (
        <Text style={textStyles}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    backgroundColor: Platform.OS === 'ios' ? '#4287f5' : '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  container_PRIMARY: {
    width: '100%',
    height: 48,
    backgroundColor: Platform.OS === 'ios' ? '#4287f5' : '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  container_SECONDARY: {
    width: '100%',
    height: 48,
    borderColor: Platform.OS === 'ios' ? '#4287f5' : '#2196F3',
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  container_TERTIARY: {
    marginTop: 12,
    marginBottom: 3,
  },
  textPrimary: {
    fontWeight: 'bold',
    color: 'white',
  },
  textSECONDARY: {
    color: Platform.OS === 'ios' ? '#4287f5' : '#2196F3',
  },
  text: {
    fontWeight: 'bold',
    color: 'red',
  },
  text_TERTIARY: {
    color: 'gray',
  },
});

export default ButtonCustom;
