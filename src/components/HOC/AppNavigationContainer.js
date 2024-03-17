import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultNavigator } from "../navigation/DefaultNavigator";
import { AuthNavigator } from "../navigation/AuthNavigator";
import { MoreInfoNavigator } from "../navigation/MoreInfoNavigator";
import { User } from "../../contexts/user";
import Auth from "@react-native-firebase/auth";
import { Initializing } from "../Initializing";
import useConstants from "../../hooks/useConstants";
import { Users } from "../../models/Users";
import { get } from "../../utility/cache";

export const AppNavigationContainer = ({
  deviceId,
  notificationToken,
  children,
}) => {
  const { auth, setAuth, dispatch, regData } = React.useContext(User);
  const [initializing, setInitializing] = React.useState(true);
  const constants = useConstants();
  // check if we have saved data for current user
  const getSavedUserData = async () => {
    try {
      const data = await get(constants.store.user_data, false);
      if(data !== null){
        dispatch({type: "many", value: {...data}});
      }
    } catch (error) {
      console.log(error);
    }
  }

  // lets assume that the user is not logged in, was not logged in, and the user is just coming in
  // find and update user
  const findAndUpdateUser = async () => {
    try {
      if (deviceId) {
        const data = await get(constants.store.user_data, false);
        Users.findUser("device_id", deviceId).then((user) => {
          // if we have the user then update their id
          if (user) {
            const userData = user?._data;
            if (!userData) return;
            if (userData?.ntoken === notificationToken) return;
            const update = { device_id: deviceId };
            if (notificationToken) {
              update["ntoken"] = notificationToken;
            }
            Users.updateUser(update, user?.id);
            // if user data found update the regData
            //console.log("user Token updated", 51);
            dispatch({type: "many", value: {...userData}});

          }else if(data && (data?.phone)){
            
            //console.log(user?._data, (user?.id), " When data is availble abd the device ID is not found");

            Users.findUser("phone", data?.phone).then( (user) => {
              if (user) {
                const userData = user?._data;
                if (!userData) return;
                if (userData?.ntoken === notificationToken) return;
                const update = { device_id: deviceId };
                if (notificationToken) {
                  update["ntoken"] = notificationToken;
                }
                Users.updateUser(update, user?.id);
                // if user data found update the regData
                dispatch({type: "many", value: {...userData}});
              }
            });
          }
        });
      }
    } catch (error) {
      console.log(error, error.message);
    }
  };

  // listen to change in authorization
  // this control the login state of the application
  // whenever this changes, it means that the user is either loggedin or the user is logged out

  function onAuthStateChanged(user) {
    setAuth({
      id: user?.uid ? user?.uid : "",
      is_logged_in: user ? true : false,
      ...(user ? user : {}),
    });
    // if uid exists the set it up in data
    if (user?.uid) dispatch({ type: "uid", value: user?.uid });
    // stop initialization
    if (initializing) setInitializing(false);
  }

  // if token and device ID exists if they do, register them
  React.useEffect(() => {
    if (deviceId) {
      dispatch({ type: "device_id", value: deviceId });
      findAndUpdateUser();
    }
    if (notificationToken)
      dispatch({ type: "ntoken", value: notificationToken });
  }, [deviceId, notificationToken]);

  React.useEffect(() => {
    // if not reg data check this
    if(!regData){ getSavedUserData(); }

    // set onchange on auth status
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // console.log(regData, " the save reg data");

  return (
    <NavigationContainer>
      {initializing ? (
        <Initializing title={constants.initializing_text} />
      ) : (
        <>
          {auth && auth.is_logged_in && ((regData?.completed) === true) && <DefaultNavigator />}
          {auth && auth.is_logged_in && ((regData?.completed) !== true) && <MoreInfoNavigator />}
          {!auth.is_logged_in && <AuthNavigator />}
          {children}
        </>
      )}
    </NavigationContainer>
  );
};
