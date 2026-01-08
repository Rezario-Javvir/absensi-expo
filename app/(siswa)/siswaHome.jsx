import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Navbar from '../components/navbarSiswa'

const siswaHome = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ username: 'Loading...', namaKelas: 'Loading...' });
  const [stats, setStats] = useState({ status: 'Belum Presensi', waktu: '-- : --', isDefault: true });

  const handleLogout = async () => {
    Alert.alert("Logout", "Keluar dari akun?", [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", style: "destructive", onPress: async () => { await AsyncStorage.clear(); router.replace('/'); } }
    ]);
  };

  const checkAbsenStatus = async () => {
    try {
      const savedTime = await AsyncStorage.getItem('last_absen_time');
      const savedStatus = await AsyncStorage.getItem('last_absen_status');

      if (savedTime && savedStatus) {
        const now = new Date().getTime();
        const diffInHours = (now - parseInt(savedTime)) / (1000 * 60 * 60);

        if (diffInHours < 12) {
          const date = new Date(parseInt(savedTime));
          const timeString = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          setStats({ status: savedStatus, waktu: timeString, isDefault: false });
          return;
        }
      }
      setStats({ status: 'Belum Presensi', waktu: '-- : --', isDefault: true });
    } catch (e) { console.log(e); }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const namaKelas = await AsyncStorage.getItem('nama_kelas');
        setUserData({ username: username || 'User', namaKelas: namaKelas || 'No Class' });
        await checkAbsenStatus();
      } catch (e) { console.error(e); }
    };
    getData();
  }, []);

  return (
    <View className='flex-1 items-start justify-between pt-10 bg-matcha-green-100'>
      <View className='h-1/6 w-full flex-row items-center justify-between px-6'>      
        <View>
          <Text className='text-3xl font-black text-matcha-green-50 uppercase'>{userData.username}</Text>
          <Text className='text-xl font-bold text-matcha-green-50 opacity-80'>{userData.namaKelas.replace('_', ' ')}</Text>
        </View>
        <Pressable onPress={handleLogout} className="bg-matcha-green-50/20 p-3 rounded-2xl">
          <FontAwesome name="sign-out" size={24} color="#F87171" />
        </Pressable>
      </View>

      <View className='h-5/6 w-full bg-matcha-green-50 rounded-t-[40px] items-center justify-start pt-10 px-6 gap-6 shadow-2xl'>
        <View className='w-full bg-white rounded-3xl h-1/4 border-2 border-gray-100 shadow-sm p-6 justify-between'>
          <View>
            <Text className='text-gray-400 font-bold uppercase text-xs tracking-widest'>Status Kehadiran Hari Ini</Text>
            <Text className={`text-4xl font-black mt-1 ${stats.isDefault ? 'text-gray-300' : 'text-matcha-green-100'}`}>
                {stats.status}
            </Text>
          </View>
          <View className='flex-row justify-between items-end'>
            <View>
                <Text className='text-gray-400 text-xs font-bold'>Jam Absen:</Text>
                <Text className='text-xl font-bold text-gray-700'>{stats.waktu}</Text>
            </View>
            {!stats.isDefault && (
                <View className="bg-matcha-green-100/10 px-3 py-1 rounded-full">
                    <Text className="text-matcha-green-100 font-bold text-xs text-uppercase">Terverifikasi</Text>
                </View>
            )}
          </View>
        </View>

        <View className='w-full flex-row justify-between items-center'>
            <Text className='text-matcha-green-100 font-bold text-xl'>Riwayat Terakhir</Text>
            <Text className='text-gray-400'>Lihat semua</Text>
        </View>

        <View className='w-full bg-white rounded-2xl h-20 border-2 border-gray-100 overflow-hidden flex-row shadow-sm'>
          <View className={`h-full w-3 ${stats.isDefault ? 'bg-gray-200' : 'bg-matcha-green-100'}`}></View>
          <View className='flex-1 justify-center px-4'>
             <Text className='font-bold text-gray-700'>
                {stats.isDefault ? 'Belum melakukan scan hari ini' : `Berhasil Absen pada ${stats.waktu}`}
             </Text>
          </View>
        </View>
      </View>
      <Navbar/>
    </View>
  )
}

export default siswaHome;