import React, { useContext } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { Theme } from "../contexts/theme";
import { General } from "../contexts/general";
import useStyle from "../assets/style/style";
import { AppHeader } from "../components/HOC/AppHeader";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";
import Fselect from "../components/inputs/Fselect";

export const TestingScreen = ({ navigation, route }) => {
    const { current, change} = useContext(Theme);
    const { toggleLoader, showError } = useContext(General);
    const [select, setSelect] = React.useState([]);
    const STYLES = useStyle();
    const inputRef = React.useRef();
    const toggleTheme = () => {
        change( (current === "light") ? "dark": "light");
    }

    const gotoregister = () => {
        //toggleLoader(true, "wait...");
        showError(true, "invalid input");
        //navigation.navigate("REGISTER", {location: "SIGNUP"});
    }
    const gotowelcome = () => {
        // navigation.navigate("WELCOME", {location: "WELCOME"});
        navigation.navigate("WELCOME", {location: "WELCOME"});
    }
    const gotohome = () => {
        navigation.navigate("HOME", {location: "HOME"});
    }
    React.useEffect(() => {
        console.log("Seleted items", select);
    }, [select]);

    return(
        <SafeAreaViewWrapper>
            <AppHeader navigation={navigation} route={route} title={"Testing Screen"}/>
            <View style={[STYLES.homeContainer]}>
                <Text style={[STYLES.HomeText, STYLES.textColor]}> Testing screen </Text>
                <Fselect 
                    options={[{title: "Abuja", value: "FCT", id: 1}, {title: "Taraba", value: "Jalingo", id: 2}, {title: "Rivers", value: "Port", id: 3}]}
                    multiple={true}
                    validation={{required: true}}
                    name={"Select Capital"}
                    rightIcon="menu-down"
                    leftIcon="office-building"
                    onSelect={setSelect}
                />

                <Button 
                    onPress={gotoregister} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Test Function' 
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
                 <Button 
                    onPress={gotowelcome} 
                    style={STYLES.mainButton} 
                    color={STYLES.mainButton.backgroundColor} 
                    title='Start Reg' 
                />
            </View>
        </SafeAreaViewWrapper>
    )
} 