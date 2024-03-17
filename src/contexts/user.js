import React from "react";
import PropTypes from "prop-types";

export const User = React.createContext({
  info: {
    name: "",
    nick_name: "",
    phone: "",
    email: "",
    about: "",
    country: "",
    ntoken: "",
    device_id: "",
    pin: "",
    salt: "",
    uid: "",
    completed: false
  },
  auth: {
    id: "",
    is_logged_in: false,
  },
  preference: {
    theme: "light",
  },
  setInfo: () => null,
  setPreference: () => null,
  setAuth: (data) => null,
  regData: {}, // registration data
  dispatch: (obj = { type: "", value: null }) => null, // registration
});

User.Provider.propTypes = {
  value: PropTypes.shape({
    info: PropTypes.shape({
      name: PropTypes.string,
      nick_name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      about: PropTypes.string,
      country: PropTypes.string,
      ntoken: PropTypes.string,
      pin: PropTypes.string,
      salt: PropTypes.string,
      device_id: PropTypes.string,
      uid: PropTypes.string,
      completed: PropTypes.bool
    }).isRequired,
    auth: PropTypes.shape({
      id: PropTypes.string,
      is_logged_in: PropTypes.bool,
    }).isRequired,
    preference: PropTypes.shape({
      theme: PropTypes.string,
    }).isRequired,
    setInfo: PropTypes.func.isRequired,
    setPreference: PropTypes.func.isRequired,
    setAuth: PropTypes.func.isRequired,
    regData: PropTypes.object,
    dispatchRegData: PropTypes.func,
  }),
};
