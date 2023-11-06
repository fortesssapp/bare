import { useContext } from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { Theme } from "../../contexts/theme";


export default function useStyle(){
    const { current, currentTheme, fontFamily } = useContext(Theme);
    
    
    // define rules for adding styles
    // if the background is light, use main colors
    // if the background is not, use light colors

    return StyleSheet.create({
        mainContainer: {
            backgroundColor: currentTheme.values.currentBackground,
            flex: 1,
            minHeight: Dimensions.get("window").height,
            height: "100%",
            padding: 15
        },
        mainContainerSafeArea: {
            backgroundColor: currentTheme.values.currentBackground,
            flex: 1,
            minHeight: Dimensions.get("window").height
        },
        frame: {
            flex: 1
        },
        textColor: {
            color: currentTheme.values.currentColor
        },
        logoTextStyle: {
            fontFamily: fontFamily,
            fontWeight: "900",
            fontSize: 28,
            color: currentTheme.values.lightColor
        },
        generalTextstyle: {
            fontSize: 18,
            fontWeight: "600"
        },
        iconsColor: currentTheme.values.iconsColor,
        mainButton:{
            width: "100%",
            borderRadius: 16,
            backgroundColor: currentTheme.values.mainColor,
            padding: 15,
            fontFamily: currentTheme.values.fontLight,
            textTransform: "capitalize",
            minHeight: 40
        },
        homeContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: Dimensions.get("window").height,
            height: "100%",
            paddingHorizontal: 15
          },
        HomeText: {
            fontSize: 28,
            fontWeight: 'bold',
            fontFamily: fontFamily
        },
        appNavContainer:{
            flex: 1,
            minWidth: "100%",
            minHeight: 57,
            maxHeight: 57,
            paddingHorizontal: 10,
            marginTop: StatusBar.currentHeight,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: (current !== "dark")? currentTheme.values.mainColor: currentTheme.values.defaultBackground
        },
        appHomeTapStyle: {
            minWidth: "100%",
            minHeight: 50,
            maxHeight: 50,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            backgroundColor: (current !== "dark")? currentTheme.values.mainColor: currentTheme.values.defaultBackground
        },
        homeNavContainer:{
            flex: 1,
            minWidth: "100%",
            minHeight: 47,
            maxHeight: 47,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        navIconsSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            minWidth: "50%"
        }
    });
}
