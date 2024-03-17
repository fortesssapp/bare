import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "../../screens/WelcomeScreen";
import { SelectCountryScreen } from "../../screens/join/selectCountryScreen";
import { EnterPhoneNumberScreen } from "../../screens/join/EnterPhoneNumberScreen";
import { LoginScreen } from "../../screens/LoginScreen";
import { TestingScreen } from "../../screens/TestingScreen";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WELCOME"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JOIN_COUNTRY"
        component={SelectCountryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JOIN_PHONE"
        component={EnterPhoneNumberScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SIGNIN"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TEST"
        component={TestingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
