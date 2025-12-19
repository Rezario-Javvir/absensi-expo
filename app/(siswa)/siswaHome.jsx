import React from 'react'
import { Text, View } from 'react-native'
import Navbar from '../components/navbarSiswa'

const siswaHome = () => {
  return (
    <View className='flex-1 items-start justify-between pt-10 bg-matcha-green-100'>
          <View className='h-1/6 w-full items-start justify-center px-6'>      
          <Text className='text-xl font-bold text-matcha-green-50'>NameSiswa</Text>
          <Text className='text-xl font-bold text-matcha-green-50'>XII RPL B</Text>
          </View>
           <View className='h-5/6 w-full bg-matcha-green-50 rounded-t-3xl items-center justify-center px-6 gap-6'>
              <View className='w-full bg-white rounded-xl h-2/6 border-2 border-gray-200'></View>
              <Text className='text-matcha-green-100 font-bold text-xl'>Previous Attendance</Text>
                <View className='w-full bg-white rounded-xl h-1/6 border-2 border-gray-100 overflow-hidden'>
                    <View className='h-full w-4 bg-matcha-green-100'></View>
                </View>
           </View>
           <Navbar/>
    </View>
  )
}

export default siswaHome