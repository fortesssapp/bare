import React from "react";
import PropTypes from "prop-types";

export const General = React.createContext({
    loader: {
        loading: false,
        title: "wait",
        stop: () => null
    },
    toggleLoader: (loading = false, title = "") => null,
    error: "",
    showError: (show, error) => null,
    errorShown: false
});

General.Provider.propTypes = {
    value: PropTypes.shape({
        loader: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            title: PropTypes.string.isRequired,
            stop: PropTypes.func
        }),
        toggleLoader: PropTypes.func.isRequired,
        error: PropTypes.string,
        showError: PropTypes.func,
        errorShown: PropTypes.bool
    })
}