import React, { useContext } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaViewWrapper } from "../../components/HOC/SafeAreaViewWrapper";
import { AppHeader } from "../../components/HOC/AppHeader";
import { Theme } from "../../contexts/theme";
import { User } from "../../contexts/user";
import { General } from "../../contexts/general";
import Finput from "../../components/inputs/Finput";
import Fbutton from "../../components/inputs/Fbutton";
import useConstants from "../../hooks/useConstants";
import useStyle from "../../assets/style/style";
import routes from "../../helpers/routes";
import { getErrors } from "../../helpers/helpers";
import CryptoJS from "react-native-crypto-js";
import uuid from "react-native-uuid";

export const AppSecurity = ({ navigation, route }) => {
  const constants           = useConstants();
  const STYLES              = useStyle();
  const { currentTheme, current }    = useContext(Theme);
  const { dispatch }    = useContext(User);
  const { showError, toggleLoader } = useContext(General);

  // manage inpu
  const pinRef = React.useRef();
  const confirmPinRef = React.useRef();
  const [pin, setPin] = React.useState(null);
  const [confirmPin, setConfirmPin] = React.useState(null);
  const [pinEntered, setPinEntered] = React.useState(false);
  const [makeSecure, setMakeSecure] = React.useState(true);

  // when we navigate to this rout at first, Place cursor in the input
  React.useEffect(() => {
    const subscribe = !(pinEntered)?
    navigation.addListener('focus', () => pinRef.current?.focus()):
    navigation.addListener('focus', () => confirmPinRef.current?.focus())

    return () => subscribe()
  }, [pinEntered]);


  const viewEnteredPin = () => {
    try {
      setMakeSecure(!makeSecure);
    } catch (error) {
      console.log(error);
    }
  }

  const setUserPin = (value) => {
    // set country
    setPin(value);
  };

  const setConfirmUserPin = (value) => {
    // set country
    setConfirmPin(value);
  };

  const saveNickNameAndProceed = async () => {
    try {
      if(pin !== confirmPin){
        return showError(true, constants.errors.match_pin);
      }
      const errors = getErrors(confirmPinRef.current);
      if(errors){ return showError(true, errors); }
      // dispatch to the reg data and move
      const secret = uuid.v4();
      // Encrypt
      let ciperPin = CryptoJS.AES.encrypt(pin, secret).toString();
      dispatch({type: "many", value: { pin: ciperPin, salt:  secret}});
      navigation.navigate(routes.PROFILEPHOTO);
    } catch (error) {
      toggleLoader(false);
      showError(true, error.message);
    }
  };

  const nextToConfirmPin = async () => {
    try {
      pinRef.current.isValid();
      console.log("is it here ?");
      const errors = getErrors(pinRef.current);
      if(errors){ return showError(true, errors);}
      // set pin entered
      setPinEntered(true);
     
      setTimeout(() => {  confirmPinRef.current?.focus(); }, 100); 
    } catch (error) {
      toggleLoader(false);
      console.log(error.message, "in error");
      showError(true, error.message);
    }
  }

  const backtToPin = async () => {
    try {
      // set pin entered
      setPinEntered(false);
      setTimeout(() => { pinRef.current?.focus(); }, 100); 
    } catch (error) {
      toggleLoader(false);
      console.log(error.message, "in error");
      showError(true, error.message);
    }
  }

  return (
    <SafeAreaViewWrapper>
      <AppHeader
        navigation={navigation}
        route={route}
        title={pinEntered ? constants.app_security_confirm_title: constants.app_security_title}
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
                { pinEntered? constants.app_security_confirm_pin_note: constants.app_security_note}
              </Text>
            </View>
          </View>
          <View>
            <View style={{ marginBottom: 15, width: "100%" }}>
              {!(pinEntered)?<>
                <Finput
                  style={{
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                  inputStyle={{
                    fontWeight: "900",
                    fontSize: 36,
                    textAlign: "center",
                    letterSpacing: 3
                  }}
                  inputLabel={constants.app_security_pin_label}
                  ref={pinRef}
                  type="number"
                  leftIcon="lock-check"
                  isSecurity={makeSecure}
                  toggleSecurity={viewEnteredPin}
                  rightIcon={`${makeSecure ? 'eye-off': 'eye'}`}
                  validation={{ maxLength: 6, minLength: 6, required: true}}
                  onValueChange={(value) => setUserPin(value)}
                />
              </>: <></>}
            </View>
            <View style={{ marginBottom: 15, width: "100%" }}>
              {(pinEntered)?<>
                <Finput
                  style={{
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                  inputStyle={{
                    fontWeight: "900",
                    fontSize: 36,
                    textAlign: "center",
                    letterSpacing: 3
                  }}
                  inputLabel={constants.app_security_confirm_pin_label}
                  ref={confirmPinRef}
                  type="number"
                  leftIcon="lock-check"
                  isSecurity={makeSecure}
                  toggleSecurity={viewEnteredPin}
                  rightIcon={`${makeSecure ? 'eye-off': 'eye'}`}
                  validation={{ maxLength: 6, minLength: 6, required: true}}
                  onValueChange={(value) => setConfirmUserPin(value)}
                />
              </>: <></>}
            </View>
          </View>

          <View>
            <View style={[STYLES.actionsContainer, { minWidth: "100%" }]}>
            {(pinEntered)? 
            <View style={[STYLES.actionButtonContainer, { paddingRight: 5 }]}>
            <Fbutton
              text="Back"
              color={(current === "dark")? currentTheme.values.defaultColor: currentTheme.values.defaultColor}
              onPress={() => backtToPin()}
              onLongPress={() => console.log("Button Long Pressed")}
              fluid
              disabled={false}
              buttonStyle={{ width: "100%" }}
            />
          </View>: 
            <View style={[STYLES.actionButtonContainer, { paddingRight: 5 }]}>
            <Fbutton
              text="Skip"
              color={(current === "dark")? currentTheme.values.defaultColor: currentTheme.values.defaultColor}
              onPress={() => navigation.navigate(routes.APPSECURITY)}
              onLongPress={() => console.log("Button Long Pressed")}
              fluid
              disabled={true}
              buttonStyle={{ width: "100%" }}
            />
          </View>}
            {(pinEntered)?
            <View style={[STYLES.actionButtonContainer, { paddingRight: 5 }]}>
              <Fbutton
                text="Confirm & Continue"
                color={currentTheme.values.mainColor}
                onPress={saveNickNameAndProceed}
                onLongPress={() => console.log("Button Long Pressed")}
                fluid
                buttonStyle={{ width: "100%" }}
              />
            </View>:
            <View style={[STYLES.actionButtonContainer, { paddingRight: 5 }]}>
              <Fbutton
                text="Next"
                color={currentTheme.values.mainColor}
                onPress={nextToConfirmPin}
                onLongPress={() => console.log("Button Long Pressed")}
                fluid
                buttonStyle={{ width: "100%" }}
              />
            </View>}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaViewWrapper>
  );
};
