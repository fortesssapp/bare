import React                        from 'react';
import { AppNavigationContainer }   from './src/components/HOC/AppNavigationContainer';
import { ThemeContextProvider }     from './src/contexts/themeContextProvider';
import { MenuProvider }             from 'react-native-popup-menu';
import StatusBar                    from './src/components/StatusBar';

const App = () => {
  return (
    <ThemeContextProvider>
      <MenuProvider>
        <AppNavigationContainer>
            <StatusBar />
        </AppNavigationContainer>
      </MenuProvider>
    </ThemeContextProvider>
  );
};


export default App;

