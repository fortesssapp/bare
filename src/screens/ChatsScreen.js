import React, { useContext, useRef } from "react";
import { View, Text, Button } from "react-native";
import { Theme } from "../contexts/theme";
import { User } from "../contexts/user";
import { General } from "../contexts/general";
import useStyle from "../assets/style/style";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";
import Finput from "../components/inputs/Finput";
import Fbutton from "../components/inputs/Fbutton";
import Auth from '@react-native-firebase/auth';
import { Users } from "../models/Users";

export const ChatsScreen = ({ navigation, route }) => {
    const { current, change} = useContext(Theme);
    const { toggleLoader, showMessage } = useContext(General);
    const {auth} = useContext(User);
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


    const gotoprofile = async () => {
       try {
            Auth().signOut().then(() => console.log('User signed out!'));
            return;
            toggleLoader(true, "wait");
            const gotten = await Users.findUser("phone", "+2349034313685");
            // const createdUser = await Users.createUser({
            //     phone: "+2349034313685"
            // });
            // const updatedUser = await Users.updateUser({
            //      legs: "+4"
            // }, gotten.id);
            // try deleting
            const deleted = await Users.delete(gotten.id);

            toggleLoader(false, "");

            console.log(deleted, "what is deleted ? ");

        //navigation.navigate("PROFILE", {location: "PROFILE"});
       } catch (error) {
            console.log(error, " line 48 of teh error page");
       }
    }

    // console.log(auth, " current Auth ");

    return(
        <SafeAreaViewWrapper>
            <View style={[STYLES.homeContainer]}>
                <Text style={[STYLES.HomeText, STYLES.textColor]}> Welcome to Fortress Chat Screen </Text>
                <Finput
                    inputLabel={"Phone Number"}
                    ref={inputRef}
                    type="number"
                    leftIcon="dialpad"
                    validation={{ validNumber: true, maxLength: 50 }}
                    onValueChange={(value) => console.log('Input value:', value)}
                />
                <Fbutton
                    text="Press Me"
                    color={STYLES.mainButton.backgroundColor}
                    onPress={() => {
                        showMessage(true, "This is to confirm that the message is desirable");
                    }}
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
                    title='Go to Profile' 
                />

                <Button 
                    onPress={toggleTheme} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Change App Theme' 
                />

            </View>
        </SafeAreaViewWrapper>
    )
} 