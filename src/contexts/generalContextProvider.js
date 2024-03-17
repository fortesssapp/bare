import React, { useState, useEffect } from "react";
import { General } from "./general";
import { LoaderModal } from "../components/Loader";
import { ErrorModal } from "../components/Error";
import { MessagingModal } from "../components/Messaging";
import { Vibration } from "react-native";

export const GeneralContextProvider = ({ children }) => {
  // handle loader
  const [loader, setLoader] = useState({
    loading: false,
    title: "wait..",
    stop: () => null,
  });
  const toggleLoader = (loading = false, title = "wait...") => {
    setLoader({
      ...loader,
      loading: loading,
      title: title,
    });
  };

  const MESSAGERESOLVEPERIOD = 50;

  const [message, setMessage] = useState({
    message: "",
    show: false,
    accept: () => null,
    reject: () => null,
    close: () => null,
    positive: "Confirm",
    negative: "Decline",
    showCancel: true
  });

  const closeMessage = () => {
    setMessage({ ...message, show: false });
  };

  const showMessage = (
    show = false,
    msg = "",
    accept = () => null,
    reject = () => null,
    positive = "Confirm",
    negative = "Cancel",
    showCancel = true
  ) => {
    try {
      if (show && message) {

       return new Promise((resolve, reject) => {
        setMessage({
          ...message,
          show: show,
          message: msg,
          accept,
          reject,
          positive,
          negative,
          showCancel,
          close: closeMessage,
        });

        setTimeout(() => resolve(() => {
          setMessage({
            ...message,
            show: false
          });
        }), MESSAGERESOLVEPERIOD);

       });

      } else {
        setMessage({
          ...message,
          show: false,
          message: "",
        });
        setTimeout(() => resolve(false), MESSAGERESOLVEPERIOD);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => resolve(false), MESSAGERESOLVEPERIOD);
    }
  };

  // male sure that when the loader chnages, the context reloads
  useEffect(() => {}, [loader]);
  // End handle loader

  // Start Error management
  const [error, setError] = useState("");
  const [errorShown, setErrorShown] = useState(false);
  const ERRORTIMEOUT = 6000;
  useEffect(() => {
    if (errorShown)
      setTimeout(() => {
        setErrorShown(false);
        setError("");
      }, ERRORTIMEOUT);
  }, [errorShown]);

  const showError = (show = false, err = "") => {
    if (show && err.length) {
      setError(err);
      setErrorShown(true);
      // vibrate
      Vibration.vibrate(1000);
      return;
    }
  };

  // end error management

  return (
    <General.Provider
      value={{
        loader: loader,
        toggleLoader: toggleLoader,
        error: error,
        errorShown: errorShown,
        showError: showError,
        showMessage,
        message,
      }}
    >
      {children}
      <LoaderModal />
      <ErrorModal />
      <MessagingModal />
    </General.Provider>
  );
};
