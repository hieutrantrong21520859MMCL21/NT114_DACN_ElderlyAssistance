import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import SettingScreen from './screens/SettingScreen';
import ForgotScreen from './screens/ForgotScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleMedicineScreen from './screens/ScheduleMedicineScreen';
import AddMedicineScreen from './screens/AddMedicineScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import AudioBookScreen from './screens/AudioBookScreen';
import MusicScreen from './screens/MusicScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Registration' component={RegistrationScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Setting' component={SettingScreen} />
        <Stack.Screen name='ChangePassword' component={ForgotScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name= 'ScheduleMedicine' component={ScheduleMedicineScreen}/>
        <Stack.Screen name= 'AddMedicine' component={AddMedicineScreen}/>
        <Stack.Screen name= 'Exercise' component={ExerciseScreen}/>
        <Stack.Screen name= 'ExerciseDetail' component={ExerciseDetailScreen}/>
        <Stack.Screen name= 'AudioBook' component={AudioBookScreen}/>
        <Stack.Screen name= 'Music' component={MusicScreen}/>
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