import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewsBottom from "./NewsBottom";
import NewsDetailScreen from '../../../../screens/main/entertainment/news/NewsDetailScreen';

const Stack = createNativeStackNavigator();

const NewsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="NewsBottom"
                component={NewsBottom}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NewsDetail"
                component={NewsDetailScreen}
                options={{
                    title: ''
                }}
            />
        </Stack.Navigator>
    );
}

export default NewsStack;