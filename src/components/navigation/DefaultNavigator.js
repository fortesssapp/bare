import {createNativeStackNavigator}     from '@react-navigation/native-stack';
import { RegisterScreen }               from '../../screens/RegisterScreen';
import { LoginScreen }                  from '../../screens/LoginScreen';
import { HomeScreen }                   from '../../screens/Home';
import { ProfileScreen }                from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export const DefaultNavigator = () => {
    return (
        <Stack.Navigator>
             <Stack.Screen
                name="HOME"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="PROFILE" 
                component={ProfileScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="REGISTER"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="LOGIN" 
                component={LoginScreen} 
                options={{ headerShown: false }}
            />
      </Stack.Navigator>
    )
}