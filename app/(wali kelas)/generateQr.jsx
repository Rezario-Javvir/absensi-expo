import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg'; 

const GenerateQr = () => {
    const [qrValue, setQrValue] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(''); 
    const [kelasId, setKelasId] = useState(null); 

    useEffect(() => {
        const getKelasDetail = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get('https://kfbt6z3d-3000.asse.devtunnels.ms/kelas/detail', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success && response.data.data) {
                    setKelasId(response.data.data.id); 
                }
            } catch (error) {
                console.error("Gagal ambil ID Kelas:", error.message);
            }
        };
        getKelasDetail();
    }, []);

    const handleGenerate = async (mode) => {
        if (!kelasId) {
            Alert.alert("Error", "ID Kelas tidak ditemukan. Pastikan Anda sudah memiliki kelas.");
            return;
        }

        setLoading(true);
        setType(mode); 
        
        try {
            const token = await AsyncStorage.getItem('token');
            const url = `https://kfbt6z3d-3000.asse.devtunnels.ms/kelas/absensi/generate/${mode}`;
            
            const response = await axios.post(url, 
                { kelas_id: parseInt(kelasId) }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setQrValue(response.data.data.qr_token); 
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Gagal generate QR. Sesi mungkin berakhir.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 px-10 items-center justify-center bg-matcha-green-100 gap-5">
            <Text className='font-bold text-matcha-green-50 text-3xl text-center uppercase'>
                QR {type ? type.replace('-', ' ') : 'Code'}
            </Text>

            <View className='bg-matcha-green-50 h-72 w-72 rounded-xl shadow-2xl shadow-emerald-950 items-center justify-center overflow-hidden p-5'>
                {loading ? (
                    <ActivityIndicator size="large" color="#2F6565" />
                ) : qrValue ? (
                    <QRCode
                        value={qrValue}
                        size={220}
                        color="#2F6565"
                        backgroundColor="white"
                    />
                ) : (
                    <Text className="text-gray-400 text-center font-bold">Pilih jenis absen di bawah</Text>
                )}
            </View>

            <Text className='text-matcha-green-50 font-medium text-xl text-center'>
                {qrValue ? "Scan untuk absen" : "Silahkan klik tombol di bawah"}
            </Text>

            <View className='w-72 flex justify-between flex-row gap-4'>
                <Pressable 
                    onPress={() => handleGenerate('clock-in')}
                    className={`flex-1 p-3 rounded-md shadow-sm ${type === 'clock-in' ? 'bg-emerald-900' : 'bg-matcha-green-50'}`}
                >
                    <Text className={`font-bold text-center ${type === 'clock-in' ? 'text-white' : 'text-matcha-green-100'}`}>Clock in</Text>
                </Pressable>
                
                <Pressable 
                    onPress={() => handleGenerate('clock-out')}
                    className={`flex-1 p-3 rounded-md shadow-sm ${type === 'clock-out' ? 'bg-emerald-900' : 'bg-matcha-green-50'}`}
                >
                    <Text className={`font-bold text-center ${type === 'clock-out' ? 'text-white' : 'text-matcha-green-100'}`}>Clock out</Text>
                </Pressable>
            </View>

            <Link href='/waliHome' asChild>
                <Pressable className='w-72 items-center bg-matcha-green-50 p-3 rounded-xl shadow-md'>
                    <Text className='text-matcha-green-100 font-bold text-2xl'>Home</Text>
                </Pressable>
            </Link>
        </View>
    );
};

export default GenerateQr;