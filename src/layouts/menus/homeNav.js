import React, { useContext, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Theme } from "../../contexts/theme";
import { AppIcon } from "../../assets/style/AppIcons";
import { HomeMenu } from "./homeMenu";
import useStyle from "../../assets/style/style";
import useNavigator from "../../hooks/useNavigator";
import useConstants from "../../hooks/useConstants";
import routes from "../../helpers/routes";

export const HomeNavHeader = () => {
  const { currentTheme } = useContext(Theme);
  const { navigation } = useNavigator();
  const constants = useConstants();
  const styles = useStyle();
  const menuRef = useRef();

  const toggleMenu = () => {
    if (menuRef.current.isOpen()) return menuRef.current.close();
    menuRef.current.open();
  };

  return (
    <View style={styles.homeNavContainer}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.HOME)}>
          <Text style={styles.logoTextStyle}>{constants.app_name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navIconsSection}>
        <View>
          <AppIcon name="camera" size={28} />
        </View>
        <View>
          <AppIcon name="wallet" size={28} />
        </View>
        <View>
          <AppIcon name="home-search" size={28} />
        </View>
        <View>
          <TouchableOpacity onPress={toggleMenu}>
            <AppIcon name="dots-vertical" size={28} />
            <HomeMenu ref={menuRef} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
