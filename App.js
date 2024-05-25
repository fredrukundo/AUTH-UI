import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Navigation from './Navigations/navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
