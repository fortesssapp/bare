import messaging            from '@react-native-firebase/messaging';
import PushNotification     from 'react-native-push-notification';
import PushNotificationIOS  from '@react-native-community/push-notification-ios';

class NotificationManager {
  // Request permission for iOS notifications
  requestPermissions = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return {
        enabled: enabled,
        status: authStatus
    }
  };

  initializeIOS = (handler) => {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification
        handler(notification);

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

       // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);
            // process the action
        },

      // IOS permissions
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      requestPermissions: false, // Permissions already requested above
    });
  };

  // create notification channels

  createChanel = async (channelID, channelName="", channelsDesc = "") => {
    return new Promise((resolve, reject) => {
        PushNotification.createChannel(
            {
              channelId: channelID, // (required)
              channelName: channelName, // (required)
              channelDescription: channelsDesc, // (optional) default: undefined.
              playSound: false, // (optional) default: true
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => resolve(created) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    });
  }

  // register device especially for ios
  registerDeviceForNotification = async () => {
    return await messaging().registerDeviceForRemoteMessages();
  }

  // Get the device token for FCM
  getFCMToken = async (handler) => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    // Save this server-side and use it to push notifications to this device
    handler(token);
    return token;
  };

  // Subscribe to FCM messages foreground
  subscribeToFCM = (onReceive) => {
    // Handle foreground messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onReceive(remoteMessage);
    });
    return unsubscribe;
  };

  // handle quit state or initial notification
  subscribeToInitials = (handler) => {
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        if (remoteMessage) {
        // Handle the initial notification
        // remoteMessage.data.type
        handler(remoteMessage);
        }
    });
  }

  // From quit state app wakes by notification click
  


  // Display a local notification
  showLocalNotification = (notification) => {
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "your-channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
        ticker: notification.ticker || undefined, // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        largeIconUrl: notification.largeIconUrl || undefined, // (optional) default: undefined
        smallIcon: notification.smallIcon ||  "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: notification.bigText || "new message", // (optional) default: "message" prop
        subText: notification.subText || "none", // (optional) default: none
        bigPictureUrl: notification.bigPictureUrl || undefined, // (optional) default: undefined
        bigLargeIcon: notification.bigLargeIcon || "ic_launcher", // (optional) default: undefined
        bigLargeIconUrl: notification.bigLargeIconUrl || undefined, // (optional) default: undefined
        color: "red", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: "some_tag", // (optional) add tag to message
        group: "group", // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        shortcutId: notification.shortcutId || undefined, // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
        
        when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      
        messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
      
        actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      
        /* iOS only properties */
        category: "", // (optional) default: empty string
        subtitle: notification.subtitle || "", // (optional) smaller title below notification title
      
        /* iOS and Android properties */
        id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        title: notification.title || "", // (optional)
        message: notification.message, // (required)
        picture: notification.picture || undefined, // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
        userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: notification.playSound || false, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        ...notification
    });
  };

  // Schedule a local notification
  scheduleLocalNotification = (notification) => {
    PushNotification.localNotificationSchedule({
      // ... Your notification configuration
      date: notification.date, // date is a Date object
      title: notification.title,
      message: notification.message,
      // ...other properties
      ...notification
    });
  };
}

const notificationManager = new NotificationManager();
export default notificationManager;
