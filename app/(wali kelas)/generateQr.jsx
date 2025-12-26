import { View, Text ,Pressable} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const generateQr = () => {
  return (
    <View className="flex-1 px-10 items-center justify-center bg-matcha-green-100 gap-5">
          <Text className='font-bold text-matcha-green-50 text-3xl'>Generate QR code</Text>
          <View className='bg-matcha-green-50 h-72 w-72 rounded-xl shadow-2xl shadow-emerald-950'>
          </View>
          <Text className='text-matcha-green-50 font-medium text-xl'>Generate qr code untuk absen</Text>
          <View className='w-full flex justify-between flex-row'>
              <Pressable className='bg-matcha-green-50 p-2 rounded-md'><Text className='font-bold text-matcha-green-100'>Clock in</Text></Pressable>
              <Pressable className='bg-matcha-green-50 p-2 rounded-md'><Text className='font-bold text-matcha-green-100'>Clock out</Text></Pressable>
          </View>
          <Pressable className='w-72 items-center bg-matcha-green-50 p-2 rounded-xl'>
              <Text className='text-matcha-green-100 font-bold text-2xl'>Home</Text>
          </Pressable>
    </View>
  )
}

export default generateQr