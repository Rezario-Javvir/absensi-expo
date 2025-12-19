import { Stack } from "expo-router";
import "./global.css"
 
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}} />
      <Stack.Screen name="(auth)" options={{headerShown:false}} />
      <Stack.Screen name="(siswa)" options={{headerShown:false}} />
      <Stack.Screen name="(guru)" options={{headerShown:false}} />
      <Stack.Screen name="(admin)" options={{headerShown:false}} />
      <Stack.Screen name="(wali kelas)" options={{headerShown:false}} />
      <Stack.Screen name="(guru bk)" options={{headerShown:false}} />
    </Stack> 
  );
}
