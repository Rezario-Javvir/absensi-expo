import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const SiswaCard = ({ data, isAbsenMode }) => {
    if (!data) return null;

    return (
        <View className='w-full bg-white rounded-xl h-32 flex items-center justify-between flex-row relative overflow-hidden shadow-md px-6 mb-4'>
            <View className={`h-full w-4 absolute left-0 ${isAbsenMode ? (data?.status_absen === 'hadir' ? 'bg-green-500' : 'bg-red-500') : 'bg-matcha-green-100'}`} />
            
            <View className='h-20 w-20 bg-matcha-green-100 rounded-full flex items-center justify-center overflow-hidden'>
                <FontAwesome name="user" size={40} color="white" />
            </View>

            <View className='flex-1 ml-4 gap-1'>
                <Text className='font-bold text-matcha-green-100 text-lg' numberOfLines={1}>
                    {data?.nama_lengkap || 'No Name'}
                </Text>

                {isAbsenMode ? (
                    <View className={`px-3 py-1 rounded-full self-start ${data?.status_absen === 'hadir' ? 'bg-green-100' : 'bg-red-100'}`}>
                        <Text className={`font-bold text-[10px] uppercase ${data?.status_absen === 'hadir' ? 'text-green-600' : 'text-red-600'}`}>
                            {data?.status_absen || 'Tanpa Keterangan'}
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text className='font-medium text-gray-500 text-xs'>ID: {data?.id || '-'}</Text>
                        <Text className='font-medium text-gray-500 text-xs'>NIS: {data?.nis || '-'}</Text>
                    </View>
                )}
            </View>

            {!isAbsenMode && (
                <Pressable className='p-3 rounded-md bg-red-500 active:opacity-70'>
                    <FontAwesome name="trash" size={20} color="white" />
                </Pressable>
            )}

            {isAbsenMode && (
                <View className="p-3">
                    <FontAwesome 
                        name={data?.status_absen === 'hadir' ? "check-circle" : "times-circle"} 
                        size={28} 
                        color={data?.status_absen === 'hadir' ? "#22c55e" : "#ef4444"} 
                    />
                </View>
            )}
        </View>
    )
}

export default SiswaCard