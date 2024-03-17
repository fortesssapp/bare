import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/Home";
import { ProfileScreen } from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export const LoggedInNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HOME"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="REGISTER"
        component={ProfileScreen}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
};
