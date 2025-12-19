import React from 'react'
import { Text, View,Pressable } from 'react-native'
import Navbar from '../components/navbarGuru'
import { Link } from 'expo-router'

const teacherHome = () => {
  return (
    <View className='flex-1 items-start justify-between pt-10 bg-matcha-green-100'>
          <View className='h-1/6 w-full items-start justify-center px-6'>      
          <Text className='text-4xl font-bold text-matcha-green-50'>XII RPL B</Text>
          </View>
           <View className='h-5/6 w-full bg-matcha-green-50 rounded-t-3xl items-center justify-center px-6 gap-6'>
              <View className='w-full bg-white rounded-xl h-2/6 border-2 border-gray-200 p-4 items-center justify-between'>
                  <View className='w-full justify-between flex-row'>
                      <Text className='text-matcha-green-100 font-medium'>Attend class</Text>
                      <Text className='text-matcha-green-100 font-medium'>15-December-2025</Text>
                  </View>
                  <Text className='text-5xl font-bold text-matcha-green-100 underline'>
                      07.00-15.00
                  </Text>
                  <Text className='text-matcha-green-100 underline'>30 min before the class start</Text>
                  <Pressable className='bg-matcha-green-100 p-2 rounded-md'>
                      <Link href='/generateQr' className='text-matcha-green-50 font-bold'>Generate QR</Link>
                  </Pressable>
              </View>
              <Text className='text-matcha-green-100 font-bold text-xl'>Today Attendance</Text>
                <View className='w-full bg-white rounded-xl h-1/6 border-2 border-gray-100 overflow-hidden'>
                    <View className='h-full w-4 bg-matcha-green-100'></View>
                </View>
           </View>
           <Navbar/>
    </View>
  )
}

export default teacherHome