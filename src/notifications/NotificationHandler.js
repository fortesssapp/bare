export const HandleNotification = (notification = {}) => {
  console.log(notification, "Notification body in handler");

  // determin lick on ios
  // const isClicked = notification.getData().userInteraction === 1;
  // for ios read this
  // https://github.com/react-native-push-notification/ios

  return null;
};

export const ManageRemoteToken = (token) => {
  console.log(token, " remote token obtained, save to the databse");

  return null;
};
