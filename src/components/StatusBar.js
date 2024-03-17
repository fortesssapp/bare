import React, { useContext } from "react";
import { StatusBar as NativeStatusBar, SafeAreaView, View } from "react-native";
import { Theme } from "../contexts/theme";
import useStyles from "./inputs/styles/Fstyles";

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  const { statusBarHeight } = useStyles();
  return (
    <View style={[statusBarHeight, { backgroundColor }]}>
      <NativeStatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
};

const StatusBar = () => {
  const { current, currentTheme } = useContext(Theme);
  return (
    <CustomStatusBar
      hidden={false}
      animated={true}
      barStyle={"light-content"}
      translucent={true}
      backgroundColor={
        current === "dark"
          ? currentTheme.values.defaultBackground
          : currentTheme.values.mainColor
      }
    />
  );
};

export default StatusBar;
