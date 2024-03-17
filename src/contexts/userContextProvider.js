import React, { useState, useReducer } from "react";
import { User } from "./user";
import useReducers from "../hooks/useReducers";

export const UserContextProvider = ({ children }) => {
  const [info, setInfo] = useState({}); 
  const [auth, setAuth] = useState({ id: "", is_logged_in: false });
  const [preference, setPreference] = useState({});
  
  // start registration data
  const { registrationReducer } = useReducers();
  const regDataInitial = {
    country: null,
    phone: null,
    about: null,
    name: null,
    nick_name: null,
    email: null,
    pin: null,
    salt: null,
    ntoken: null,
    device_id: null,
    uid: null,
    completed: false
  };
  const [state, dispatch] = useReducer(registrationReducer, regDataInitial);

  // when auth changes, reload the app
  React.useEffect(() => {}, [auth]);

  // end registration data
  const setinfo = (data = {}) => {
    setInfo({ ...info, data });
  };

  const setauth = (data = {}) => {
    setAuth({ ...auth, ...data });
  };
  const setpreference = (data = {}) => {
    setPreference({ ...preference, ...data });
  };

  return (
    <User.Provider
      value={{
        info,
        auth,
        preference,
        setAuth: setauth,
        setInfo: setinfo,
        setPreference: setpreference,
        regData: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </User.Provider>
  );
};
