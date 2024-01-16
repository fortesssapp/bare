import React                        from 'react';
import { AppNavigationContainer }   from './src/components/HOC/AppNavigationContainer';
import { ThemeContextProvider }     from './src/contexts/themeContextProvider';
import { UserContextProvider }      from './src/contexts/userContextProvider';
import { GeneralContextProvider }   from './src/contexts/generalContextProvider';
import { MenuProvider }             from 'react-native-popup-menu';
import { SafeAreaProvider }         from 'react-native-safe-area-context';
import StatusBar                    from './src/components/StatusBar';

// import and use notification
import { useNotification }          from './src/hooks/useNotification';
import { 
  HandleNotification, 
  ManageRemoteToken 
} from './src/notifications/NotificationHandler';

const App = () => {
  const { 
    initializeForIOS,
    getRemoteToken,
    requestPermission,
    createChannel,
    registerDevice,
    subscribeToRemoteMessage,
    handleQuitState,
    getDeviceId
   } = useNotification();

   // register these to get the device id and notification token
   const [deviceId, setDeviceId] = React.useState(null);
   const [nToken, setNToken]     = React.useState(null);

  React.useEffect(() => {
    // initialize
    let subscribed = null;
    requestPermission().then( async response => {
      if(response.enabled){
        createChannel();
        registerDevice();
        initializeForIOS();
        const token = await getRemoteToken(ManageRemoteToken);
        const device = await getDeviceId();
        if(token) setNToken(token);
        if(device) setDeviceId(device);
        subscribed = subscribeToRemoteMessage(HandleNotification);
        handleQuitState(handleQuitState);
      }
    });

    return () => subscribed ? subscribed() :null;
  }, []);

  // whan any of the device and notification token changes, update the app
  React.useEffect(() => {}, [deviceId, nToken]);


  return (
   
    <SafeAreaProvider>
      <ThemeContextProvider>
        <GeneralContextProvider>
          <UserContextProvider>
            <StatusBar />
            <MenuProvider>
              <AppNavigationContainer deviceId={deviceId}  notificationToken={nToken} />
            </MenuProvider>
          </UserContextProvider>
        </GeneralContextProvider>
      </ThemeContextProvider>
    </SafeAreaProvider>
    
  );
};


export default App;

