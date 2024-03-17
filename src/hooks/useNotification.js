import { Platform } from "react-native";
import getSettings from "../config/settings";
import useConstants from "./useConstants";
import notificationManager from "../notifications/notificationManager.js";
// get the devive id
import DeviceInfo from "react-native-device-info";

export const useNotification = function () {
  const { androidChannelId } = getSettings();
  const { android_channel_desc, android_channel_title } = useConstants();
  // request for permission
  const requestPermission = async () => {
    return await notificationManager.requestPermissions();
  };

  // create channel for android
  const createChannel = async () => {
    return Platform.OS === "android"
      ? await notificationManager.createChanel(
          androidChannelId,
          android_channel_title,
          android_channel_desc,
        )
      : null;
  };

  // initialize for ios and handle local notitication taps
  const initializeForIOS = (handler = () => null) => {
    if (Platform.OS === "ios") {
      notificationManager.initializeIOS(handler);
    }
  };

  // Register the notification device to force ios
  const registerDevice = async () => {
    return await notificationManager.registerDeviceForNotification();
  };

  // get the remote push notification token from firebase
  const getRemoteToken = async (handler) => {
    const token = await notificationManager.getFCMToken(handler);
    return token;
  };
  const getDeviceId = async () => {
    try {
      const ID = await DeviceInfo.getUniqueId();
      console.log(ID, "unique device ID obtained in usenotification 48");
      return ID;
    } catch (error) {
      return false;
    }
  };

  // listen to a remote notification foreground
  const subscribeToRemoteMessage = (handler) => {
    return notificationManager.subscribeToFCM((remoteMessage) => {
      handler(remoteMessage);
    });
  };

  // handle in quit state
  const handleQuitState = (handler) => {
    return notificationManager.subscribeToInitials(handler);
  };

  // show localnotification
  const showLocalNotification = (note = {}) => {
    return notificationManager.showLocalNotification(note);
  };

  return {
    requestPermission,
    createChannel,
    initializeForIOS,
    registerDevice,
    getRemoteToken,
    subscribeToRemoteMessage,
    handleQuitState,
    showLocalNotification,
    getDeviceId,
  };
};
