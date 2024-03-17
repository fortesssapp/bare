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

export const NickName = ({ navigation, route }) => {
  const constants           = useConstants();
  const STYLES              = useStyle();
  const { currentTheme, current }    = useContext(Theme);
  const {  dispatch } = useContext(User);
  const { showError, toggleLoader } = useContext(General);

  // manage inpu
  const nickNameRef = React.useRef();
  const fullNamesRef = React.useRef();
  const [nickName, setNickName] = React.useState(null);
  const [fullName, setFullName] = React.useState(null);


  const setUserNickName = (value) => {
    // set country
    setNickName(value);
  };

  const setUserFullName = (value) => {
    // set country
    setFullName(value);
  };

  const saveNickNameAndProceed = async () => {
    try {
      const errors = getErrors(nickNameRef.current, fullNamesRef.current);
      if(errors){ return showError(true, errors); }
      // dispatch to the reg data and move
      dispatch({type: "many", value: {name: fullName, nick_name: nickName }});
      navigation.navigate(routes.ABOUTME);
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
        title={constants.nick_name_title}
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
                {constants.nick_name_note}
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
                  inputLabel={constants.nick_name_input_label}
                  ref={nickNameRef}
                  type="text"
                  leftIcon="account-star"
                  validation={{ maxLength: 12, maxWordsCount: 1}}
                  onValueChange={(value) => setUserNickName(value)}
                />
              </>}
            </View>
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
                  inputLabel={constants.full_name_label}
                  ref={fullNamesRef}
                  type="text"
                  leftIcon="account-edit"
                  validation={{ maxLength: 100, maxWordsCount: 3, minWordsCount: 2, required: true}}
                  onValueChange={(value) => setUserFullName(value)}
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
                  onPress={() => navigation.navigate(routes.ABOUTME)}
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
                  onPress={saveNickNameAndProceed}
                  onLongPress={() => console.log("Button Long Pressed")}
                  fluid
                  buttonStyle={{ width: "100%" }}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaViewWrapper>
  );
};
