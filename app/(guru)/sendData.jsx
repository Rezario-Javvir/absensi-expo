import { View, Text } from 'react-native'
import React from 'react'

const sendData = () => {
  return (
      <View className='bg-matcha-green-50 flex-1 items-center justify-start gap-10 pt-52'>
        <View className='w-96 h-96 rounded-full border-4 border-matcha-green-100'></View>
        <Text className='text-xl font-bold text-matcha-green-100'>Sharing data to homeroom teacher</Text>
        <View className='bg-matcha-green-100 w-full  h-1/4 absolute bottom-0'>
              <View className='justify-between flex-row p-4 gap-5'>
                  <Text className='font-bold text-matcha-green-50 underline'>Today Attendance</Text>
                  <Text className='font-bold text-matcha-green-50 underline'>Previous Attendance</Text>
            </View>
      </View>
    </View>
  )
}

export default sendData