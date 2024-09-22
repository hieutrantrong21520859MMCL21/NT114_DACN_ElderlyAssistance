import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';


export default function App() {

  const Stack = createStackNavigator();

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>

        <Stack.Screen name='Registration' component={RegistrationScreen}/>
        <Stack.Screen name='Login' component={LoginScreen}/>

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
