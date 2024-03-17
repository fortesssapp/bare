import { useContext } from "react";
import { StyleSheet, StatusBar, Platform, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Theme } from "../../../contexts/theme";
import useStyle from "../../../assets/style/style";

export default function useStyles() {
  // call theme here and use it
  const { currentTheme, fontFamily } = useContext(Theme);
  const styles = useStyle();
  const screenHeight = Dimensions.get("screen").height;

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: currentTheme.values.borderColor || "grey",
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: "100%",
      marginVertical: 15,
      position: "relative"
    },
    errorBorder: {
      borderColor: currentTheme.values.danger || "red",
    },
    icon: {
      marginRight: 5,
      color: currentTheme.values.iconsColor,
    },
    iconr: {
      marginLeft: "auto",
      color: currentTheme.values.iconsColor,
    },
    emojiIcons:{
      width: 24,
      height: 24,
      position: "absolute",
      zIndex: 999,
      right: 5,
      bottom: 5
    },
    inputCounter:{
      width: 80,
      height: 24,
      position: "absolute",
      zIndex: 999,
      left: 5,
      bottom: -5
    },
    statusBarHeight: {
      minHeight: useSafeAreaInsets().top,
      minWidth: "100%",
    },
    input: {
      flex: 1,
      height: 45,
      color: currentTheme.values.currentColor || "black",
      fontFamily: currentTheme.values.fontRegular || fontFamily,
      fontSize: currentTheme.values.fonts.large,
      ...styles.generalTextstyle,
    },
    fortressInput: {
      minWidth: "100%",
      minHeight: 67,
      alignContent: "center",
      lineHeight: 57,
      fontWeight: "800",
      fontSize: currentTheme.values.fonts.large,
      color: currentTheme.values.currentColor || "black",
      fontFamily: currentTheme.values.fontRegular || fontFamily,
      ...styles.generalTextstyle,
    },
    selectedContainer: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
    },
    selectedText: {
      ...styles.generalTextstyle,
      fontSize: 18,
      fontFamily: currentTheme.values.fontRegular || fontFamily,
      color: styles.textColor,
    },
    placeholders: {
      color: currentTheme.values.placeholders,
    },
    // select element animated view
    animatedView: {
      top: 120,
      backgroundColor: "#fff",
      height: screenHeight - 120, // Sets a fixed height
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      paddingHorizontal: 15,
      paddingBottom: 15,
      width: "100%",
      // Shadow for iOS
      shadowOpacity: 0.1, // Adjust opacity as needed
      shadowRadius: 5, // Adjust radius for blur
      shadowColor: "#000", // Shadow color
      shadowOffset: { width: 0, height: 2 }, // X, Y offset of shadow
      // Shadow for Android
      elevation: 5, // Adjust elevation for Android shadow
    },

    // list styles
    item: {
      padding: 15,
      margin: 5,
      borderRadius: 8,
    },
    itemTextStyle: {
      ...styles.generalTextstyle,
      color: styles.textColor,
    },
  });
}
