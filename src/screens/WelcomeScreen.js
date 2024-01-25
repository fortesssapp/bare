import React, { useContext }            from "react";
import { View, Text, Image }            from "react-native";
import { Theme }                        from "../contexts/theme";
import useStyle                         from "../assets/style/style";
import { AppHeader }                    from "../components/HOC/AppHeader";
import { SafeAreaViewWrapper }          from "../components/HOC/SafeAreaViewWrapper";
import routes                           from "../helpers/routes";
import useConstants                     from "../hooks/useConstants";
import Fbutton                          from "../components/inputs/Fbutton";

export const WelcomeScreen = ({ navigation, route }) => {
    const { currentTheme, current }     = useContext(Theme);
    const STYLES                        = useStyle();
    const constants                     = useConstants();

    return(
        <SafeAreaViewWrapper>

            <AppHeader navigation={navigation} route={route} title={constants.sign_up} />

            <View style={{
                backgroundColor: current === "dark" ? currentTheme.values.currentBackground: currentTheme.values.mainColor, 
                minHeight: 100, 
                width: "100%"
                }}>
                <View style={STYLES.welcomeLogo}>
                    {
                        (current === "light") ? <>
                        <Image 
                            source={require(`../assets/fmain.png`)} 
                            style={STYLES.welcomeLogoStyle}
                        />
                        </>: <></>
                    }
                    {
                        (current === "green") ? <>
                        <Image 
                            source={require(`../assets/fgreen.png`)} 
                            style={STYLES.welcomeLogoStyle}
                        />
                        </>: <></>
                    }
                    {
                        (current !== "green" && (current !== "light")) ? <>
                        <Image 
                            source={require(`../assets/flight.png`)} 
                            style={STYLES.welcomeLogoStyle}
                        />
                        </>: <></>
                    }
                </View>
            </View>
            <View style={[STYLES.welcomeContent]}>
                <View style={{alignItems: "center", justifyContent: "center" }}>
                    <View style={STYLES.welcomeNote}>
                        <Text textBreakStrategy="highQuality" style={[STYLES.HomeText, STYLES.textColor, STYLES.welcomeNoteText]}>{constants.welcome_note}</Text>
                    </View>
                </View>
                <View>
                    <View style={[STYLES.actionsContainer, { minWidth: "100%" }]}>
                        <View style={[STYLES.actionButtonContainer, {paddingRight: 5}]}>
                            <Fbutton
                                text="Join Fortress"
                                color={currentTheme.values.mainColor}
                                onPress={() => navigation.navigate(routes.JOINCOUNTRY)}
                                onLongPress={() => null}
                                fluid
                                buttonStyle={{width: "100%"}}
                            />
                        </View>
                        <View style={[STYLES.actionButtonContainer, {paddingLeft: 5}]}>
                            <Fbutton
                                text="Sign In"
                                color={currentTheme.values.lightColor}
                                textColor={currentTheme.values.currentColor}
                                onPress={() => navigation.navigate(routes.SIGNIN)}
                                onLongPress={() => null}
                                fluid
                                buttonStyle={{width: "100%"}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaViewWrapper>
    )
} 