import React, { useMemo, useContext }       from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import { AppIcon }                          from '../../assets/style/AppIcons';
import { convertFirstLetter }               from '../../helpers/helpers';
import useStyle from '../../assets/style/style';
import { Theme } from '../../contexts/theme';

export const  HomeTabBar = ({ state, descriptors, navigation, position }) => {
    const styles = useStyle();
    const { currentTheme, current  } = useContext(Theme);

  return (
    <View style={{...styles.appHomeTapStyle}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        const printLabel = useMemo(() => {
            switch(label.toLowerCase()){
                case 'community':{
                    return <AppIcon name='account-group' size={24} />
                }
                case 'ai':{
                  return "Ask AI"
                }
                default: {
                    return convertFirstLetter(label);
                }
            }
        }, [label]);

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ 
                flex: 1, 
                paddingBottom: 5,
                borderBottomWidth: 3, 
                borderBottomColor: 
                isFocused ? 
                currentTheme.values.lightColor: 
                (current === "dark"? currentTheme.values.currentBackground: currentTheme.values.mainColor) 
            }}
          >
            <Animated.Text style={{ 
                opacity, 
                ...styles.generalTextstyle,
                color: currentTheme.values.lightColor,
                textAlign: "center",
                fontSize: 16
                }}>
              {printLabel}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}