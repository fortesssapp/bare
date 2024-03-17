import React from "react";
import PropTypes from "prop-types";

export const Theme = React.createContext({
  current: "light",
  currentTheme: {
    name: "light",
    values: {
      defaultColor: "#000e19",
      defaultBackground: "#e6f3ff",
      currentColor: "#000e19",
      currentBackground: "#e6f3ff",
      mainColor: "#0262b1",
      placeholders: "#555657",
      lightColor: "#81c6fe",
      iconsColor: "#81c6fe",
      danger: "#cc1a1a",
      warning: "#becb1a",
      borderColor: "#81c6fe",
      fontRegular: "ProximaNova-Regular",
      fontBold: "ProximaNova-Bold",
      fontLight: "ProximaNova-Light",
      fontSemi: "ProximaNova-SemiBold",
      fontExtra: "ProximaNova-Extrabld",
      fonts: { large: 20, medium: 16, small: 12 },
    },
  },
  themes: [],
  change: () => null,
  fontFamily: "",
  setFontFamily: () => null,
  setThemes: () => null,
});

Theme.Provider.propTypes = {
  value: PropTypes.shape({
    current: PropTypes.oneOf(["light", "dark", "green"]).isRequired,
    currentTheme: PropTypes.shape({
      name: PropTypes.oneOf(["light", "dark", "green"]).isRequired,
      values: PropTypes.shape({
        defaultColor: PropTypes.string.isRequired,
        defaultBackground: PropTypes.string.isRequired,
        currentColor: PropTypes.string.isRequired,
        currentBackground: PropTypes.string.isRequired,
        mainColor: PropTypes.string.isRequired,
        placeholdes: PropTypes.string,
        lightColor: PropTypes.string.isRequired,
        iconsColor: PropTypes.string.isRequired,
        danger: PropTypes.string.isRequired,
        warning: PropTypes.string.isRequired,
        borderColor: PropTypes.string.isRequired,
        fontRegular: PropTypes.string.isRequired,
        fontBold: PropTypes.string.isRequired,
        fontLight: PropTypes.string.isRequired,
        fontSemi: PropTypes.string.isRequired,
        fontExtra: PropTypes.string.isRequired,
        fonts: PropTypes.shape({
          small: PropTypes.number,
          medium: PropTypes.number,
          large: PropTypes.number,
        }),
      }).isRequired,
    }).isRequired,
    themes: PropTypes.array.isRequired,
    change: PropTypes.func.isRequired,
    fontFamily: PropTypes.string.isRequired,
    setFontFamily: PropTypes.func.isRequired,
    setThemes: PropTypes.func.isRequired,
  }),
};
