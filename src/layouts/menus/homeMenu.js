import { forwardRef, useContext } from "react";
import { View } from "react-native";
import routes from "../../helpers/routes";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "../../contexts/theme";
import { User } from "../../contexts/user";
import Auth from "@react-native-firebase/auth";
import useStyle from "../../assets/style/style";
import { General } from "../../contexts/general";

export const HomeMenu = forwardRef((props, ref) => {
  const navigate = useNavigation();
  const { currentTheme } = useContext(Theme);
  const { auth }              = useContext(User);
  const { showMessage, toggleLoader } = useContext(General);
  const styles = useStyle();

  // ref on menu has methods like open, isOpen, close

  const logout = () => {
    try {
      //console.log(" Logging out", auth);
      if(!auth) return;
      showMessage(true, "Are you sure?", async () => {
        await Auth().signOut();
      }, () => null);
    } catch (error) {
      console.log(error);
      toggleLoader(false);
    }
  }

  return (
    <View>
      <Menu ref={ref}>
        <MenuTrigger text="" />
        <MenuOptions
          customStyles={{ optionsContainer: { borderRadius: 8, padding: 13 } }}
        >
          <MenuOption
            customStyles={{
              optionText: styles.generalTextstyle,
              optionWrapper: { marginVertical: 8 },
            }}
            onSelect={() => navigate.navigate(routes.HOME)}
            text="Home"
          />
          <MenuOption
            customStyles={{
              optionText: styles.generalTextstyle,
              optionWrapper: { marginVertical: 8 },
            }}
            onSelect={() => navigate.navigate(routes.SIGNUP)}
            text="signup"
          />
          <MenuOption
            customStyles={{
              optionText: styles.generalTextstyle,
              optionWrapper: { marginVertical: 8 },
            }}
            onSelect={() => navigate.navigate(routes.SIGNIN)}
            text="Login"
          />
          <MenuOption
            customStyles={{
              optionText: styles.generalTextstyle,
              optionWrapper: { marginVertical: 8 },
            }}
            onSelect={() => navigate.navigate(routes.TESTS)}
            text="Tests"
          />
          <MenuOption
            customStyles={{
              optionText: styles.generalTextstyle,
              optionWrapper: { marginVertical: 8 },
            }}
            onSelect={() => logout()}
            text="log out"
          />
        </MenuOptions>
      </Menu>
    </View>
  );
});
