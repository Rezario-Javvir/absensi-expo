import { Text, View,Image } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-matcha-green-100">
      <Image source={require('../assets/images/LogoSmkneda.png')}/>
      <Text className="text-2xl font-bold text-matcha-green-50">Willkomen student/studentin!</Text>
      <Link href='/login' className="text-matcha-green-50 font-medium text-xl" style={{textDecorationLine:"underline"}}>login gehen</Link>
    </View>
  );
}
