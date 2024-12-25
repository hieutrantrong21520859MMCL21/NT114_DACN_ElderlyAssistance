import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import NewsHomeScreen from '../../../../screens/main/entertainment/news/NewsHomeScreen';
import NewsCategoriesScreen from "../../../../screens/main/entertainment/news/NewsCategoriesScreen";
import NewsExitScreen from "../../../../screens/main/entertainment/news/NewsExitScreen";

const Tab = createBottomTabNavigator();

const NewsBottom = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerTitleStyle: {fontSize: 24, fontWeight: 'bold'},
                tabBarLabelStyle: {fontSize: 16},
                tabBarActiveTintColor: 'blue',
                tabBarIcon: ({color}) => (
                    route.name === 'NewsHome' ?
                    (
                        <Entypo
                            name="news"
                            size={28}
                            color={color}
                        />
                    ) :
                    (
                        route.name === 'NewsCategories' ?
                        (
                            <FontAwesome5
                                name="compass"
                                size={28}
                                color={color}
                            />
                        ) :
                        (
                            <MaterialCommunityIcons
                                name="logout"
                                size={28}
                                color={color}
                            />
                        )
                    )
                ),
                tabBarHideOnKeyboard: true
            })}
        >
            <Tab.Screen
                name="NewsHome"
                component={NewsHomeScreen}
                options={{
                    title: 'News',
                    tabBarLabel: 'Latest'
                }}
            />
            <Tab.Screen
                name="NewsCategories"
                component={NewsCategoriesScreen}
                options={{
                    title: 'Discover',
                    tabBarLabel: 'Discover'
                }}
            />
            <Tab.Screen
                name="NewsExit"
                component={NewsExitScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Exit',
                    tabBarStyle: {display: 'none'}
                }}
            />
        </Tab.Navigator>
    );
}

export default NewsBottom;