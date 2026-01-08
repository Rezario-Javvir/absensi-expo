import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Link, useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Navbar from '../components/navbarGuru'
import SiswaCard from '../components/SiswaCard'
import LoginClass from '../components/loginClass'

const teacherHome = () => {
    const [siswaList, setSiswaList] = useState([]);
    const [loadingSiswa, setLoadingSiswa] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({
        username: 'Memuat...',
        namaKelas: 'Memuat...'
    });

    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            "Keluar",
            "Apakah anda yakin ingin keluar?",
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

    const getData = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            const namaKelas = await AsyncStorage.getItem('nama_kelas');
            const token = await AsyncStorage.getItem('token');
            
            setUserData({
                username: username || 'Guru',
                namaKelas: namaKelas || 'Tidak Ada Kelas'
            });

            if (token && namaKelas && namaKelas !== 'No Class') {
                const response = await axios.get('https://kfbt6z3d-3000.asse.devtunnels.ms/kelas/detail', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success && response.data.data) {
                    const listSiswa = response.data.data.siswa || [];
                    setSiswaList(listSiswa);
                }
            } else {
                setSiswaList([]);
            }
        } catch (e) {
            console.log('Error:', e.message);
        } finally {
            setLoadingSiswa(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const hasClass = userData.namaKelas !== 'Tidak Ada Kelas' && userData.namaKelas !== 'Memuat...';

    return (
        <View className='flex-1 bg-matcha-green-100'>
            <View className='h-[20%] w-full flex-row items-center justify-between px-6 pt-10'>      
                <View>
                    <Text className='text-matcha-green-50 text-lg font-medium opacity-80'>
                        Selamat Datang, {userData.username}
                    </Text>
                    <Text className='text-2xl font-black text-matcha-green-50 uppercase'>
                        {hasClass ? userData.namaKelas.replace('_', ' ') : 'Belum Ada Kelas'}
                    </Text>
                </View>

                <Pressable 
                    onPress={handleLogout}
                    className="bg-matcha-green-50/20 p-3 rounded-2xl active:opacity-70"
                >
                    <FontAwesome name="sign-out" size={24} color="#F87171" />
                </Pressable>
            </View>

            <View className='h-[80%] w-full bg-matcha-green-50 rounded-t-[40px] overflow-hidden'>
                <ScrollView 
                    className='flex-1' 
                    contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className='w-full bg-white rounded-3xl border-2 border-gray-100 p-6 items-center shadow-sm mb-8'>
                        {hasClass ? (
                            <View className='w-full items-center'>
                                <View className='w-full justify-between flex-row mb-4'>
                                    <Text className='text-matcha-green-100 font-bold'>Absensi Kelas</Text>
                                    <Text className='text-matcha-green-100 font-bold'>15-Des-2025</Text>
                                </View>
                                
                                <Text className='text-5xl font-black text-matcha-green-100 underline mb-2'>
                                    07:00-15:00
                                </Text>
                                <Text className='text-gray-400 font-medium mb-6 text-center'>
                                    Generate QR untuk absensi siswa di kelas ini
                                </Text>

                                <Link href='/generateQr' asChild>
                                    <Pressable className='bg-matcha-green-100 w-full py-4 rounded-2xl shadow-md active:opacity-80'>
                                        <Text className='text-white font-bold text-center text-lg'>Generate QR Code</Text>
                                    </Pressable>
                                </Link>

                                <Pressable onPress={() => setModalVisible(true)} className="mt-4">
                                    <Text className="text-matcha-green-100 font-bold underline">Keluar Kelas</Text>
                                </Pressable>
                            </View>
                        ) : (
                            <View className='items-center py-4'>
                                <FontAwesome name="calendar-check-o" size={50} color="#2F6565" />
                                <Text className='text-gray-500 font-medium my-4 text-center'>
                                    Anda belum masuk ke kelas manapun. Silakan pilih kelas terlebih dahulu.
                                </Text>
                                <Pressable 
                                    onPress={() => setModalVisible(true)}
                                    className='bg-matcha-green-100 px-10 py-3 rounded-full shadow-md active:opacity-80'
                                >
                                    <Text className='text-white font-bold text-lg'>Masuk Kelas</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>

                    <Text className='text-matcha-green-100 font-black text-2xl mb-4'>Daftar Siswa</Text>
                    
                    {loadingSiswa ? (
                        <ActivityIndicator size="large" color="#2F6565" />
                    ) : (
                        <View className='w-full gap-2'>
                            {siswaList.length > 0 ? (
                                siswaList.map((item) => (
                                    <SiswaCard key={item.id} data={item} />
                                ))
                            ) : (
                                <View className='items-center py-10 bg-white rounded-2xl border border-dashed border-gray-300'>
                                    <Text className='text-gray-400 font-bold'>
                                        {hasClass ? "Belum ada siswa terdaftar" : "Silakan masuk ke kelas terlebih dahulu"}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>

            <LoginClass 
                isVisible={modalVisible} 
                onClose={() => {
                    setModalVisible(false);
                    getData();
                }} 
            />
            
            <Navbar />
        </View>
    )
}

export default teacherHome