import { View, Text, TextInput, Modal, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons'
import '../global.css'

const LoginClass = ({ isVisible, onClose }) => {
    const [namaKelas, setNamaKelas] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isVisible) {
            setNamaKelas('');
            setPassword('');
        }
    }, [isVisible]);

    const handleLogin = async () => {
        if (!namaKelas || !password) {
            Alert.alert('Error', 'Nama kelas dan password wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const url = 'https://kfbt6z3d-3000.asse.devtunnels.ms/kelas/auth/login';

            const response = await axios.post(url, 
                { 
                    nama_kelas: namaKelas.trim(), 
                    password: password 
                },
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    } 
                }
            );

            if (response.data.success || response.status === 200) {
                await AsyncStorage.setItem('nama_kelas', namaKelas.trim());
                Alert.alert('Sukses', 'Berhasil masuk ke kelas!');
                onClose();
            }
        } catch (error) {
            let errorMsg = 'Gagal terhubung ke server';
            
            if (error.response) {
                errorMsg = error.response.data?.message || `Error ${error.response.status}: Server bermasalah`;
            } else if (error.request) {
                errorMsg = 'Tidak ada respon dari server. Periksa koneksi internet Anda.';
            }

            Alert.alert('Gagal Masuk', errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View className='flex-1 justify-center items-center bg-black/50 px-10'>
                <View className='w-full bg-white rounded-3xl p-8 items-center shadow-2xl'>
                    <Text className='text-2xl font-black mb-8 text-matcha-green-100'>Masuk Ke Kelas</Text>
                    
                    <View className='w-full border-b-2 border-gray-200 mb-6 flex-row items-center'>
                        <FontAwesome name="graduation-cap" size={20} color="#2F6565" className="mr-3" />
                        <TextInput 
                            placeholder="Nama Kelas"
                            className='text-lg py-2 flex-1'
                            value={namaKelas}
                            onChangeText={setNamaKelas}
                            autoCapitalize="none"
                        />
                    </View>

                    <View className='w-full border-b-2 border-gray-200 mb-10 flex-row items-center'>
                        <FontAwesome name="lock" size={22} color="#2F6565" className="mr-3" style={{width: 20}} />
                        <TextInput 
                            placeholder="Password Kelas"
                            className='text-lg py-2 flex-1'
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Pressable onPress={() => setShowPassword(!showPassword)} className="p-2">
                            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="#2F6565" />
                        </Pressable>
                    </View>

                    <View className='flex-row gap-4 w-full'>
                        <Pressable className='flex-1 bg-gray-100 py-4 rounded-xl' onPress={onClose}>
                            <Text className='font-bold text-center text-gray-500'>Batal</Text>
                        </Pressable>
                        <Pressable 
                            className='flex-1 bg-matcha-green-100 py-4 rounded-xl shadow-md' 
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? <ActivityIndicator color="white" /> : <Text className='text-white font-bold text-center'>Masuk</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LoginClass;