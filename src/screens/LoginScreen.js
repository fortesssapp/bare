import React, { useContext, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";
import { AppHeader } from "../components/HOC/AppHeader";
import { Theme } from "../contexts/theme";
import { User } from "../contexts/user";
import { General } from "../contexts/general";
import { getFullPhoneNumber } from "../helpers/helpers";
import { Users } from "../models/Users";
import Fselect from "../components/inputs/Fselect";
import Finput from "../components/inputs/Finput";
import Fbutton from "../components/inputs/Fbutton";
import useConstants from "../hooks/useConstants";
import useCountries from "../hooks/useCountries";
import useStyle from "../assets/style/style";
import Auth from "@react-native-firebase/auth";
import { store } from "../utility/cache";

export const LoginScreen = ({ navigation, route }) => {
  const constants = useConstants();
  const STYLES = useStyle();
  const { currentTheme } = useContext(Theme);
  const { regData, dispatch } = useContext(User);
  const { showError, toggleLoader } = useContext(General);
  const { getList } = useCountries();

  // manage input
  const [countries, setCountries] = React.useState([]);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState([]);
  const inputRef = React.useRef();
  const verifyInputRef = React.useRef();
  const [codeSent, setCodeSent] = React.useState(null);
  const [parsed, setParsed] = React.useState();
  const [userData, setUserData] = React.useState(null);

  // set selected country
  const setSelectedCountry = (value) => {
    // set country
    const selected = value[0];
    const found = getList().find((c) => c.title === selected);
    if (found) {
      dispatch({ type: "country", value: found });
    }
  };

  const setEnteredPhone = (value) => {
    // set country
    //console.log(value);
    setPhone(value);
    //console.log(countries.find(c => c.title === value));
    const m = getFullPhoneNumber(value);
    setParsed(m ? m : "");
  };

  const setEnteredCode = (value) => {
    // set country
    setCode(value);
  };
  // if sent code is updated, reload component
  useEffect(() => {
    const subscribed = navigation.addListener("focus", () => {
      // try autofocusing
      if ((inputRef?.current) && (typeof inputRef?.current?.focus) === "function"){
        inputRef.current?.focus();
      }

      if (!countries.length) {
        const list = getList();
        if (list.length) {
          setCountries([...list]);
        }
      }
    });

    return () => subscribed();
  }, [codeSent, countries]);

  /*
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
    }, [countries]); */
  const confirmPhone = async () => {
    try {

      const country = regData?.country;
      if (!country || country === undefined) {
        return showError(true, constants.errors.country_first);
      }
      const fullPhone = getFullPhoneNumber(phone, country.iso_code);
      // console.log(fullPhone, "The passed phone number");
      if (fullPhone) {
        // check if phone already exists
        // If phone already exists ask if user wants to recover
        toggleLoader(true, "finding user");
        const findUser = await Users.findUser("phone", fullPhone);
        toggleLoader(false);

        console.log(findUser?._data?._id, " User ID from login");

        if (!findUser || findUser == undefined) {
          showError(true, constants.errors.user_not_found);
          toggleLoader(false);
          return;
        }

        // Do Authentication
        toggleLoader(true, "logging");

        const confirmation = await Auth().signInWithPhoneNumber(
          fullPhone,
          true,
        );
        

        if (!confirmation) {
          toggleLoader(false);
          showError(true, constants.errors.code_not_sent);
          return;
        }

        toggleLoader(false);
        setCodeSent(confirmation);
        if(findUser && (findUser?._data)){
          setUserData({...findUser?._data});
        }

        if (
          inputRef.current && 
          ((typeof inputRef.current?.clear) === "function")
          ) {
            inputRef.current?.clear();
          }
        if (
          verifyInputRef.current && 
          ((typeof verifyInputRef?.current?.clear) === "function")
          ) {
            verifyInputRef?.current?.clear();
          }
      }
      if (!fullPhone) {
        showError(true, constants.errors.phone_entry_error);
      }
    } catch (error) {
      toggleLoader(false);
      showError(true, error.message);
      console.log(error, "Login error for auth");
    }
  };

  const confirmToken = async () => {
    try {
      const country = regData?.country;
      toggleLoader(true, "checking");
      if (!country || country === undefined) {
        toggleLoader(false);
        return showError(true, constants.errors.country_first);
      }
      const fullPhone = getFullPhoneNumber(phone, country.iso_code);
      // if the verification is duccessful
      // set codeSent to try for verification
      if (!code || code.length !== 6) {
        toggleLoader(false);
        showError(true, constants.errors.invalid_code);
        return;
      }

      if (!codeSent) {
        toggleLoader(false);
        showError(true, constants.errors.code_null);
        setCodeSent(null);
        return;
      }

      const confirmed = await codeSent.confirm(code);
      toggleLoader(false);
      if (confirmed) {
        dispatch({ type: "phone", value: fullPhone });
        if(userData !== null) dispatch({ type: "many", value: {phone: fullPhone,...(userData)} });
        if(userData !== null) store(constants.store.user_data, {phone: fullPhone,...(userData)});
      }

      if (!confirmed) {
        toggleLoader(false);
        showError(true, constants.errors.confirmation_made);
      }
    } catch (error) {
      toggleLoader(false);
      showError(true, error.message);
    }
  };

  // console.log(regData);

  return (
    <SafeAreaViewWrapper>
      <AppHeader
        navigation={navigation}
        route={route}
        title={codeSent ? constants.enter_phone_code : constants.account_exists}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={STYLES.countryContent}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={STYLES.welcomeNote}>
              <Text
                textBreakStrategy="highQuality"
                style={[
                  STYLES.HomeText,
                  STYLES.textColor,
                  STYLES.welcomeNoteText,
                ]}
              >
                {codeSent
                  ? constants.enter_phone_code_note
                  : constants.login_with_phone}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 15, width: "100%" }}>
            {codeSent ? (
              <>
                <Finput
                  style={{
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                  inputStyle={{
                    fontWeight: "400",
                  }}
                  inputLabel={constants.enter_code_input}
                  ref={inputRef}
                  type="number"
                  leftIcon="focus-field-horizontal"
                  secure={true}
                  validation={{ validNumber: true, maxLength: 6 }}
                  onValueChange={(value) => setEnteredCode(value)}
                />
              </>
            ) : (
              <>
                <Fselect
                  containerStyle={{
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                  options={countries}
                  multiple={false}
                  validation={{ required: true }}
                  name={"Select your country"}
                  rightIcon="menu-down"
                  leftIcon="flag-variant"
                  onSelect={setSelectedCountry}
                />
                <Finput
                  style={{
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                  inputLabel={"Enter your phone number"}
                  ref={verifyInputRef}
                  type="number"
                  leftIcon="dialpad"
                  validation={{ validNumber: true, maxLength: 16 }}
                  onValueChange={(value) => setEnteredPhone(value)}
                />
                <Text
                  style={{
                    fontFamily: currentTheme.values.fontBold,
                    fontSize: currentTheme.values.fonts.large,
                    color: STYLES.textColor.color,
                    paddingLeft: 30,
                  }}
                >
                  {parsed ? parsed : ""}
                </Text>
              </>
            )}
          </View>
          <View>
            <View style={{ width: "100%", marginTop: 30 }}>
              {codeSent ? (
                <>
                  <Fbutton
                    text="Continue"
                    color={currentTheme.values.mainColor}
                    onPress={() => confirmToken()}
                    onLongPress={() => null}
                    fluid
                    buttonStyle={{ width: "100%" }}
                  />
                </>
              ) : (
                <>
                  <Fbutton
                    text="Verify & Login"
                    color={currentTheme.values.mainColor}
                    onPress={confirmPhone}
                    onLongPress={() => null}
                    fluid
                    buttonStyle={{ width: "100%" }}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaViewWrapper>
  );
};
