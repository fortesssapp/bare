import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import useStyle from "../../assets/style/style";

export const SafeAreaViewWrapper = ({ children }) => {
  const STYLES = useStyle();
  return (
    <SafeAreaProvider style={STYLES.frame}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={STYLES.mainContainerSafeArea}>
          {children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
};
