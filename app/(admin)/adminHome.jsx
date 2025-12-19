import React from 'react'
import { Text, View } from 'react-native'
import NavbarAdmin from '../components/navbarAdmin'

const adminHome = () => {
    return (
    <View className='flex-1 bg-matcha-green-50'>            
       <View className='flex-1 items-center justify-center bg-matcha-green-50 px-5'>
           <View className='w-full h-8 absolute top-8 mx-5'>
           <Text className='text-4xl font-bold'>Admin</Text>       
           <Text className='text-2xl font-bold'>Dashboard</Text>       
           </View>
           <View className='w-full bg-white h-1/6 rounded-xl overflow-hidden flex flex-row justify-between top-36 absolute mx-10'>
                 <View className='top-56'>
                     
                 </View>
                 <View className='bg-matcha-green-100 h-full w-5 absolute z-10'></View>
                 <View className='flex items-center justify-center w-1/2 border-r-2 border-matcha-green-100'>
                  <Text className='text-l font-bold'>Guru</Text>
                  <Text className='text-4xl font-bold'>150</Text>
                 </View>
                 <View className='w-1/2 flex items-center justify-center'>
                  <Text className='text-l font-bold'>Siswa</Text>
                  <Text className='text-4xl font-bold'>1400</Text>
                 </View>
             </View>  
       </View>
      <NavbarAdmin/>
    </View>
  )
}

export default adminHome