import React, { useContext } from "react";
import { Dimensions, TouchableOpacity, Text, View } from "react-native";
import { AppIconAnimated } from "../assets/style/AppIconsAnimated";
import { Theme } from "../contexts/theme";

export const Initializing = ({ title }) => {
  const { currentTheme } = useContext(Theme);

  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        backgroundColor: currentTheme.values.defaultBackground,
      }}
    >
      <TouchableOpacity onPress={() => null}>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Text
            style={{
              color: currentTheme.values.placeholders,
              fontSize: currentTheme.values.fonts.large,
              lineHeight: 30,
              fontWeight: "600",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minWidth: 150,
            }}
          >
            <AppIconAnimated
              size={30}
              color={currentTheme.values.iconsColor}
              name="dots-horizontal"
              animate={true}
            />
            {`\n`} <Text style={{ opacity: 0.5 }}>{title}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
