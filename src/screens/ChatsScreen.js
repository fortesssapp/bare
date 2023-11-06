import React, { useContext, useRef } from "react";
import { View, Text, Button } from "react-native";
import { Theme } from "../contexts/theme";
import useStyle from "../assets/style/style";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";
import Finput from "../components/inputs/Finput";
import Fbutton from "../components/inputs/Fbutton";

export const ChatsScreen = ({ navigation, route }) => {
    const { current, change} = useContext(Theme);
    const STYLES = useStyle();
    const inputRef      = useRef(null);

    const toggleTheme = () => {
        console.log(" anything happened ?", ((current === "light") ? "dark": "light"));
        change( (current === "light") ? "green": "dark");
    }

    const gotoregister = () => {
        navigation.navigate("REGISTER", {location: "REGISTER"});
    }

    const login = () => {
        navigation.navigate("REGISTER", {location: "REGISTER"});
    }


    const gotoprofile = () => {
        navigation.navigate("PROFILE", {location: "PROFILE"});
    }

    return(
        <SafeAreaViewWrapper>
            <View style={[STYLES.homeContainer]}>
                <Text style={[STYLES.HomeText, STYLES.textColor]}> Welcome Chat Screen </Text>
                <Finput
                    ref={inputRef}
                    type="number"
                    leftIcon="dialpad"
                    validation={{ validNumber: true, maxLength: 50 }}
                    onValueChange={(value) => console.log('Input value:', value)}
                />
                <Fbutton
                    text="Press Me"
                    color={STYLES.mainButton.backgroundColor}
                    onPress={() => console.log('Button Pressed')}
                    onLongPress={() => console.log('Button Long Pressed')}
                    fluid
                />
                <Button 
                    onPress={login} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Login to app' 
                />

                 <Button 
                    onPress={gotoregister} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Register' 
                />

                 <Button 
                    onPress={gotoprofile} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Profile' 
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