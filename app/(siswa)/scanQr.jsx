import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const scanQr = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center items-center bg-matcha-green-100 p-10">
                <Text className="text-white text-center font-bold text-lg mb-5">Izin kamera diperlukan</Text>
                <Pressable className="bg-matcha-green-50 p-4 rounded-xl" onPress={requestPermission}>
                    <Text className="text-matcha-green-100 font-bold">Berikan Izin</Text>
                </Pressable>
            </View>
        );
    }

    const handleBarcodeScanned = async ({ data }) => {
        setScanned(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                'https://kfbt6z3d-3000.asse.devtunnels.ms/siswa/absensi',
                { qr_token: data },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                const now = new Date().getTime().toString();
                // Simpan status sebagai "Hadir" saja
                await AsyncStorage.setItem('last_absen_time', now);
                await AsyncStorage.setItem('last_absen_status', 'Hadir');

                Alert.alert("Berhasil", "Presensi Anda berhasil dicatat.", [
                    { text: "OK", onPress: () => router.replace('/siswaHome') }
                ]);
            }
        } catch (error) {
            Alert.alert("Gagal", error.response?.data?.message || "QR Code tidak valid");
            setTimeout(() => setScanned(false), 2000);
        }
    };

    return (
        <View className="flex-1 bg-matcha-green-100 items-center justify-center gap-6">
            <Text className='font-bold text-matcha-green-50 text-3xl'>Scan QR Code</Text>
            <View className='h-80 w-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-matcha-green-50'>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    style={StyleSheet.absoluteFillObject}
                />
                <View className="flex-1 items-center justify-center">
                    <View className="w-64 h-[2px] bg-red-500 shadow-sm" />
                </View>
            </View>
            <Text className='text-matcha-green-50 font-medium text-xl text-center px-10'>Arahkan ke QR Code untuk mencatat kehadiran</Text>
            <Link href='/siswaHome' asChild>
                <Pressable className='w-72 items-center bg-matcha-green-50 p-3 rounded-xl shadow-md'>
                    <Text className='text-matcha-green-100 font-bold text-2xl'>Batal</Text>
                </Pressable>
            </Link>
        </View>
    );
}

export default scanQr;