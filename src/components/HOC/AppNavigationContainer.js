import * as React               from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import { DefaultNavigator }     from '../navigation/DefaultNavigator';
import { AuthNavigator }        from '../navigation/AuthNavigator';
import { User }                 from '../../contexts/user';
import Auth                     from '@react-native-firebase/auth';

export const AppNavigationContainer = ({ deviceId, notificationToken, children }) => {
  const { auth, setAuth, dispatch } = React.useContext(User);

  // listen to change in authorization
  // this control the login state of the application
  // whenever this changes, it means that the user is either loggedin or the user is logged out
  
  function onAuthStateChanged(user) {
    setAuth({id: (user?.uid)?(user?.uid): "", is_logged_in: (user? true: false), ...(user?user: {}) });
    // if uid exists the set it up in data
    if((user?.uid)) dispatch({type: "uid", value: user?.uid});
  }

  // if token and device ID exists if they do, register them
  React.useEffect(() => {
    if(deviceId) dispatch({type: "device_id", value: deviceId});
    if(notificationToken) dispatch({type: "ntoken", value: notificationToken});
  }, [deviceId, notificationToken]);

  React. useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <NavigationContainer>
     {(auth && auth.is_logged_in)&&<DefaultNavigator/>}
     {!(auth.is_logged_in)&&<AuthNavigator />}
     {children}
    </NavigationContainer>
  );
};