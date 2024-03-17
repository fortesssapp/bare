import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AiScreen } from "../../screens/AiScreen";
import { ChatsScreen } from "../../screens/ChatsScreen";
import { CallsScreen } from "../../screens/CallsScreen";
import { CommunityScreen } from "../../screens/CommunityScreen";
import { UpdatesScreen } from "../../screens/UpdatesScreen";
import { HomeTabBar } from "./HomeTabBar";

const Tab = createMaterialTopTabNavigator();

export const HomeTopTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="CHATS"
      tabBarPosition="top"
      tabBar={HomeTabBar}
    >
      <Tab.Screen name="COMMUNITY" component={CommunityScreen} />
      <Tab.Screen name="CHATS" component={ChatsScreen} />
      <Tab.Screen name="UPDATES" component={UpdatesScreen} />
      <Tab.Screen name="AI" component={AiScreen} />
      <Tab.Screen name="CALLS" component={CallsScreen} />
    </Tab.Navigator>
  );
};
