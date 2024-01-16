import React        from "react";
import useStyle     from "./style";
import Icon         from "react-native-vector-icons/MaterialCommunityIcons";

export const AppIcon = ({
 name="home-account",
 size=30,
 color="",
 style={}
}) => {
const STYLES = useStyle();
return (
    <Icon 
        name={name} 
        size={size} 
        color={color?color:STYLES.iconsColor}
        style={{...style}} 
    />
    )
}