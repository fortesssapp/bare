import * as React               from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import { DefaultNavigator }     from '../navigation/DefaultNavigator';


export const AppNavigationContainer = ({ children }) => {
  return (
    <NavigationContainer>
     <DefaultNavigator />
     {children}
    </NavigationContainer>
  );
};