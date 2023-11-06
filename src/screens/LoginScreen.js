import React, { useContext } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { Theme } from "../contexts/theme";
import useStyle from "../assets/style/style";
import { AppHeader } from "../components/HOC/AppHeader";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";

export const LoginScreen = ({ navigation, route }) => {
    const { current, change} = useContext(Theme);
    const STYLES = useStyle();
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
            <AppHeader navigation={navigation} route={route}/>
            <View style={[STYLES.homeContainer]}>
                <Text style={[STYLES.HomeText, STYLES.textColor]}> Login Screen </Text>
                <Button 
                    onPress={gotoregister} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Register' 
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