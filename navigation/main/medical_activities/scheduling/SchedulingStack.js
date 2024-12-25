import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SchedulingMedicineScreen from "../../../../screens/main/medical_activities/scheduling/SchedulingMedicineScreen";
import AddingMedicineScreen from "../../../../screens/main/medical_activities/scheduling/AddingMedicineScreen";

const Stack = createNativeStackNavigator();

export default function SchedulingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SchedulingMedicine"
                component={SchedulingMedicineScreen}
                options={{
                    title: 'Schedule'
                }}
            />
            <Stack.Screen
                name="AddingMedicine"
                component={AddingMedicineScreen}
                options={{
                    title: 'Add new medicine'
                }}
            />
        </Stack.Navigator>
    );
}