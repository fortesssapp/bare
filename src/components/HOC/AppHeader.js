import React, { useRef, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useStyle from "../../assets/style/style";
import { AppIcon } from "../../assets/style/AppIcons";
import useNavigator from "../../hooks/useNavigator";
import { HomeMenu } from "../../layouts/menus/homeMenu";

// navigations
import { HomeNavHeader } from "../../layouts/menus/homeNav";
import { DefaultNavHeader } from "../../layouts/menus/defaultNav";
import { AuthNavHeader } from "../../layouts/menus/authNav";

export const AppHeader = ({ title, navigation, route }) => {
  const { currentRouteName } = useNavigator();
  const STYLES = useStyle();
  const menuRef = useRef();

  const DefaultContents = ({T}) => {
    return <DefaultNavHeader title={T} />;
  };
  const AuthContents = ({T}) => {
    return <AuthNavHeader title={T} />
  }

  const printContents = useMemo(() => {
    switch (currentRouteName) {
      case "HOME":
        return <HomeNavHeader />;
      case "NICK_NAME":
        return <AuthContents  T={title} />
      default:
        return <DefaultContents T={title} />;
    }
  }, [currentRouteName, title]);

  // define different headers differentiated by which route the user is on including search
  return <View style={STYLES.appNavContainer}>{printContents}</View>;
};
