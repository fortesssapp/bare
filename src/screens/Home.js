import React from "react";
import { AppHeader }                    from "../components/HOC/AppHeader";
import { SafeAreaViewWrapper }          from "../components/HOC/SafeAreaViewWrapper";
import { HomeTopTabsNavigator }         from "../components/navigation/HomeTabNavigator";

export const HomeScreen = ({ navigation, route }) => {

    return(
        <SafeAreaViewWrapper>
            <AppHeader 
                navigation={navigation} 
                route={route}
            />
            <HomeTopTabsNavigator />
        </SafeAreaViewWrapper>
    )
} 