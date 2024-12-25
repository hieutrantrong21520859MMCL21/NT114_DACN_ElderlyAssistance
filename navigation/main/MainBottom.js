import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import HomeStack from './HomeStack';
import SettingsStack from "../settings/SettingsStack";

import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainBottom = () => {

    const getTabBarDisplayStyle = route => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

        switch (routeName) {
            case 'Chatbot': case 'NewsStack':
                return 'none';
            default:
                return 'flex';
        }
    }

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarActiveTintColor: 'blue',
                tabBarIcon: ({color}) => {
                    return (
                        <MaterialIcons
                            name={route.name === 'HomeStack' ? 'home' : 'settings'}
                            size={28}
                            color={color}
                        />
                    );
                },
                tabBarLabelStyle: {fontSize: 16}
            })}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={({route}) => ({
                    tabBarLabel: 'Home',
                    tabBarStyle: {
                        display: getTabBarDisplayStyle(route)
                    }
                })}
            />
            <Tab.Screen
                name="SettingsStack"
                component={SettingsStack}
                options={{
                    tabBarLabel: 'Settings'  
                }}
            />
        </Tab.Navigator>
    );
}

export default MainBottom;