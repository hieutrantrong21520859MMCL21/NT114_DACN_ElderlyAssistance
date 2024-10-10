import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotScreen from './screens/ForgotScreen';


export default function App() {

  const Stack = createStackNavigator();

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
        
        <Stack.Screen name='Splash' component={SplashScreen}/>
        <Stack.Screen name='Registration' component={RegistrationScreen}/>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='ChangePassword' component={ForgotScreen}/>


      </Stack.Navigator>

    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
