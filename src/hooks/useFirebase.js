// start app check configuration
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/app-check';


export default function useFirebase(){

    // Custom provider setup
    const rnfbProvider = firebase.appCheck().newReactNativeFirebaseAppCheckProvider();
    rnfbProvider.configure({
        android: {
            provider: __DEV__ ? 'debug' : 'playIntegrity',
            debugToken: 'ABAFB507-E141-41CB-8440-1815014D9D23',
        },
        apple: {
            provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
            debugToken: '924F8CBD-2DD3-469D-AFB7-B6B2EB59683E',
        },
        web: {
            provider: 'reCaptchaV3',
            siteKey: 'your-recaptcha-site-key',
        },
    });


    firebase.appCheck().initializeAppCheck({ provider: rnfbProvider, isTokenAutoRefreshEnabled: true });

    return {
        firebase
    };

}