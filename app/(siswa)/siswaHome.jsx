import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navbar from '../components/navbarSiswa'

const siswaHome = () => {
  const [userData, setUserData] = useState({
    username: 'Loading...',
    namaKelas: 'Loading...'
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const namaKelas = await AsyncStorage.getItem('nama_kelas');
        
        setUserData({
          username: username || 'User',
          namaKelas: namaKelas || 'No Class'
        });
      } catch (e) {
        console.error('Failed to load storage', e);
      }
    };

    getData();
  }, []);

  return (
    <View className='flex-1 items-start justify-between pt-10 bg-matcha-green-100'>
      <View className='h-1/6 w-full items-start justify-center px-6'>      
        <Text className='text-3xl font-black text-matcha-green-50 uppercase'>
          {userData.username}
        </Text>
        <Text className='text-xl font-bold text-matcha-green-50 opacity-80'>
          {userData.namaKelas.replace('_', ' ')}
        </Text>
      </View>

      <View className='h-5/6 w-full bg-matcha-green-50 rounded-t-[40px] items-center justify-start pt-10 px-6 gap-6 shadow-2xl'>
        <View className='w-full bg-white rounded-3xl h-1/4 border-2 border-gray-100 shadow-sm p-6'>
          <Text className='text-gray-400 font-bold'>STATISTIK PRESENSI</Text>
        </View>

        <View className='w-full flex-row justify-between items-center'>
            <Text className='text-matcha-green-100 font-bold text-xl'>Previous Attendance</Text>
            <Text className='text-gray-400'>See all</Text>
        </View>

        <View className='w-full bg-white rounded-2xl h-20 border-2 border-gray-100 overflow-hidden flex-row shadow-sm'>
          <View className='h-full w-3 bg-matcha-green-100'></View>
          <View className='flex-1 justify-center px-4'>
             <Text className='font-bold text-gray-700'>Hadir - 24 Des 2024</Text>
          </View>
        </View>
      </View>

      <Navbar/>
    </View>
  )
}

export default siswaHome