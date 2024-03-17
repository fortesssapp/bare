import React, { useContext } from "react";
import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from "react-native";
import { SafeAreaViewWrapper } from "../../components/HOC/SafeAreaViewWrapper";
import { AppHeader } from "../../components/HOC/AppHeader";
import { Theme } from "../../contexts/theme";
import { User } from "../../contexts/user";
import { General } from "../../contexts/general";
import Fbutton from "../../components/inputs/Fbutton";
import useConstants from "../../hooks/useConstants";
import useStyle from "../../assets/style/style";
import { Users } from "../../models/Users";
import routes from "../../helpers/routes";
import useImageProcessor from "../../hooks/useImageProcessor";
import { AppIcon } from "../../assets/style/AppIcons";

export const ProfilePhoto = ({ navigation, route }) => {
  const constants           = useConstants();
  const STYLES              = useStyle();
  const { currentTheme, current }    = useContext(Theme);
  const { regData, dispatch }       = useContext(User);
  const { showError, toggleLoader, showMessage } = useContext(General);
  const [selected, setSelected] = React.useState(null);
  const {   
    doImageSelection,
    perfomUpload,
    clearImages,
    selectedImages
  } = useImageProcessor();

  React.useEffect(() =>{
    if(selectedImages.length) setSelected([...selectedImages]);
  }, [selectedImages]);

  // manage inpu


  const saveNickNameAndProceed = async () => {
    try {
      // update reg data
      toggleLoader(true, "saving");
      const object = {...regData};
      object["completed"] = true;
      const findUser = await Users.findUser("phone", regData.phone);
      if(!findUser){
        toggleLoader(false, "");
        showError(true, constants.errors.user_not_found);
        return;
      }
      await Users.updateUser(object, findUser.id);
      dispatch({type: "many", value: {...object, ...selected?.[0]}});
      showMessage(true, constants.profile_update_success, () => {
        navigation.navigate(routes.HOME);
      }, null, "Enter fortress", "Okay", false);
      toggleLoader(false, "");
    } catch (error) {
      toggleLoader(false);
      console.log(error.message, "in error");
      showError(true, error.message);
    }
  };

  // save the default image and proceed

  const saveDefaultAndProceed = async () => {
    try {
      // update reg data
      toggleLoader(true, "saving");
      const object = {...regData};
      object["completed"] = true;
      const findUser = await Users.findUser("phone", regData.phone);
      if(!findUser){
        toggleLoader(false, "");
        showError(true, constants.errors.user_not_found);
        return;
      }
      await Users.updateUser(object, findUser.id);
      dispatch({type: "many", value: {...object}});
      showMessage(true, constants.profile_update_success, () => {
        navigation.navigate(routes.HOME);
      }, null, "Enter fortress", "Okay", false);
      toggleLoader(false, "");
    } catch (error) {
      toggleLoader(false);
      console.log(error.message, "in error");
      showError(true, error.message);
    }
  }


  // console.log(selected&&(selected?.[0]?.uri)&& !((selected?.[0]?.url)));

  return (
    <SafeAreaViewWrapper>
      <AppHeader
        navigation={navigation}
        route={route}
        title={constants.profile_photo_title}
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
                {constants.profile_phote_note}
              </Text>
            </View>
          </View>
          <View>
            <View style={{ marginBottom: 15, width: "100%", maxHeight: 180}}>
              {!selected&&<View>
                <Image style={STYLES.profile_photo} source={require("../../assets/pp.png")} />
              </View>}
              {selected&&(selected?.[0]?.uri)&& !((selected?.[0]?.url))&&<View>
                <Image style={STYLES.profile_photo} source={{uri: (selected?.[0]?.uri)}} />
              </View>}
              {selected&&((selected?.[0]?.url))&&<View>
                <Image style={STYLES.profile_photo} source={{uri: (selected?.[0]?.url)}} />
              </View>}
            </View>
            <View style={{ marginBottom: 15, width: "100%" }}>
             {!selected&&<View style={{minWidth: "100%", justifyContent: "center", flexDirection: "row"}}>
                <TouchableOpacity 
                  onPress={() => doImageSelection(1,true,false)}
                  style={{ flexDirection: "row", marginRight: 15, padding: 10 }}>
                  <Text style={[STYLES.generalTextstyle, {marginRight: 10}]}>
                    <AppIcon name="image-multiple" size={24} color={STYLES.iconsColor} />
                  </Text>
                  <Text style={STYLES.generalTextstyle}>
                    {constants.profile_photo_select}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{ flexDirection: "row", padding: 10 }}
                  onPress={() => doImageSelection(1,true,true)}
                >
                <Text  style={[STYLES.generalTextstyle, {marginRight: 10}]}>
                    <AppIcon name="camera" size={24} color={STYLES.iconsColor} />
                  </Text>
                  <Text style={STYLES.generalTextstyle}>
                    {constants.profile_photo_use_camera}
                  </Text>
                </TouchableOpacity>
             </View>}

             {selected&&<View style={{minWidth: "100%", justifyContent: "center", flexDirection: "row"}}>
                <TouchableOpacity 
                  style={{ flexDirection: "row", padding: 10, marginRight: 15 }}
                  onPress={() => {
                    clearImages();
                    setSelected(null);
                  }}
                >
                  <Text  style={[STYLES.generalTextstyle, {marginRight: 10}]}>
                    <AppIcon name="image-remove" size={24} color={STYLES.iconsColor} />
                  </Text>
                  <Text style={STYLES.generalTextstyle}>
                    {constants.profile_photo_change}
                  </Text>
                </TouchableOpacity>
                {selected && !((selected?.[0]?.uploaded)) &&
                <TouchableOpacity 
                  onPress={() => perfomUpload(true, true)}
                  style={{ flexDirection: "row", marginRight: 15, padding: 10 }}>
                  <Text style={[STYLES.generalTextstyle, {marginRight: 10}]}>
                    <AppIcon name="content-save-edit" size={24} color={STYLES.iconsColor} />
                  </Text>
                  <Text style={STYLES.generalTextstyle}>
                    {constants.profile_photo_upload}
                  </Text>
                </TouchableOpacity>
                }
             </View>}

            </View>
          </View>

          <View>
            <View style={[STYLES.actionsContainer, { minWidth: "100%" }]}>
              <View style={[STYLES.actionButtonContainer, { paddingRight: 5 }]}>
                <Fbutton
                  text="I will later"
                  color={(current === "dark")? currentTheme.values.defaultColor: currentTheme.values.defaultColor}
                  onPress={() => saveDefaultAndProceed()}
                  onLongPress={() => null}
                  fluid
                  disabled={false}
                  buttonStyle={{ width: "100%" }}
                />
              </View>
              {((selected?.[0]?.uploaded)) && <View style={[STYLES.actionButtonContainer, { paddingRight: 5 }]}>
                <Fbutton
                  text="Done"
                  color={currentTheme.values.mainColor}
                  onPress={saveNickNameAndProceed}
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
