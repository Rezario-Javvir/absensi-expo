import React, { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navbar from '../components/navbarWali'
import CreateClass from '../components/createClass'
import { Link } from 'expo-router'

const waliHome = () => {
    const [modalVisible, setModalVisible] = useState(false);
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
                    username: username || 'Wali',
                    namaKelas: namaKelas || 'No Class'
                });
            } catch (e) {
                console.error('Failed to load storage', e);
            }
        };

        getData();
    }, []);
    const hasClass = userData.namaKelas !== 'No Class' && userData.namaKelas !== 'Loading...';

    return (
        <View className='flex-1 bg-matcha-green-50'>    
            
            <View className='flex-1 items-center justify-center bg-matcha-green-50 px-5 gap-10'>
                
                <View className='w-full h-8 absolute top-12 mx-5'>
                    <Text className='text-4xl font-black text-matcha-green-100 uppercase'>
                        {userData.username}
                    </Text>        
                    <Text className='text-2xl font-bold text-gray-800'>Dashboard</Text>        
                </View>
                <View className='w-full bg-white h-1/6 rounded-2xl overflow-hidden flex flex-row items-center  mx-10 shadow-sm border border-gray-100'>
                    <View className='bg-matcha-green-100 h-full w-4'></View>
                    
                    <View className='flex-1 items-center justify-center px-4'>
                        {hasClass ? (
                            <View className='items-center'>
                                <Text className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Kelas Anda</Text>
                                <Text className='text-matcha-green-100 text-3xl font-black'>
                                    {userData.namaKelas.replace('_', ' ')}
                                </Text>
                            </View>
                        ) : (
                            <View className='items-center'>
                                <Text className='text-center text-gray-500 font-medium'>
                                    {userData.namaKelas === 'Loading...' ? 'Loading...' : "You're currently not in any class"}
                                </Text>

                                {userData.namaKelas === 'No Class' && (
                                    <Pressable 
                                        className='mt-3 bg-matcha-green-100 px-6 py-2 rounded-full shadow-md active:opacity-70'
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <Text className='text-white font-bold'>Create Now</Text>
                                    </Pressable>
                                )}
                            </View>
                        )}
                    </View>
                </View>
                <CreateClass isVisible={modalVisible} onClose={() => setModalVisible(false)} />
            <View className='border-2 border-gray-200 w-full h-2/6 rounded-xl bg-white p-4 flex justify-between items-center'>
                    <View className='w-full flex flex-row justify-between'>
                        <Text className='text-xl font-bold text-matcha-green-100'>
                            Attend class
                        </Text>
                        <Text className='text-xl font-bold text-matcha-green-100'>
                            15-05-2026
                        </Text>
                    </View>
                    <View className='w-full flex items-center justify-between'>
                        <Text className='underline text-matcha-green-100 font-bold text-4xl'>07:00-15:00</Text>
                        <Text>30 min</Text>  
                        <Text className='underline font-medium text-matcha-green-100'>Before class start</Text>  
                    </View>
                    <Link href='/generateQr' className='font-bold text-white bg-matcha-green-100 rounded-md p-2'>
                        Generate Qr
                    </Link>
            </View>
            </View>
            <Navbar/>
        </View>
    )
}

export default waliHome;