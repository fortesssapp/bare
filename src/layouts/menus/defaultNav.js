import React, { useContext, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Theme } from "../../contexts/theme";
import { AppIcon } from "../../assets/style/AppIcons";
import { HomeMenu } from "./homeMenu";
import useStyle from "../../assets/style/style";
import useNavigator from "../../hooks/useNavigator";
import useConstants from "../../hooks/useConstants";
import routes from "../../helpers/routes";

export const DefaultNavHeader = ({ title }) => {
  const { currentTheme } = useContext(Theme);
  const { navigation } = useNavigator();
  const constants = useConstants();
  const styles = useStyle();
  const menuRef = useRef();

  const toggleMenu = () => {
    if (menuRef.current.isOpen()) return menuRef.current.close();
    menuRef.current.open();
  };

  const RenderTitle = ({ title }) => {
    return (
      <View style={styles.iconWithTitle}>
        <View>
          <AppIcon name="arrow-left" size={34} />
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            allowFontScaling={true}
            style={[
              styles.generalTextstyle,
              styles.textColor,
              styles.routeTitleText,
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.defaultNavContainer}>
      <View style={{ flex: 2 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate(routes.WELCOME);
          }}
        >
          {title ? (
            <RenderTitle title={title} />
          ) : (
            <AppIcon name="arrow-left" size={28} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.navIconsSectionDefault}>
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
