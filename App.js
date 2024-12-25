import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './contexts/AuthContext';

import SplashScreen from './screens/SplashScreen';
import AuthStack from './navigation/auth/AuthStack';
import MainBottom from './navigation/main/MainBottom';

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState({});

    return (
        <AuthContext.Provider
            value={{
                data: {
                    user
                },
                method: {
                    setUser
                }
            }}
        >
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    {
                        user.credential?.email ?
                        (
                            <Stack.Screen
                                name="Main"
                                component={MainBottom}
                            />
                        ) :
                        (
                            <Stack.Group>
                                <Stack.Screen
                                    name='Splash'
                                    component={SplashScreen}
                                />
                                <Stack.Screen
                                    name='Auth'
                                    component={AuthStack}
                                />
                            </Stack.Group>
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}