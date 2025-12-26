import React, { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import NavbarAdmin from '../components/navbarAdmin'

const adminHome = () => {
    const [adminName, setAdminName] = useState('Admin'); 
    const [stats, setStats] = useState({ totalGuru: 0, totalSiswa: 0 });
    const [loading, setLoading] = useState(true);

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
                <View className='w-full h-8 absolute top-8 mx-5'>
        
                    <Text className='text-4xl font-bold text-matcha-green-100 uppercase'>
                        {adminName}
                    </Text>        
                    <Text className='text-2xl font-bold'>Dashboard</Text>        
                </View>

                <View className='w-full bg-white h-1/6 rounded-xl overflow-hidden flex flex-row justify-between top-36 absolute mx-10 shadow-sm border border-gray-100'>
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
            </View>
            <NavbarAdmin/>
        </View>
    )
}

export default adminHome;