import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../../screens/settings/SettingsScreen";
import ChangingPasswordScreen from "../../screens/settings/ChangingPasswordScreen";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: {fontSize: 24, fontWeight: 'bold'}
            }}
        >
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
            />
            <Stack.Screen
                name="ChangingPassword"
                component={ChangingPasswordScreen}
                options={{
                    title: 'Change password'
                }}
            />
        </Stack.Navigator>
    );
}

export default SettingsStack;