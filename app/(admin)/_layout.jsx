import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
      <Stack>
          <Stack.Screen name='adminHome' options={{headerShown:false}}/>
      </Stack>
  )
}

export default RootLayout