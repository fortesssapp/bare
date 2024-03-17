import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useStyle from "./style";

export const AppIconAnimated = ({
  name = "home-account",
  size = 30,
  color = "",
  style = {},
  animate = false,
}) => {
  const STYLES = useStyle();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity
  const translateX = useRef(new Animated.Value(0)).current; // Initial translateX value

  useEffect(() => {
    if (animate) {
      // Start the fade and translate animation
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 150, // Adjust for desired movement distance
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    } else {
      fadeAnim.setValue(0);
      translateX.setValue(0);
    }
  }, [animate, fadeAnim, translateX]);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX }] }}>
      <Icon
        style={{ ...style }}
        name={name}
        size={size}
        color={color ? color : STYLES.iconsColor}
      />
    </Animated.View>
  );
};
