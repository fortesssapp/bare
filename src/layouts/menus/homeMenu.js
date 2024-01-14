import { forwardRef, useContext } from 'react';
import { View } from 'react-native';
import routes from '../../helpers/routes';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
  } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../../contexts/theme';
import useStyle from '../../assets/style/style';

  
  export const HomeMenu = forwardRef((props, ref) => {
    const navigate          = useNavigation();
    const { currentTheme }  = useContext(Theme);
    const styles            = useStyle();

    // ref on menu has methods like open, isOpen, close

   return (<View><Menu ref={ref}>
        <MenuTrigger text=''/>
        <MenuOptions customStyles={{optionsContainer: {borderRadius: 8, padding: 13}}}>
          <MenuOption
            customStyles={{optionText: styles.generalTextstyle, optionWrapper: {marginVertical: 8}}} 
            onSelect={() => navigate.navigate(routes.HOME)}  
            text='Home' 
          />
          <MenuOption 
            customStyles={{optionText: styles.generalTextstyle, optionWrapper: {marginVertical: 8}}} 
            onSelect={() => navigate.navigate(routes.SIGNUP)} 
            text='signup'
          />
          <MenuOption
            customStyles={{optionText: styles.generalTextstyle, optionWrapper: {marginVertical: 8}}}  
            onSelect={() => navigate.navigate(routes.SIGNIN)} 
            text='Login' 
          />
          <MenuOption
            customStyles={{optionText: styles.generalTextstyle, optionWrapper: {marginVertical: 8}}}  
            onSelect={() => navigate.navigate(routes.TESTS)} 
            text='Tests' 
          />
        </MenuOptions>
      </Menu></View>);
  });