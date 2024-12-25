import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExercisesScreen from "../../../../screens/main/medical_activities/exercises/ExercisesScreen";
import ExercisesDetailsScreen from "../../../../screens/main/medical_activities/exercises/ExercisesDetailsScreen";

const Stack = createNativeStackNavigator();

const ExercisingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Exercises"
                component={ExercisesScreen}
                options={{
                    title: 'Exercises List'
                }}
            />
            <Stack.Screen
                name="ExercisesDetails"
                component={ExercisesDetailsScreen}
            />
        </Stack.Navigator>
    );
}

export default ExercisingStack;