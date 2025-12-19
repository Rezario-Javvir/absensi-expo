import { Stack } from 'expo-router'
import React from 'react'
import "../global.css"

const RootLayout = () => {
  return (
      <Stack>
          <Stack.Screen name="siswaHome" options={{headerShown:false}} />
          <Stack.Screen name="scanQr" options={{headerShown:false}} />
      </Stack>
  )
}

export default RootLayout