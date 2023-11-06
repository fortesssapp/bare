import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AiScreen }         from '../../screens/AiScreen';
import { ChatsScreen }      from '../../screens/ChatsScreen';
import { CallsScreen }      from '../../screens/CallsScreen';
import { CommunityScreen }  from '../../screens/CommunityScreen';
import { UpdatesScreen }    from '../../screens/UpdatesScreen';
import { HomeTabBar }       from './HomeTabBar';
import useStyle from '../../assets/style/style';

const Tab = createMaterialTopTabNavigator();

export const HomeTopTabsNavigator = () => {
    const styles = useStyle();
  return (
    <Tab.Navigator 
        initialRouteName='CHATS'
        tabBarPosition='top'
        tabBar={HomeTabBar}
        >
      <Tab.Screen name="Community"  component={CommunityScreen} />
      <Tab.Screen name="Chats"      component={ChatsScreen} />
      <Tab.Screen name="Updates"    component={UpdatesScreen} />
      <Tab.Screen name="AI"         component={AiScreen} />
      <Tab.Screen name="Calls"      component={CallsScreen} />
    </Tab.Navigator>
  );
}