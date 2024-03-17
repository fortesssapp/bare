import React, { useRef, useEffect, useContext } from "react";
import { View, Animated, StyleSheet, Text, Dimensions } from "react-native";
import { Theme } from "../../contexts/theme";

export const ErrorView = ({ error, topPadding = 60, animate = false }) => {
  const slideAnim = useRef(new Animated.Value(-157)).current; // Start off-screen
  const { currentTheme, fontFamily } = useContext(Theme);

  useEffect(() => {
    if (animate) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [animate, slideAnim]);

  return (
    <Animated.View
      style={[styles.slidingView, { transform: [{ translateY: slideAnim }] }]}
    >
      <View
        style={{
          flex: 1,
          paddingVertical: 15,
          paddingTop: topPadding,
          paddingHorizontal: 15,
          width: Dimensions.get("window").width,
          height: 157,
          alignItems: "center",
          justifyContent: "flex-start",
          alignContent: "center",
          backgroundColor: "rgba(235, 64, 52, 1)",
          position: "absolute",
          zIndex: 9999,
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Text
          numberOfLines={3}
          textBreakStrategy="balanced"
          style={{
            fontFamily: fontFamily,
            color: "#fff",
            fontSize: currentTheme.values.fonts.medium,
            lineHeight: 16,
            fontWeight: "400",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          {error}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slidingView: {
    height: 157, // Set the height of the view
    backgroundColor: "transparent", // Just for visibility
    // Add other styling as needed
    width: "100%",
    position: "relative",
  },
});
