import { View, Text,Pressable } from 'react-native'
import React from 'react'

const scanQr = () => {
  return (
    <View className="flex-1 px-10 items-center justify-center bg-matcha-green-100 gap-5">
          <Text className='font-bold text-matcha-green-50 text-3xl'>Scan QR code</Text>
          <View className='bg-matcha-green-50 h-72 w-72 rounded-xl shadow-2xl shadow-emerald-950'>
          </View>
          <Text className='text-matcha-green-50 font-medium text-xl'>Scan qr code untuk absen</Text>
          <Pressable className='w-72 items-center bg-matcha-green-50 p-2 rounded-xl'>
              <Text className='text-matcha-green-100 font-bold text-2xl'>Cancel</Text>
          </Pressable>
    </View>
  )
}

export default scanQr