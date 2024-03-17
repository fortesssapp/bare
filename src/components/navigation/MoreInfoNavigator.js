import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NickName } from "../../screens/about/NickName";
import { AboutMe } from "../../screens/about/AboutMe";
import { AppSecurity } from "../../screens/about/AppSecurity"; 
import { ProfilePhoto } from "../../screens/about/ProfilePhoto"; 

const Stack = createNativeStackNavigator();

export const MoreInfoNavigator= () => {
  return (
    <Stack.Navigator initialRouteName="NICK_NAME">
      <Stack.Screen
        name="NICK_NAME"
        component={NickName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ABOUT_ME"
        component={AboutMe}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="APP_SECURITY"
        component={AppSecurity}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="PROFILE_PHOTO"
        component={ProfilePhoto}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
