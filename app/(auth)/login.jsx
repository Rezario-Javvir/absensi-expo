import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react'; 
import { Alert, Image, Modal, Pressable, Text, TextInput, View, ActivityIndicator } from 'react-native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true); 
    const [showPassword, setShowPassword] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState('admin');
    
    const router = useRouter();

    const ROLE_OPTIONS = [
        { label: 'Admin', value: 'admin', path: '/adminHome' },
        { label: 'Wali Kelas', value: 'wali-kelas', path: '/waliHome' },
        { label: 'Guru', value: 'guru', path: '/teacherHome' },
        { label: 'Guru BK', value: 'guru-bk', path: '/guruBkHome' },
        { label: 'Siswa', value: 'siswa', path: '/siswaHome' }
    ];

    // --- AUTO LOGIN ---
    useEffect(() => {
        const checkExistingSession = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const savedRole = await AsyncStorage.getItem('user_role');

                if (token && savedRole) {
                    const roleConfig = ROLE_OPTIONS.find(r => r.value === savedRole);
                    if (roleConfig) {
                        router.replace(roleConfig.path);
                        return;
                    }
                }
            } catch (e) {
                console.error('Auth check error:', e);
            } finally {
                setCheckingAuth(false);
            }
        };

        checkExistingSession();
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Username and Password are required.');
            return;
        }
    
        setLoading(true);
        try {
            const url = `https://kfbt6z3d-3000.asse.devtunnels.ms/${selectedRole}/auth/login`;
            const response = await axios.post(url, { username, password });
            
            const resData = response.data.data;
            const token = resData.token;
    
            if (token) {
                // Simpan Token dan Role untuk pengecekan auto-login nanti
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('user_role', selectedRole);

                const roleKey = selectedRole.replace('-', '_'); 
                const userInfo = resData[roleKey];
    
                if (userInfo) {
                    await AsyncStorage.setItem('username', userInfo.username);
                    const className = userInfo.kelas?.nama_kelas || 'No Class Assigned';
                    await AsyncStorage.setItem('nama_kelas', className);
                    const identity = userInfo.nip || userInfo.nis || '';
                    await AsyncStorage.setItem('user_identity', identity);
                }
                
                const targetPath = ROLE_OPTIONS.find(r => r.value === selectedRole).path;
                router.replace(targetPath);
            }
        } catch (error) {
            Alert.alert('Login Failed', error.response?.data?.message || 'Check your credentials');
        } finally {
            setLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <View className="flex-1 bg-matcha-green-50 justify-center items-center">
                <ActivityIndicator size="large" color="#2F6565" />
            </View>
        );
    }

    return (
        <View className="flex-1 items-center justify-between bg-matcha-green-50 -z-20 pb-20">
            <View className="h-96 w-full bg-matcha-green-100 rounded-b-[80px] items-center justify-center">
                <Image source={require('../../assets/images/LogoSmkneda.png')}/>
            </View>
            <View className="h-96 w-full bg-yellow-400 rounded-b-[80px] absolute -z-10 top-3"></View>

            <View className='w-full px-9 flex gap-6 justify-center'>
                <Pressable 
                    onPress={() => setShowRoleModal(true)}
                    className="flex-row items-center border-b-2 border-b-gray-500 pb-2 justify-between"
                >
                    <View className="flex-row items-center gap-3">
                        <FontAwesome name="users" size={28} color="#2F6565" />
                        <Text className="text-xl text-gray-700">
                            Role: {ROLE_OPTIONS.find(r => r.value === selectedRole)?.label}
                        </Text>
                    </View>
                    <FontAwesome name="chevron-down" size={16} color="#2F6565" />
                </Pressable>

                <View className='flex-row border-b-2 border-b-gray-500 items-center gap-2'>
                    <FontAwesome name="user" size={32} color="#2F6565" />
                    <TextInput 
                        className='pb-1 text-xl flex-1' 
                        placeholder='Username'
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>
                
                <View className='flex-row border-b-2 border-b-gray-500 items-center gap-2'>
                    <FontAwesome name="lock" size={32} color="#2F6565" />
                    <TextInput 
                        className='text-xl flex-1' 
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword} 
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#2F6565" />
                    </Pressable>
                </View>
            </View>
            
            <Pressable 
                className='rounded-md bg-matcha-green-100 p-3 px-10'
                onPress={handleLogin}
                disabled={loading} 
            >
                <Text className='text-white font-bold text-3xl '>
                    {loading ? '...' : 'Login'}
                </Text>
            </Pressable>
            
            <View className='items-center'>
                <Text>Don't have an account?</Text>
                <Link href='/register' className='underline text-blue-500 text-lg'>Register</Link>
            </View>
        
            <Modal visible={showRoleModal} transparent={true} animationType="fade">
                <Pressable 
                    className="flex-1 bg-black/50 justify-center items-center" 
                    onPress={() => setShowRoleModal(false)}
                >
                    <View className="bg-white w-3/4 rounded-2xl p-5 shadow-lg">
                        <Text className="text-xl font-bold mb-4 text-center">Pilih Role Login</Text>
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
        </View>
    );
};

export default LoginScreen;