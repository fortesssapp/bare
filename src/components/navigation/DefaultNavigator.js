import {createNativeStackNavigator}     from '@react-navigation/native-stack';
import { HomeScreen }                   from '../../screens/Home';
import { ProfileScreen }                from '../../screens/ProfileScreen';
import { TestingScreen }                from '../../screens/TestingScreen';


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
                name="TEST" 
                component={TestingScreen} 
                options={{ headerShown: false }}
            />
      </Stack.Navigator>
    )
}