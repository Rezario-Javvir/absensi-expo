import React, { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navbar from '../components/navbarWali'
import CreateClass from '../components/createClass'

const waliHome = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState('Wali');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedName = await AsyncStorage.getItem('userName');
                if (storedName) {
                    setUserName(storedName);
                }
            } catch (error) {
                console.error('Gagal ambil nama user', error);
            }
        };

        loadUserData();
    }, []);

    return (
        <View className='flex-1 bg-matcha-green-50'>            
            <View className='flex-1 items-center justify-center bg-matcha-green-50 px-5'>
                <View className='w-full h-8 absolute top-8 mx-5'>
                    <Text className='text-4xl font-bold text-matcha-green-100 uppercase'>
                        {userName}
                    </Text>       
                    <Text className='text-2xl font-bold'>Dashboard</Text>       
                </View>

                <View className='w-full bg-white h-1/6 rounded-xl overflow-hidden flex flex-row justify-center top-36 absolute mx-10 shadow-sm'>
                    <View className='bg-matcha-green-100 h-full left-0 w-5 absolute z-10'></View>
                    <View className='flex items-center justify-center w-3/4'>
                        <Text className='text-center text-gray-500'>                             
                            You're currently not in any class
                        </Text>
                        <Pressable 
                            className='mt-2 bg-matcha-green-100 px-4 py-1 rounded-full'
                            onPress={() => setModalVisible(true)}
                        >
                            <Text className='text-white font-bold'>Create Now</Text>
                        </Pressable>
                    </View>
                </View>

                <CreateClass 
                    isVisible={modalVisible} 
                    onClose={() => setModalVisible(false)} 
                />
            </View>
            <Navbar/>
        </View>
    )
}

export default waliHome