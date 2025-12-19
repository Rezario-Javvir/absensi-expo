import { Stack } from 'expo-router'
import React from 'react'
import '../global.css'

const RootLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}/>
  )
}

export default RootLayout