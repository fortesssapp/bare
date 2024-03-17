import React from "react";
import PropTypes from "prop-types";

export const General = React.createContext({
  loader: {
    loading: false,
    title: "wait",
    stop: () => null,
  },
  toggleLoader: (loading = false, title = "") => null,
  message: {
    message: "",
    show: false,
    positive: "Confirm",
    negative: "Cancel",
    showCancel: true,
    accept: () => null,
    reject: () => null,
    close: () => null,
  },
  showMessage: (show = false, message = "", accept = null, reject = null, positive = "Confirm", negative = "Cancel", showCancel = true) =>
    null,
  error: "",
  showError: (show, error) => null,
  errorShown: false,
});

General.Provider.propTypes = {
  value: PropTypes.shape({
    loader: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      stop: PropTypes.func,
    }),
    message: PropTypes.shape({
      message: PropTypes.string.isRequired,
      show: PropTypes.bool,
      accept: PropTypes.func,
      reject: PropTypes.func,
      close: PropTypes.func,
      positive: PropTypes.string,
      negative: PropTypes.string,
      showCancel: PropTypes.bool
    }),
    toggleLoader: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    error: PropTypes.string,
    showError: PropTypes.func,
    errorShown: PropTypes.bool,
  }),
};
