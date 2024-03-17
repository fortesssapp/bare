import React, {useContext} from 'react';
import { View, TouchableOpacity, Animated, PanResponder } from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import useStyle from './style';
import { AppIcon } from './AppIcons';
import { Theme } from '../../contexts/theme';

export const EmojisWorld = ({
  onSelect = (emoji) => null,
  category = Categories.emotion,
  theme="",
  isOpen=false,
  removeEmoji=()=>null,
  getEmojiCount=()=>0,
  close=()=>null
}) => {
  const { currentTheme } = useContext(Theme);
  const STYLES = useStyle();
  const [showSearch, setShowSearch] = React.useState(false);
  const [count, setCount] = React.useState(getEmojiCount());

  const insert = (emoji) => {
    onSelect(emoji);
    setCount(count + 1);
  }

  const remove = () => {
    removeEmoji();
    setCount(count - 1)
  }

  // Animation
  const pan = React.useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          // Allows only downward movement
          pan.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 150) {
          // Threshold to trigger close
          close();
          pan.setValue({ x: 0, y: 0 });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  if (!isOpen) { pan.setValue({ x: 0, y: 0 }); }

  const toggleSearch = () => {
    console.log("pressed");
    setShowSearch(!showSearch);
  }

  return (
    <Animated.View
          style={[
            {
              transform: [{ translateY: pan.y }],
              maxHeight: 300,
              flex: 2
            },
          ]}
          {...panResponder.panHandlers}
        >
      <View style={STYLES.emojiCotainer}>
          <TouchableOpacity 
            onPress={toggleSearch}
            style={{
              ...STYLES.emojiSearchToggler,
              right: (count > 0 )? 50: 20
            }}>
            <AppIcon name={`${showSearch ? 'close-circle': 'magnify'}`} size={25} />
          </TouchableOpacity>
          {(count > 0)?
          <TouchableOpacity 
            onPress={remove}
            style={{
              ...STYLES.removeEmojiStyle
            }}>
            <AppIcon name="backspace" size={25} />
          </TouchableOpacity>
          : <></>}
          <View style={{
            width: 50,
            height: 5,
            backgroundColor: currentTheme.values.placeholders,
            position: "absolute",
            top: 0,
            borderRadius: 5,
            alignSelf: "center"
          }}></View>
        <EmojiSelector 
        showSearchBar={showSearch}
        theme={theme}
        category={category}
        onEmojiSelected={insert} />
      </View>
    </Animated.View>
  )
}