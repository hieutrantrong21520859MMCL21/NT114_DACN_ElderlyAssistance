import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../../screens/auth/LoginScreen"
import RegistrationScreen from "../../screens/auth/RegistrationScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;