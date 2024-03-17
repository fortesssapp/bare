import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Theme } from "../contexts/theme";
import useStyle from "../assets/style/style";
import { AppHeader } from "../components/HOC/AppHeader";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";
import useConstants from "../hooks/useConstants";
import routes from "../helpers/routes";

export const RegisterScreen = ({ navigation, route }) => {
  const { current, currentTheme } = useContext(Theme);
  const STYLES = useStyle();
  const constants = useConstants();

  return (
    <SafeAreaViewWrapper>
      <AppHeader
        navigation={navigation}
        route={route}
        title={constants.sign_up}
      />
      <View style={[STYLES.homeContainer, styles.registerContent]}>
        <View style={styles.registerNote}>
          <Text
            textBreakStrategy="balanced"
            style={[
              STYLES.HomeText,
              STYLES.textColor,
              styles.registerTextStyle,
            ]}
          >
            {" "}
            {constants.sign_up_note}
          </Text>
        </View>

        <View style={styles.registerButtonContainer}>
          <Button
            onPress={() => navigation.navigate(routes.SIGNUP)}
            style={STYLES.mainButton}
            color={currentTheme.values.mainColor}
            title="Sign Up"
          />
        </View>

        <View style={STYLES.actionsContainer}>
          <View style={STYLES.actionButtonContainer}>
            <Button
              onPress={() => navigation.navigate(routes.SIGNUP)}
              style={STYLES.mainButton}
              color={currentTheme.values.mainColor}
              title="Sign Up"
            />
          </View>
          <View style={STYLES.actionButtonContainer}>
            <Button
              onPress={() => navigation.navigate(routes.SIGNIN)}
              style={STYLES.mainButton}
              color={currentTheme.values.currentColor}
              title="Sign In"
            />
          </View>
        </View>
      </View>
    </SafeAreaViewWrapper>
  );
};

const styles = StyleSheet.create({
  registerContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  registerNote: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  registerButtonContainer: {
    marginBottom: 30,
  },
  registerTextStyle: {
    textAlign: "center",
  },
});
