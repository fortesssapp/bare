import React, { useState } from "react";
import { Theme } from "./theme";

export const ThemeContextProvider = ({ children }) => {

    const changeTheme = (type = "light") => {
        try {
            if(themes.find(t => t.name  === type)){
                setTheme(type);
                setCurrent(type);
                updateCurrentTheme(type);
            }
        } catch (error) {
            
        }
    }
    const updateCurrentTheme = (current = 'light') => {
        const theme = themes.find(t => t.name === current);
        if(theme){
            setCurrentTheme({
                ...theme
            });  
        }
    }

    const [fontFamily, setFontFamily]   = useState("Proxima Nova");
    const [current, setCurrent]         = useState("light");
    const [theme, setTheme]             = useState("light");
    const [themes, setThemes]           = useState([
        {
            name: "light", 
            values:{
            defaultColor: "#000e19",
            defaultBackground: "#e6f3ff",
            currentColor: "#000e19",
            currentBackground: "#e6f3ff",
            mainColor: "#0262b1",
            placeholders: "#555657",
            lightColor: "#81c6fe",
            iconsColor: "#81c6fe",
            danger: "#cc1a1a",
            warning: "#becb1a",
            borderColor: "#81c6fe",
            fontRegular: "ProximaNova-Regular",
            fontBold: "ProximaNova-Bold",
            fontLight: "ProximaNova-Light",
            fontSemi: "ProximaNova-SemiBold",
            fontExtra: "ProximaNova-Extrabld",
            fonts: {large: 20, medium: 16, small: 12}
        }},
        {   name: "dark",
            values:{
            defaultColor: "#e6f3ff",
            defaultBackground: "#000e19",
            currentColor: "#e6f3ff",
            currentBackground: "#000e19", 
            placeholders: "#c5c6c7",
            iconsColor: "#81c6fe",
            mainColor: "#0262b1",
            lightColor: "#81c6fe",
            danger: "#cc1a1a",
            warning: "#becb1a",
            borderColor: "#012a4c",
            fontRegular: "ProximaNova-Regular",
            fontBold: "ProximaNova-Bold",
            fontLight: "ProximaNova-Light",
            fontSemi: "ProximaNova-SemiBold",
            fontExtra: "ProximaNova-Extrabld",
            fonts: {large: 20, medium: 16, small: 12}
        }},
        {   name: "green",
            values:{
            defaultColor: "#031702",
            defaultBackground: "#faffff",
            currentColor: "#031702",
            currentBackground: "#faffff", 
            placeholders: "#5c5e5c",
            iconsColor: "#bff2ed",
            mainColor: "#0e7f74",
            lightColor: "#bff2ed",
            danger: "#cc1a1a",
            warning: "#becb1a",
            borderColor: "#bff2ed",
            fontRegular: "ProximaNova-Regular",
            fontBold: "ProximaNova-Bold",
            fontLight: "ProximaNova-Light",
            fontSemi: "ProximaNova-SemiBold",
            fontExtra: "ProximaNova-Extrabld",
            fonts: {large: 20, medium: 16, small: 12}
        }}
    ]);
    const [currentTheme, setCurrentTheme] = useState({...themes[0]});


    React.useEffect(() => {
        // check if no elements in  current theme
     },[theme]);

    return (
        <Theme.Provider value={{
            current,
            currentTheme,
            themes,
            change:changeTheme,
            fontFamily,
            setFontFamily,
            setThemes
        }}>
            {children}
        </Theme.Provider>
    )
}