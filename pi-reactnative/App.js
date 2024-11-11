import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen'; 
import HomeMenu from './src/components/HomeMenu'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">  
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}  
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="HomeMenu" 
          component={HomeMenu}  
          options={{ headerShown: false }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
