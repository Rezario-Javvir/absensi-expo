import { View, Text,Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const generateQr = () => {
  return (
    <View className="flex-1 px-10 items-center justify-center bg-matcha-green-100 gap-5">
          <Text className='font-bold text-matcha-green-50 text-3xl'>Generate QR code</Text>
          <View className='bg-matcha-green-50 h-72 w-72 rounded-xl shadow-2xl shadow-emerald-950'>
          </View>
          <Text className='text-matcha-green-50 font-medium text-xl'>Generate qr code untuk absen</Text>
          <View className='w-72 flex-row justify-between'>
              <Pressable className='items-center bg-matcha-green-50 p-1 px-3 rounded-md'>
              <Text className='text-xl font-bold text-matcha-green-100'>Clock in</Text>
              </Pressable>
              <Pressable className='items-center bg-matcha-green-50 p-1 px-3 rounded-md'>
              <Text className='text-xl font-bold text-matcha-green-100'>Clock out</Text>
              </Pressable>
          </View>
          <Pressable className='w-72 items-center bg-matcha-green-50 p-2 rounded-xl'>
              <Link href='/teacherHome' className='text-matcha-green-100 font-bold text-2xl'>Home</Link>
          </Pressable>
    </View>
  )
}

export default generateQr