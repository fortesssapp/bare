import React, { useContext } from 'react';
import { StatusBar as NativeStatusBar } from 'react-native';
import { Theme } from '../contexts/theme';

const StatusBar = () => {
  const { current, currentTheme } = useContext(Theme);

  // Customize the status bar style based on the selected theme
  const getStatusBarStyle = () => {
    if (current === 'dark') {
      return 'light-content'; // Use light content style for the dark theme
    } else {
      return 'dark-content'; // Use dark content style for the light theme
    }
  };

  // console.log(current, "current ", theme.values.mainColor);

  return (
    <NativeStatusBar
      barStyle={getStatusBarStyle()}
      translucent={true}
      backgroundColor={(current === "dark") ? 'transparent': currentTheme.values.mainColor}
    />
  );
};

export default StatusBar;
