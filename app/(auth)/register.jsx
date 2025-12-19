import { View, Text, Image, TextInput, Pressable, Alert, ScrollView, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const RegisterScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState('admin');
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nip: '',
        nis: '',
        mapel: '',
        nama_kelas: '',
        nomor_wali: '',
        nama_lengkap:''
    });

    const ROLE_OPTIONS = [
        { label: 'Admin', value: 'admin' },
        { label: 'Wali Kelas', value: 'wali-kelas' },
        { label: 'Guru', value: 'guru' },
        { label: 'Guru BK', value: 'guru-bk' },
        { label: 'Siswa', value: 'siswa' }
    ];

    const ADDITIONAL_FIELDS = {
        admin: [],
        'wali-kelas': [
            { id: 'nip', label: 'NIP', icon: 'id-card' },
            { id: 'mapel', label: 'Mata Pelajaran', icon: 'book' }
        ],
        guru: [
            { id: 'nip', label: 'NIP', icon: 'id-card' },
            { id: 'mapel', label: 'Mata Pelajaran', icon: 'book' }
        ],
        'guru-bk': [
            { id: 'nip', label: 'NIP', icon: 'id-card' }
        ],
        siswa: [
            { id: 'nis', label: 'NIS', icon: 'id-badge' },
            { id: 'nama_kelas', label: 'Nama Kelas', icon: 'graduation-cap' },
            { id: 'nomor_wali', label: 'Nomor Wali', icon: 'phone' },
            { id: 'nama_lengkap', label: 'Nama lengkap', icon: 'id-card' }
        ]
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = async () => {
        if (!formData.username || !formData.password) {
            Alert.alert('Error', 'Username dan Password wajib diisi');
            return;
        }

        setLoading(true);
        try {
            const url = `https://kfbt6z3d-3000.asse.devtunnels.ms/${selectedRole}/auth/register`;
            
            const payload = {
                username: formData.username,
                password: formData.password
            };

            ADDITIONAL_FIELDS[selectedRole].forEach(field => {
                payload[field.id] = formData[field.id];
            });

            await axios.post(url, payload);
            Alert.alert('Sukses', 'Registrasi berhasil');
            router.replace('/login');
        } catch (error) {
            Alert.alert('Gagal', error.response?.data?.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-matcha-green-50">
            <View className="items-center pb-10">
                <View className="h-80 w-full bg-matcha-green-100 rounded-b-[80px] items-center justify-center overflow-hidden">
                    <Image 
                        source={require('../../assets/images/LogoSmkneda.png')} 
                        style={{ width: 180, height: 180 }}
                        resizeMode="contain"
                    />
                </View>
                 <View className="h-80 w-full bg-yellow-400 rounded-b-[80px] absolute -z-10 top-3"></View>

                <View className="w-full px-9 mt-8 gap-5">
                    <Text className="text-gray-500 font-bold ml-1">Pilih Role</Text>
                    <Pressable 
                        onPress={() => setShowRoleModal(true)}
                        className="flex-row items-center border-b-2 border-b-gray-400 pb-2 justify-between"
                    >
                        <View className="flex-row items-center gap-3">
                            <FontAwesome name="users" size={24} color="#2F6565" />
                            <Text className="text-lg text-gray-800">
                                {ROLE_OPTIONS.find(r => r.value === selectedRole)?.label}
                            </Text>
                        </View>
                        <FontAwesome name="chevron-down" size={16} color="#2F6565" />
                    </Pressable>

                    <View className="flex-row items-center border-b-2 border-b-gray-400">
                        <FontAwesome name="user" size={30} color="#2F6565" style={{ width: 35 }} />
                        <TextInput
                            placeholder="Username"
                            className="flex-1 py-2 text-lg"
                            value={formData.username}
                            onChangeText={(val) => handleInputChange('username', val)}
                            autoCapitalize="none"
                        />
                    </View>

                    <View className="flex-row items-center border-b-2 border-b-gray-400">
                        <FontAwesome name="lock" size={30} color="#2F6565" style={{ width: 35 }} />
                        <TextInput
                            placeholder="Password"
                            className="flex-1 py-2 text-lg"
                            secureTextEntry={!showPassword}
                            value={formData.password}
                            onChangeText={(val) => handleInputChange('password', val)}
                        />
                        <Pressable onPress={() => setShowPassword(!showPassword)}>
                            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="#2F6565" />
                        </Pressable>
                    </View>

                    {ADDITIONAL_FIELDS[selectedRole].map((item) => (
                        <View key={item.id} className="flex-row items-center border-b-2 border-b-gray-400">
                            <FontAwesome name={item.icon} size={28} color="#2F6565" style={{ width: 35 }} />
                            <TextInput
                                placeholder={item.label}
                                className="flex-1 py-2 text-lg"
                                value={formData[item.id]}
                                onChangeText={(val) => handleInputChange(item.id, val)}
                            />
                        </View>
                    ))}
                </View>

                <Pressable 
                    onPress={handleRegister}
                    disabled={loading}
                    className="mt-10 bg-matcha-green-100 px-12 py-3 rounded-xl active:opacity-70 w-64 items-center"
                >
                    <Text className="text-white text-2xl font-bold">
                        {loading ? "..." : "Register"}
                    </Text>
                </Pressable>

                <View className="flex-row mt-5">
                    <Text className="text-gray-600">Sudah punya akun? </Text>
                    <Link href="/login">
                        <Text className="text-blue-500 underline font-bold">login</Text>
                    </Link>
                </View>
            </View>

            <Modal visible={showRoleModal} transparent={true} animationType="fade">
                <Pressable 
                    className="flex-1 bg-black/50 justify-center items-center" 
                    onPress={() => setShowRoleModal(false)}
                >
                    <View className="bg-white w-3/4 rounded-2xl p-5 shadow-lg">
                        <Text className="text-xl font-bold mb-4 text-center">Pilih Role Anda</Text>
                        {ROLE_OPTIONS.map((item) => (
                            <Pressable 
                                key={item.value} 
                                className={`p-4 rounded-xl mb-2 ${selectedRole === item.value ? 'bg-matcha-green-50' : 'bg-gray-100'}`}
                                onPress={() => {
                                    setSelectedRole(item.value);
                                    setShowRoleModal(false);
                                }}
                            >
                                <Text className={`text-center font-bold ${selectedRole === item.value ? 'text-matcha-green-100' : 'text-gray-600'}`}>
                                    {item.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </ScrollView>
    );
};

export default RegisterScreen;