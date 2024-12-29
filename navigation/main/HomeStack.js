import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeScreen";
import SchedulingStack from "./medical_activities/scheduling/SchedulingStack";
import ExercisingStack from "./medical_activities/exercises/ExercisingStack";
import NewsStack from "./entertainment/news/NewsStack";
import AudioScreen from "../../screens/main/entertainment/audio/AudioScreen";
import ChatbotScreen from "../../screens/main/assistance/chatbot/ChatbotScreen";
import EmergencyCallScreen from "../../screens/main/assistance/emergency_call/EmergencyCallScreen";
import SupportCallScreen from "../../screens/main/assistance/support_call/SupportCallScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SchedulingStack"
                component={SchedulingStack}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Audio"
                component={AudioScreen}
            />
            <Stack.Screen
                name="ExercisingStack"
                component={ExercisingStack}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="NewsStack"
                component={NewsStack}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Chatbot"
                component={ChatbotScreen}
            />
            <Stack.Screen
                name="Emergency"
                component={EmergencyCallScreen}
            />
            <Stack.Screen
                name="Support"
                component={SupportCallScreen}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;