import React, { useContext } from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { Theme } from "../contexts/theme";
import useStyle from "../assets/style/style";
import { AppHeader } from "../components/HOC/AppHeader";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";
import routes from "../helpers/routes";
import useConstants from "../hooks/useConstants";

export const LoginScreen = ({ navigation, route }) => {
    const { current, change, currentTheme}  = useContext(Theme);
    const constants                         = useConstants();
    const STYLES                            = useStyle();
    const toggleTheme = () => {
        change( (current === "light") ? "dark": "light");
    }

    const gotoregister = () => {
        navigation.navigate("REGISTER", {location: "REGISTER"});
    }
    const gotohome = () => {
        navigation.navigate("HOME", {location: "HOME"});
    }

    return(
        <SafeAreaViewWrapper>
            <AppHeader navigation={navigation} route={route} title={"Login"}/>
            <View style={[STYLES.homeContainer, styles.registerContent]}>
                
                <View style={styles.welcomeNote}>
                    <Text style={[STYLES.HomeText, STYLES.textColor]}> {constants.welcome_note}</Text>
                </View>

                <View style={styles.registerButtonContainer}>
                    <Button 
                        onPress={() => navigation.navigate(routes.SIGNUP)} 
                        style={STYLES.mainButton} 
                        color={currentTheme.values.mainColor} 
                        title='Sign Up' 
                    />
                </View>

                <View style={STYLES.actionsContainer}>
                    <View style={STYLES.actionButtonContainer}>
                        <Button 
                            onPress={() => navigation.navigate(routes.SIGNUP)} 
                            style={STYLES.mainButton} 
                            color={currentTheme.values.mainColor} 
                            title='Sign Up' 
                        />
                    </View>
                    <View style={STYLES.actionButtonContainer}>
                        <Button 
                            onPress={() => navigation.navigate(routes.SIGNIN)} 
                            style={STYLES.mainButton} 
                            color={currentTheme.values.currentColor} 
                            title='Sign In' 
                        />
                    </View>
                </View>
            </View>
        </SafeAreaViewWrapper>
    )
} 

const styles = StyleSheet.create({
    
    registerContent: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"

    },
    registerButtonContainer: {
        marginBottom: 30
    }
    
});