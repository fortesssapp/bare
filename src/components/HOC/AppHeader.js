import React, { useRef, useMemo }    from "react";
import { View, Text, TouchableOpacity }       from "react-native";
import useStyle             from "../../assets/style/style";
import { AppIcon }          from "../../assets/style/AppIcons";
import useNavigator         from "../../hooks/useNavigator";
import { HomeMenu }         from "../../layouts/menus/homeMenu";

// navigations
import { HomeNavHeader }    from "../../layouts/menus/homeNav";
import { DefaultNavHeader } from "../../layouts/menus/defaultNav";


export const AppHeader = ({ title, route, navigation }) => {
    const { currentRouteName } = useNavigator();
    const STYLES        = useStyle();
    const menuRef       = useRef();

    
    const DefaultContents = () => {
        return (<DefaultNavHeader title={title} />)
    }
    
    
    const printContents  = useMemo(() => {
        switch(currentRouteName){
            case "HOME":
                return <HomeNavHeader />
            default:
                return <DefaultContents />

        }
    }, [currentRouteName]);

    // define different headers differentiated by which route the user is on including search
    return (
        <View style={STYLES.appNavContainer}>
          {printContents} 
        </View>
    )
}
