import { useContext } from 'react';
import {  StyleSheet  } from 'react-native';
import { Theme } from '../../../contexts/theme';
import useStyle from '../../../assets/style/style';

export default function useStyles(){
    // call theme here and use it
    const { currentTheme, fontFamily }  = useContext(Theme);
    const styles                        = useStyle();

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: currentTheme.values.borderColor || 'grey',
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
            width: '100%',
            marginVertical: 15
        },
        errorBorder: {
            borderColor: currentTheme.values.danger || 'red',
        },
        icon: {
            marginRight: 10,
        },
        input: {
            flex: 1,
            height: 45,
            color: currentTheme.values.currentColor || 'black',
            fontFamily: currentTheme.values.fontRegular || fontFamily,
            ...styles.generalTextstyle
        }
    })
}

