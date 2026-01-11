import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useRouter } from 'expo-router' 
import { FontAwesome } from '@expo/vector-icons' 
import Navbar from '../components/navbarWali'
import CreateClass from '../components/createClass'
import LoginClass from '../components/loginClass'
import SiswaCard from '../components/SiswaCard' 

const waliHome = () => {
    const router = useRouter(); 
    
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    
    const [siswaList, setSiswaList] = useState([]);
    const [rekapList, setRekapList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('umum');
    const [userData, setUserData] = useState({ username: '', namaKelas: '' });

    const handleUpdateStatus = async (siswaId, statusBaru) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.put(
                'https://kfbt6z3d-3000.asse.devtunnels.ms/absensi/edit-absensi', 
                {
                    siswa_id: Number(siswaId),
                    new_status: statusBaru
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data?.success) {
                Alert.alert("Berhasil", "Status absensi diperbarui");
                fetchAllData(); 
            }
        } catch (error) {
            Alert.alert("Gagal", "Gagal memperbarui status ke server");
        }
    };

    const handleLogoutApp = () => {
        Alert.alert("Logout", "Yakin ingin keluar aplikasi?", [
            { text: "Batal", style: "cancel" },
            { 
                text: "Logout", 
                onPress: async () => {
                    try {
                        await AsyncStorage.clear();
                        router.replace("/");
                    } catch (err) {}
                } 
            }
        ]);
    };

    const handleLogoutKelas = () => {
        Alert.alert("Keluar Kelas", "Anda akan keluar dari kelas ini.", [
            { text: "Batal", style: "cancel" },
            { 
                text: "Keluar", 
                style: "destructive",
                onPress: async () => {
                    try {
                        const token = await AsyncStorage.getItem('token');
                        await axios.post('https://kfbt6z3d-3000.asse.devtunnels.ms/kelas/auth/logout', {}, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        await AsyncStorage.removeItem('nama_kelas');
                        setUserData(prev => ({ ...prev, namaKelas: '' }));
                        setSiswaList([]);
                        setRekapList([]);
                    } catch (err) {
                        await AsyncStorage.removeItem('nama_kelas');
                        setUserData(prev => ({ ...prev, namaKelas: '' }));
                    }
                } 
            }
        ]);
    };

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('username');
            const kls = await AsyncStorage.getItem('nama_kelas');
            
            const initialClass = (kls === 'No Class' || !kls) ? '' : kls;
            setUserData({ username: user || 'Wali', namaKelas: initialClass });

            if (token) {
                const resDetail = await axios.get('https://kfbt6z3d-3000.asse.devtunnels.ms/kelas/detail', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (resDetail.data?.success) {
                    const detailData = resDetail.data.data;
                    setSiswaList(detailData.siswa || []);
                    const serverClassName = detailData.nama_kelas || '';
                    setUserData(prev => ({ ...prev, namaKelas: serverClassName }));
                    await AsyncStorage.setItem('nama_kelas', serverClassName);

                    if (serverClassName) {
                        const resRekap = await axios.get('https://kfbt6z3d-3000.asse.devtunnels.ms/kelas/rekap', {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        if (resRekap.data?.succes) setRekapList(resRekap.data.data || []);
                    }
                } else {
                    setUserData(prev => ({ ...prev, namaKelas: '' }));
                }
            }
        } catch (e) {
            if (e.response?.status === 401) {
                await AsyncStorage.clear();
                router.replace("/");
            } else {
                setUserData(prev => ({ ...prev, namaKelas: '' }));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const hasClass = userData.namaKelas !== '' && userData.namaKelas !== 'No Class';

    return (
        <View className='flex-1 bg-matcha-green-50'>
            <View className='absolute w-full h-10 bg-matcha-green-100 z-50' />
            <ScrollView 
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <View className='flex-row justify-between items-center mb-8'>
                    <View>
                        <Text className='text-3xl font-black text-matcha-green-100 uppercase'>{userData.username}</Text>
                        <Text className='text-lg font-bold text-matcha-green-100/70'>Dashboard</Text>
                    </View>
                    <Pressable onPress={handleLogoutApp} className="bg-red-50 p-3 rounded-2xl">
                        <FontAwesome name="sign-out" size={24} color="#ef4444" />
                    </Pressable>
                </View>

                <View className='bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 mb-8'>
                    <View className='flex-row justify-between items-start'>
                        <View className='flex-1'>
                            <Text className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Status Kelas</Text>
                            <Text className='text-3xl font-black text-matcha-green-100 mt-1 uppercase'>
                                {hasClass ? userData.namaKelas.replace('_', ' ') : 'KOSONG'}
                            </Text>
                        </View>
                        {hasClass && (
                            <Pressable onPress={handleLogoutKelas} className="bg-red-50 px-4 py-2 rounded-xl flex-row items-center">
                                <FontAwesome name="sign-out" size={14} color="#ef4444" />
                                <Text className="text-red-500 font-bold ml-2 text-xs">KELUAR</Text>
                            </Pressable>
                        )}
                    </View>
                    {!hasClass && (
                        <View className="flex-row gap-3 mt-6">
                            <Pressable onPress={() => setLoginModalVisible(true)} className='flex-1 bg-white border-2 border-matcha-green-100 p-4 rounded-2xl'>
                                <Text className='text-matcha-green-100 text-center font-bold'>MASUK KELAS</Text>
                            </Pressable>
                            <Pressable onPress={() => setCreateModalVisible(true)} className='flex-1 bg-matcha-green-100 p-4 rounded-2xl'>
                                <Text className='text-white text-center font-bold'>BUAT KELAS</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

                {hasClass ? (
                    <View>
                        <View className='flex-row bg-gray-200/50 p-1.5 rounded-2xl mb-8'>
                            <Pressable onPress={() => setActiveTab('umum')} className={`flex-1 py-4 rounded-xl ${activeTab === 'umum' ? 'bg-white' : ''}`}>
                                <Text className={`text-center font-bold ${activeTab === 'umum' ? 'text-matcha-green-100' : 'text-gray-500'}`}>Siswa</Text>
                            </Pressable>
                            <Pressable onPress={() => setActiveTab('absen')} className={`flex-1 py-4 rounded-xl ${activeTab === 'absen' ? 'bg-white' : ''}`}>
                                <Text className={`text-center font-bold ${activeTab === 'absen' ? 'text-matcha-green-100' : 'text-gray-500'}`}>Presensi</Text>
                            </Pressable>
                        </View>

                        {loading ? (
                            <ActivityIndicator size="large" color="#2F6565" />
                        ) : (
                            <View className="gap-y-4">
                                {(activeTab === 'umum' ? siswaList : rekapList).map((item, index) => (
                                    <SiswaCard 
                                        key={index} 
                                        data={activeTab === 'umum' ? item : { 
                                            id: item.siswa.id, 
                                            nama_lengkap: item.siswa.nama_lengkap, 
                                            status_absen: item.status 
                                        }} 
                                        isAbsenMode={activeTab === 'absen'} 
                                        onUpdate={handleUpdateStatus}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                ) : (
                    <View className="items-center mt-10">
                        <FontAwesome name="folder-open-o" size={60} color="#cbd5e1" />
                        <Text className="text-gray-400 mt-4 text-center">Silakan pilih opsi Masuk atau Buat Kelas.</Text>
                    </View>
                )}
            </ScrollView>
            <CreateClass isVisible={createModalVisible} onClose={() => { setCreateModalVisible(false); fetchAllData(); }} />
            <LoginClass isVisible={loginModalVisible} onClose={() => { setLoginModalVisible(false); fetchAllData(); }} />
            <Navbar />
        </View>
    )
}

export default waliHome;