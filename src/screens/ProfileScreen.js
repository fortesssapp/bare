import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Theme } from "../contexts/theme";
import useStyle from "../assets/style/style";
import { AppHeader } from "../components/HOC/AppHeader";
import { SafeAreaViewWrapper } from "../components/HOC/SafeAreaViewWrapper";

export const ProfileScreen = ({ navigation, route }) => {
  const { current, change } = useContext(Theme);
  const STYLES = useStyle();
  const toggleTheme = () => {
    change(current === "light" ? "dark" : "light");
  };
  const gohome = () => {
    navigation.navigate("HOME", { location: "HOME" });
  };

  return (
    <SafeAreaViewWrapper>
      <AppHeader navigation={navigation} route={route} title={"Profile"} />
      <View style={[STYLES.homeContainer]}>
        <Text style={[STYLES.HomeText, STYLES.textColor]}>Profile Screen</Text>
        <Button
          onPress={gohome}
          style={STYLES.mainButton}
          color={STYLES.mainButton.backgroundColor}
          title="Go Home"
        />
        <Button
          onPress={toggleTheme}
          style={STYLES.mainButton}
          color={STYLES.mainButton.backgroundColor}
          title="Change Theme"
        />
      </View>
    </SafeAreaViewWrapper>
  );
};
