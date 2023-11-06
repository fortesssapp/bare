import { SafeAreaProvider }     from 'react-native-safe-area-context';
import { SafeAreaView }         from 'react-native';
import useStyle                 from '../../assets/style/style';

export const SafeAreaViewWrapper = ({ children }) => {
    const STYLES = useStyle();
    return (
        <SafeAreaProvider style={STYLES.frame}>
            <SafeAreaView style={STYLES.mainContainerSafeArea}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )

}