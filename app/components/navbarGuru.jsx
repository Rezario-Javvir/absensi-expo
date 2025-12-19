import { View, Text,Pressable } from 'react-native'
import React from 'react'
import '../global.css'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

const navbarGuru = () => {
  return (
    <View className='bg-matcha-green-100 w-full absolute h-24 bottom-0 flex items-center justify-between px-5 flex-row'>
      <Link href="/" style={{ paddingHorizontal: 15 }}>
         <MaterialIcons name="home" size={44} color="#E0FFFF" />
      </Link>
      <Link href='/sendData' className='border-2 border-matcha-green-50 p-4 rounded-full -top-10 bg-matcha-green-100'>
        <FontAwesome name="paper-plane" size={40} color="#E0FFFF" />      
      </Link>    
      <Link href="/history" style={{ paddingHorizontal: 15 }}>
         <MaterialIcons name="history" size={44} color="#E0FFFF" />
      </Link>
    </View>
  )
}

export default navbarGuru