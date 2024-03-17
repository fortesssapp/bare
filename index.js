/**
 * @format
 */
import React, { useEffect } from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import useFirebase from "./src/hooks/useFirebase";

const AppEntry = () => {
  // initialize firebase check
  const { firebase } = useFirebase();

  useEffect(() => {
    (async () => {
      try {
        await firebase.appCheck().getToken(true);
      } catch (error) {
        console.log("AppCheck verification failed");
      }
    })();
  }, []);

  return <App />;
};

AppRegistry.registerComponent(appName, () => AppEntry);
