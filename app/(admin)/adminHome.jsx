import React, { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator, Pressable, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import NavbarAdmin from '../components/navbarAdmin'

const adminHome = () => {
    const [adminName, setAdminName] = useState('Admin'); 
    const [stats, setStats] = useState({ totalGuru: 0, totalSiswa: 0 });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            "Keluar",
            "Apakah anda yakin ingin keluar dari akun ini?",
            [
                { text: "Batal", style: "cancel" },
                { 
                    text: "Keluar", 
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.clear();
                        router.replace('/');
                    }
                }
            ]
        );
    };

    const loadData = async () => {
        try {
            const storedName = await AsyncStorage.getItem('username');
            if (storedName) setAdminName(storedName);

            const token = await AsyncStorage.getItem('token');
            const baseUrl = 'https://kfbt6z3d-3000.asse.devtunnels.ms';

            const [resGuru, resSiswa] = await Promise.all([
                axios.get(`${baseUrl}/admin/manage/guru`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${baseUrl}/admin/manage/siswa`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setStats({
                totalGuru: resGuru.data.data.total_guru,
                totalSiswa: resSiswa.data.data.total_siswa
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <View className='flex-1 bg-matcha-green-50'>            
            <View className='flex-1 items-center justify-center bg-matcha-green-50 px-5'>
                <View className='w-full absolute top-12 px-5 flex-row justify-between items-start'>
                    <View>
                        <Text className='text-4xl font-bold text-matcha-green-100 uppercase'>
                            {adminName}
                        </Text>        
                        <Text className='text-2xl font-bold text-gray-800'>Dashboard</Text>        
                    </View>

                    <Pressable 
                        onPress={handleLogout}
                        className="bg-red-100 p-3 rounded-2xl active:opacity-70"
                    >
                        <FontAwesome name="sign-out" size={24} color="#EF4444" />
                    </Pressable>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#2F6565" />
                ) : (
                    <View className='w-full bg-white h-1/6 rounded-xl overflow-hidden flex flex-row justify-between top-44 absolute mx-10 shadow-sm border border-gray-100'>
                        <View className='bg-matcha-green-100 h-full w-5 absolute z-10'></View>
                        
                        <View className='flex items-center justify-center w-1/2 border-r border-gray-100'>
                            <Text className='text-gray-500 font-bold'>Guru</Text>
                            <Text className='text-4xl font-black text-matcha-green-100'>{stats.totalGuru}</Text>
                        </View>

                        <View className='w-1/2 flex items-center justify-center'>
                            <Text className='text-gray-500 font-bold'>Siswa</Text>
                            <Text className='text-4xl font-black text-matcha-green-100'>{stats.totalSiswa}</Text>
                        </View>
                    </View>  
                )}
            </View>
            <NavbarAdmin/>
        </View>
    )
}

export default adminHome;