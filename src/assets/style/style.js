import { useContext } from "react";
import { StyleSheet, Dimensions } from "react-native";
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
            flex: 1,
            position: "relative"
        },
        textColor: {
            color: currentTheme.values.currentColor,
            fontFamily: fontFamily
        },
        routeTitleText: {
            fontSize: currentTheme.values.fonts.large,
            lineHeight: 34,
            color: currentTheme.values.lightColor,
            fontFamily: fontFamily,
            fontWeight: "600"
        },
        logoTextStyle: {
            fontFamily: fontFamily,
            fontWeight: "900",
            fontSize: 28,
            color: currentTheme.values.lightColor
        },
        generalTextstyle: {
            fontSize: 18,
            fontWeight: "600",
            fontFamily: currentTheme.values.fontRegular
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
            width: "100%",
            minHeight: 57,
            maxHeight: 57,
            paddingHorizontal: 10,
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
            alignItems: "center", // change
            justifyContent: "space-between"
        },
        defaultNavContainer:{
            flex: 1,
            minWidth: "100%",
            minHeight: 47,
            maxHeight: 47,
            flexDirection: "row",
            alignItems: "center", // change
            justifyContent: "space-between"
        },
        navIconsSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            flex: 1,
            //minWidth: "50%"
        },
        navIconsSectionDefault: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 15,
            flex: 1,
            //minWidth: "50%"
        },
        horizontalDisplay: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center"
        },
        iconWithTitle: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center"
        },
        /*weolcome screen*/
        actionsContainer: {
            flexDirection: "row",
            alignItems: "center"
        },
        welcomeContent: {
            justifyContent: "space-around",
            flex: 1,
            paddingHorizontal: 15
        },
        actionButtonContainer:{
            width: "50%"
        },
        welcomeNote: {
            paddingHorizontal: 30,
            marginBottom: 30
        },
        welcomeNoteText:{
            fontSize: currentTheme.values.fonts.large,
            color: currentTheme.values.mainColor,
            textAlign: "center"
        },
        welcomeLogo: {
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: 100,
            position: "relative"
        },
        welcomeLogoStyle: {
            maxHeight: 90,
            maxWidth: 90,
            borderRadius: 100,
            position: "absolute",
            left: "auto",
            right: "auto",
            top: 50
        },
        /** Welcome screen ends**/
        /**  country
         * 
         * shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
         * 
         *  **/
        countryContent: {
            justifyContent: "space-around",
            flex: 1,
            paddingHorizontal: 15,
            flexDirection: "column"
        },
    });
}
