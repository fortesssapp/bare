import React, { useContext, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaViewWrapper } from "../../components/HOC/SafeAreaViewWrapper";
import { AppHeader } from "../../components/HOC/AppHeader";
import { Theme } from "../../contexts/theme";
import { User } from "../../contexts/user";
import { General } from "../../contexts/general";
import { getFullPhoneNumber } from "../../helpers/helpers";
import Finput from "../../components/inputs/Finput";
import Fbutton from "../../components/inputs/Fbutton";
import useConstants from "../../hooks/useConstants";
import useStyle from "../../assets/style/style";
import Auth from "@react-native-firebase/auth";
import { Users } from "../../models/Users";
import { store } from "../../utility/cache";
import useInternet from "../../hooks/useInternet";

export const EnterPhoneNumberScreen = ({ navigation, route }) => {
  const constants = useConstants();
  const STYLES = useStyle();
  const { currentTheme } = useContext(Theme);
  const { regData, dispatch, setAuth } = useContext(User);
  const { showError, toggleLoader } = useContext(General);

  // manage inpu
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState([]);
  const inputRef = React.useRef();
  const inputRef2 = React.useRef();
  const [codeSent, setCodeSent] = React.useState(null);
  const [parsed, setParsed] = React.useState();
  const { checkInternet } = useInternet();

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
      if (typeof inputRef?.current?.focus === "function") {
        inputRef.current.focus();
      }
      if(inputRef2.current){
        inputRef2.current.focus();
        inputRef2.current.clear();
      }
    });

    if(codeSent && inputRef2.current){
      inputRef2.current.clear();
    }

    return () => subscribed();
  }, [codeSent]);

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
      const isConnected = checkInternet();
      if(!isConnected) return;
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
        // console.log(findUser, fullPhone, " get user and phone");
        toggleLoader(false);

        if (findUser && findUser !== undefined) {
          showError(true, constants.errors.phone_exists);
          toggleLoader(false);
          return;
        }

        console.log(100, " about to sign up");

        // Do Authentication
        toggleLoader(true, "logging");

        const confirmation = await Auth().signInWithPhoneNumber(
          fullPhone,
          true,
        );

        // console.log(confirmation, " login check");

        if (!confirmation) {
          toggleLoader(false);
          showError(true, constants.errors.code_not_sent);
          return;
        }

        toggleLoader(false);
        setCodeSent(confirmation);
        if (inputRef2.current) inputRef2.current?.clear();
      }
      if (!fullPhone) {
        showError(true, constants.errors.phone_entry_error);
      }
    } catch (error) {
      toggleLoader(false);
      console.log(error.message, "in error");
      showError(true, error.message);
    }
  };

  const confirmToken = async () => {
    try {
      const country = regData?.country;
      if (!country || country === undefined) {
        return showError(true, constants.errors.country_first);
      }
      const fullPhone = getFullPhoneNumber(phone, country.iso_code);
      // if the verification is duccessful
      // set codeSent to try for verification
      if (!code || code.length !== 6) {
        showError(true, constants.errors.invalid_code);
        return;
      }

      if (!codeSent) {
        showError(true, constants.errors.code_null);
        setCodeSent(null);
        return;
      }

      const confirmed = await codeSent.confirm(code);

      if (confirmed) {
        // dispatch
        const data = { phone: fullPhone };

        if (regData.device_id) {
          data["device_id"] = regData.device_id;
        }

        if (regData.ntoken) {
          data["ntoken"] = regData.ntoken;
        }

        if (regData.uid) {
          data["uid"] = regData.uid;
        }

        if (regData.country) {
          data["country"] = regData.country;
        }

        // console.log(data, " 163 data to save");
        
        // below createdUser is expected to be an ID
        const createdUser = await Users.createUser({ ...data });
        const user_data = {phone: fullPhone, ...data, _id: createdUser};
        dispatch({ type: "many", value: user_data });
        store(constants.store.user_data, user_data);
        // console.log(createdUser, " user account created");
      }

      if (!confirmed) {
        showError(true, constants.errors.confirmation_made);
      }
    } catch (error) {
      showError(true, error.message);
    }
  };

  // console.log(regData);

  return (
    <SafeAreaViewWrapper>
      <AppHeader
        navigation={navigation}
        route={route}
        title={codeSent ? constants.enter_phone_code : constants.enter_phone}
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
                  : constants.enter_phone_note}
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
                  ref={inputRef2}
                  type="number"
                  leftIcon="focus-field-horizontal"
                  secure={true}
                  validation={{ validNumber: true, maxLength: 6 }}
                  onValueChange={(value) => setEnteredCode(value)}
                />
              </>
            ) : (
              <>
                <Finput
                  style={{
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                  inputLabel={"Enter your phone number"}
                  ref={inputRef}
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
                    onLongPress={() => console.log("Button Long Pressed")}
                    fluid
                    buttonStyle={{ width: "100%" }}
                  />
                </>
              ) : (
                <>
                  <Fbutton
                    text="Verify Phone"
                    color={currentTheme.values.mainColor}
                    onPress={confirmPhone}
                    onLongPress={() => console.log("Button Long Pressed")}
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
