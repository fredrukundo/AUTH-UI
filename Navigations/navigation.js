import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStackScreens from './AuthStackScreens'

const Navigation = () => {
  return (
    <NavigationContainer>
    <AuthStackScreens/>

    </NavigationContainer>
  )
}

export default Navigation