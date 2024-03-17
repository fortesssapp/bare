import React, { useContext } from "react";
import { Modal, Dimensions, TouchableOpacity, Text, View } from "react-native";
import { General } from "../contexts/general";
// import { AppIcon } from "../assets/style/AppIcons";
import { AppIconAnimated } from "../assets/style/AppIconsAnimated";
import { Theme } from "../contexts/theme";

export const LoaderModal = () => {
  const { loader, toggleLoader } = useContext(General);
  const { currentTheme } = useContext(Theme);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
      visible={loader.loading}
    >
      <TouchableOpacity onPress={() => toggleLoader(false, "")}>
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
              animate={loader.loading}
            />
            {`\n`} <Text style={{ opacity: 0.5 }}>{loader.title}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
