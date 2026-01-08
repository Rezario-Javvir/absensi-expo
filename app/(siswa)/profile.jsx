import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, Image, Alert } from 'react-native'
import { Link } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const profile = () => {
    const [siswaData, setSiswaData] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.get('https://kfbt6z3d-3000.asse.devtunnels.ms/siswa/profile-ku', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSiswaData(response.data.data)
        } catch (error) {
            Alert.alert("Error", "Gagal memuat data profil")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    if (loading) {
        return (
            <View className='flex-1 items-center justify-center bg-matcha-green-50'>
                <ActivityIndicator size="large" color="#2F6565" />
            </View>
        )
    }

    return (
        <View className='flex-1 items-center justify-center bg-matcha-green-50 px-6'>
            
            <View className='h-44 w-44 rounded-full bg-matcha-green-100 overflow-hidden mb-5 border-4 border-white'>
                {siswaData?.avatar ? (
                    <Image 
                        source={{ url: `https://kfbt6z3d-3000.asse.devtunnels.ms/public${siswaData.avatar}` }} 
                        className="w-full h-full"
                    />
                ) : (
                    <View className="items-center justify-center flex-1">
                        <FontAwesome name="user" size={80} color="white" />
                    </View>
                )}
            </View>

            <View className='items-center py-6 px-8 rounded-3xl border-2 border-gray-100 bg-white w-full shadow-sm'>
                <Text className='text-3xl font-black text-matcha-green-100 uppercase mb-1'>
                    {siswaData?.username || 'Username'}
                </Text>
                <Text className='text-xl font-bold text-gray-500 mb-4 text-center'>
                    {siswaData?.nama_lengkap || 'Nama Lengkap'}
                </Text>
                
                <View className="w-full border-t border-gray-100 pt-4 gap-y-3">
                    <View className="flex-row items-center">
                        <FontAwesome name="id-card" size={18} color="#2F6565" />
                        <Text className='text-lg text-matcha-green-100 ml-3 font-semibold'>
                            {siswaData?.nis || '-'}
                        </Text>
                    </View>
                    
                    <View className="flex-row items-center">
                        <FontAwesome name="phone" size={20} color="#2F6565" style={{width: 20}} />
                        <Text className='text-lg text-matcha-green-100 ml-3 font-semibold'>
                            {siswaData?.nomor_wali || '-'}
                        </Text>
                    </View>
                </View>
            </View>

            <Link href='/siswaHome' className='absolute p-3 bg-matcha-green-100 rounded-2xl top-14 right-6 shadow-md'>
                <FontAwesome name="home" size={28} color="#E0FFFF"/>
            </Link>
        </View>
    )
}

export default profile