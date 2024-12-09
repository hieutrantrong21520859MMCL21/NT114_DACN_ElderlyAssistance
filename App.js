import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

import { Ionicons } from '@expo/vector-icons';
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
import EditProfileScreen from './screens/EditProfileScreen';
import NewsScreen from './screens/NewsScreen';

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline'; // Sử dụng icon từ Ionicons
          } else if (route.name === 'Setting') {
            iconName = 'settings-outline'; // Sử dụng icon từ Ionicons
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ChangePassword" component={ForgotScreen} />
        {/* Use TabNavigator as the component of a Stack.Screen */}
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
        <Stack.Screen name="ScheduleMedicine" component={ScheduleMedicineScreen} />
        <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
        <Stack.Screen name="AudioBook" component={AudioBookScreen} />
        <Stack.Screen name="Music" component={MusicScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
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
