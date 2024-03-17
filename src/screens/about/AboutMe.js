import React, { useContext } from "react";
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, BackHandler, TouchableWithoutFeedback } from "react-native";
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
import { EmojisWorld } from "../../assets/style/Emojis";

export const AboutMe = ({ navigation, route }) => {
  const constants           = useConstants();
  const STYLES              = useStyle();
  const { currentTheme, current }    = useContext(Theme);
  const { dispatch }  = useContext(User);
  const { showError, toggleLoader } = useContext(General);
  
  // EMOJI SPECIFIC
  const [emojisOpen, setEmojisOpen] = React.useState(false);

  // manage inpu
  const aboutUserRef = React.useRef();
  const myEmailRef = React.useRef();
  const [aboutMe, setAboutMe] = React.useState(null);
  const [email, setEmail] = React.useState("");

  // EMOJI SPECIFIC
  const toggleEmojiIcons = () => {
    if(Keyboard.isVisible) Keyboard.dismiss();
    setEmojisOpen(!emojisOpen);
  }

  // EMOJI SPECIFIC
  const onEmojiSelect = (emoji) => {
    // get the input ref and add it
    // insertEmoji
    if(aboutUserRef.current && typeof  aboutUserRef.current?.insertEmoji === "function"){
      aboutUserRef.current.insertEmoji(emoji)
    }
  }
  
  // EMOJI PECIFIC
  const ControlInputFocus = () => {
    try {
      if(emojisOpen) setEmojisOpen(false);
    } catch (error) {
      
    }
  }

  // EMOJI SPECIFIC
  const handleBackAction = () => {
    if(emojisOpen){
      setEmojisOpen(false);
      return true;
    }else if(Keyboard.dismiss()){
      return true;
    } 
    return false;
  }

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackAction);
    return () => backHandler.remove(); 
  }, [emojisOpen]);

  const setAboutUser = (value) => {
    // set country
    setAboutMe(value);
  };
  const setMyEmail = (value) => {
    // set country
    setEmail(value);
  };

  const saveAndProceed = async () => {
    try {
      const errors = getErrors( aboutUserRef.current, myEmailRef.current);
      if(errors){ return showError(true, errors); }
      // dispatch to the reg data and move
      dispatch({type: "many", value: { email: email, about: aboutMe }});
      navigation.navigate(routes.APPSECURITY);
    } catch (error) {
      toggleLoader(false);
      showError(true, error.message);
    }
  };

  return (
    <SafeAreaViewWrapper>
      <AppHeader
        navigation={navigation}
        route={route}
        title={constants.about_me_title}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback style={{flex: 1, zIndex: 9999, minHeight: "100%", width: "100%"}} onPress={() => handleBackAction()}>
        <>
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
                  {constants.about_me_note}
                </Text>
              </View>
            </View>
            <View>
            <View style={{ marginBottom: 15, width: "100%" }}>
              { <>
                <Finput
                  style={{
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                  }}
                  inputStyle={{
                    fontWeight: "400",
                  }}
                  autoCorrect={false}
                  autoCapitalize="none"
                  inputLabel={constants.email_email}
                  ref={myEmailRef}
                  type="text"
                  leftIcon="email"
                  validation={{ maxLength: 150, maxWordsCount: 1, required: true}}
                  onValueChange={(value) => setMyEmail(value)}
                />
              </>}
            </View>
              <View style={{ marginBottom: 15, width: "100%" }}>
                { <>
                  <Finput
                    style={{
                      borderRadius: 16
                    }}
                    inputStyle={{
                      fontWeight: "600",
                      fontSize: currentTheme.values.fonts.large,
                      alignSelf: "flex-start"
                    }}
                    inputLabel={constants.about_me_input_label}
                    ref={aboutUserRef}
                    type="text"
                    autoCorrect={true}
                    autoCapitalize={"sentences"}
                    validation={{ maxLength: 500, minWordsCount: 3}}
                    multiline={true}
                    enableEmojis={true}
                    toggleEmojis={toggleEmojiIcons}
                    textAlign={"Left"}
                    onValueChange={(value) => setAboutUser(value)}
                    onFocus={ControlInputFocus}
                    enableCounter={true}
                  />
                </>}
              </View>
            </View>

            <View>
              <View style={[STYLES.actionsContainer, { minWidth: "100%" }]}>
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
                </View>
                <View style={[STYLES.actionButtonContainer, { paddingRight: 5 }]}>
                  <Fbutton
                    text="Save & Continue"
                    color={currentTheme.values.mainColor}
                    onPress={saveAndProceed}
                    onLongPress={() => console.log("Button Long Pressed")}
                    fluid
                    buttonStyle={{ width: "100%" }}
                  />
                </View>
              </View>
            </View>
          </View>
          {emojisOpen?<EmojisWorld 
          isOpen={emojisOpen}
          close={() => setEmojisOpen(false) }
          theme={currentTheme.values.defaultBackground} 
          onSelect={onEmojiSelect} 
          removeEmoji={(aboutUserRef?.current?.removeEmoji)}
          getEmojiCount={(aboutUserRef?.current?.getEmojiCount)}
          />:<></>}
        </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaViewWrapper>
  );
};
