import React, { useContext, useRef } from "react";
import { View, Text, KeyboardAvoidingView, Platform }   from "react-native";
import { SafeAreaViewWrapper } from "../../components/HOC/SafeAreaViewWrapper";
import { AppHeader }    from "../../components/HOC/AppHeader";
import { Theme }        from "../../contexts/theme";
import { User }         from "../../contexts/user";
import { General }      from "../../contexts/general";
import Fselect          from "../../components/inputs/Fselect";
import Fbutton          from "../../components/inputs/Fbutton";
import routes           from "../../helpers/routes";
import useConstants     from "../../hooks/useConstants";
import useStyle         from "../../assets/style/style";
import useCountries     from "../../hooks/useCountries";


export const SelectCountryScreen = ({navigation, route}) => {
    const constants             = useConstants();
    const STYLES                = useStyle();
    const {currentTheme }       = useContext(Theme);
    const { dispatch, regData } = useContext(User);
    const { showError}          = useContext(General);
    const { getList }           = useCountries();
    const sRef                  = useRef(null);
    // manage input
    const [country, setCountry] = React.useState(null);
    const [countries, setCountries] = React.useState([]);
    const setSelectedCountry = (value) => {
        // set country
        const selected = value[0];
        const found = getList().find(c => c.title === selected);
        if(found){
            setCountry({...found});
            dispatch({type: "country", value: found});
        }
    }


    React.useEffect(() => {
        const subscribed = navigation.addListener("focus", async () => { 
            if(!countries.length){
                const list =  getList();
                if(list.length){
                    setCountries([...list]);
                }
            }
        });

        return () => subscribed();
    }, [countries]);

    handleNext = () => {
        try {
            if(!country) return showError(true,constants.errors.no_country);
            navigation.navigate(routes.JOINPHONE);
        } catch (error) {
            showError(true, error?.message);
        }
    }



    return (
      <SafeAreaViewWrapper>
        <AppHeader navigation={navigation} route={route} title={constants.select_country} />
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View style={STYLES.countryContent}>

                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <View style={STYLES.welcomeNote}>
                        <Text textBreakStrategy="highQuality" style={[STYLES.HomeText, STYLES.textColor, STYLES.welcomeNoteText]}>{constants.country_note}</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 15, width: "100%" }}>
                    <Fselect
                        containerStyle={{
                            borderRightWidth: 0,
                            borderLeftWidth: 0,
                            borderTopWidth: 0,
                        }} 
                        options={countries}
                        multiple={false}
                        validation={{required: true}}
                        name={"Select your country"}
                        rightIcon="menu-down"
                        leftIcon="flag-variant"
                        onSelect={setSelectedCountry}
                    />
                </View>
                <View>
                    <View style={{width: "100%", marginTop: 30}}>
                        <Fbutton
                            text="Continue"
                            color={currentTheme.values.mainColor}
                            onPress={handleNext}
                            onLongPress={() => console.log('Button Long Pressed')}
                            fluid
                            buttonStyle={{width: "100%"}}
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaViewWrapper>  
    )
}

