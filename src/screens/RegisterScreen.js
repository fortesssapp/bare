import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Theme } from "../contexts/theme";
import useStyle from "../assets/style/style";
import { AppHeader } from "../components/HOC/AppHeader";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";

export const RegisterScreen = ({ navigation, route }) => {
    const { current, change} = useContext(Theme);
    const STYLES = useStyle();
    const toggleTheme = () => {
        change( (current === "light") ? "dark": "light");
    }
    const login = () => {
        navigation.navigate("LOGIN", {location: "LOGIN"});
    }
    const gotohome = () => {
        navigation.navigate("HOME", {location: "HOME"});
    }

    return(
        <SafeAreaViewWrapper>
            <AppHeader navigation={navigation} route={route}/>
            <View style={[STYLES.homeContainer]}>
                <Text style={[STYLES.HomeText, STYLES.textColor]}>Register</Text>
                <Button 
                    onPress={login} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Login to app' 
                />
                 <Button 
                    onPress={gotohome} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Back Home' 
                />
                <Button 
                    onPress={toggleTheme} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Change Theme' 
                />
            </View>
        </SafeAreaViewWrapper>
    )
} 