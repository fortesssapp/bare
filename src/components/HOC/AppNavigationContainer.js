import * as React               from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import { DefaultNavigator }     from '../navigation/DefaultNavigator';
import { AuthNavigator }        from '../navigation/AuthNavigator';
import { User }                 from '../../contexts/user';
import Auth                     from '@react-native-firebase/auth';
import { Initializing }         from '../Initializing';
import useConstants             from '../../hooks/useConstants';
import { Users }                from '../../models/Users';

export const AppNavigationContainer = ({ deviceId, notificationToken, children }) => {
  const { auth, setAuth, dispatch }     = React.useContext(User);
  const [initializing, setInitializing] = React.useState(true);
  const constants                       = useConstants();

  // lets assume that the user is not logged in, was not logged in, and the user is just coming in
  // find and update user
  const findAndUpdateUser = async () => {
    try {
        if(deviceId){
          Users.findUser('device_id', deviceId).then( user => {
            // if we have the user then update their id
            if(user){
              const userData = user._data;
              if(!userData) return;
              if((userData?.ntoken === notificationToken)) return;
              const update = {device_id: deviceId};
              if(notificationToken){ update['ntoken'] = notificationToken}
              Users.updateUser(update, user?.id)
            }
          });
        }
    } catch (error) {
      console.log(error, error.message);
    }
  }

  // listen to change in authorization
  // this control the login state of the application
  // whenever this changes, it means that the user is either loggedin or the user is logged out
  
  function onAuthStateChanged(user) {
    setAuth({id: (user?.uid)?(user?.uid): "", is_logged_in: (user? true: false), ...(user?user: {}) });
    // if uid exists the set it up in data
    if((user?.uid)) dispatch({type: "uid", value: user?.uid});
    // stop initialization
    if(initializing) setInitializing(false);
  }

  // if token and device ID exists if they do, register them
  React.useEffect(() => {
    if(deviceId) {
      dispatch({type: "device_id", value: deviceId});
      findAndUpdateUser();
    }
    if(notificationToken) dispatch({type: "ntoken", value: notificationToken});
  }, [deviceId, notificationToken]);

  React. useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <NavigationContainer>
      {
      initializing? 
      <Initializing title={constants.initializing_text} /> : 
      <>
      {(auth && auth.is_logged_in)&&<DefaultNavigator/>}
      {!(auth.is_logged_in)&&<AuthNavigator />}
      {children}
      </>
      }
    </NavigationContainer>
  );
};