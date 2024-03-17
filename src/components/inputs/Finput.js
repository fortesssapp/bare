import React, { forwardRef, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { AppIcon } from "../../assets/style/AppIcons";
import useStyles from "./styles/Fstyles";
import GraphemeSplitter from 'grapheme-splitter';
import { Theme } from "../../contexts/theme";

const Finput = forwardRef((props, ref) => {

  // EmojisWorld
  const {
    style,
    type = "text",
    leftIcon,
    rightIcon,
    validation,
    rightIconSize = 24,
    leftIconSize = 24,
    multiline = false,
    onValueChange,
    inputLabel = "Type here",
    inputStyle = {},
    enableEmojis=false,
    toggleEmojis=() => null,
    enableCounter=false,
    isSecurity=false,
    toggleSecurity=() => null,
    ...otherProps
  } = props;

  const [value, setValue]       = useState("");
  const [isValid, setIsValid]   = useState(true);
  const [emojiCount, setEmojiCount] = useState(0);
  const [errors, setErrors]     = useState([]);
  const styles = useStyles();
  const { currentTheme} = React.useContext(Theme);
  const inputReference = React.useRef();
  const inputErrors = React.useRef([]);

  // Map custom type to keyboardType
  const getKeyboardType = () => {
    switch (type) {
      case "number":
        return "numeric";
      case "phone":
        return "phone-pad";
      case "text":
      default:
        return "default";
    }
  };

  const validateInput = (value) => {
    let valid = true;
    inputErrors.current = [];
    if (validation) {
      if (validation.minLength && value.length < validation.minLength) {
        valid = false;
        const er = `${inputLabel} requires minimum of at least ${validation.minLength} characters long.`;
        if(errors.indexOf(er) === -1) setErrors([...errors, er]);
        inputErrors.current.push(er);
      }
      
      if (validation.maxLength && value.length > validation.maxLength) {
        valid = false;
        const er = `${inputLabel}  must be less or equal ${validation.maxLength} characters long.`;
        if(errors.indexOf(er) === -1) setErrors([...errors, er]);
        inputErrors.current.push(er);
      }
      
      if (validation.required && value.length === 0) {
        valid = false;
        const er = `${inputLabel}  is required!`;
        if(errors.indexOf(er) === -1) setErrors([...errors, er]);
        inputErrors.current.push(er);
      }
      
      if (validation.validNumber && isNaN(Number(value))) {
        valid = false;
        const er = `${inputLabel}  must be a valid number`;
        if(errors.indexOf(er) === -1) setErrors([...errors, er]);
        inputErrors.current.push(er);
      }
      
      const wordCount = value.split(/\s+/).length;
      if (validation.minWordsCount && wordCount < validation.minWordsCount) {
        valid = false;
        const er = `${inputLabel} requires minimum of at least ${validation.minWordsCount} words`;
        if(errors.indexOf(er) === -1) setErrors([...errors, er]);
        inputErrors.current.push(er);
      }

      if (validation.maxWordsCount && wordCount > validation.maxWordsCount) {
        valid = false;
        const er = `${inputLabel}  must not be more than ${validation.maxWordsCount} words`;
        if(errors.indexOf(er) === -1) setErrors([...errors, er]);
        inputErrors.current.push(er);
      }
    }

    return valid;
  };

  const handleChange = (text) => {
    if(validation.maxLength){ if(text.length > validation.maxLength) return;}
    const valid = validateInput(text);
    setIsValid(valid);
    setValue(text);
    if (onValueChange) onValueChange(text);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    removeValue: () => setValue(""),
    isValid: () => validateInput(value),
    getErrors: () => (inputErrors.current?.length) ? inputErrors.current.join(", "): "",
    insertEmoji: (emoji) => { 
      setEmojiCount(emojiCount + 1);
      handleChange(`${value.trim()} ${emoji}`) 
    },
    removeEmoji: () => { 
      if(emojiCount === 0)return false;
      const splitter = new GraphemeSplitter();
      const graphemes = splitter.splitGraphemes(value);
      graphemes.pop(); // Remove the last grapheme
      setEmojiCount(emojiCount - 1);
      return handleChange(graphemes.join(''));
    },
    getEmojiCount: () => emojiCount,
    focus: () => inputReference.current.focus(),
    blur: () => inputReference.current.blur(),
    clear: () => inputReference.current.clear()

  }), [validateInput, value, errors, inputReference]);

  return (
    <View
      style={[
        styles.container,
        !isValid && styles.errorBorder,
        style,
        multiline ? { minHeight: 120, maxHeight: 200 } : {},
        enableEmojis ? { paddingBottom: 24 }: {}
      ]}
    >
      {leftIcon && !multiline && (
        <AppIcon name={leftIcon} size={leftIconSize} style={styles.icon} />
      )}

      <TextInput
        ref={inputReference}
        placeholder={inputLabel}
        placeholderTextColor={styles.placeholders.color}
        style={[
          styles.input,
          multiline ? { minHeight: 120, maxHeight: 200 } : {},
          inputStyle,
        ]}
        keyboardType={getKeyboardType()}
        onChangeText={handleChange}
        secureTextEntry={(type === "secure") || isSecurity}
        value={value}
        {...otherProps}
        multiline={multiline}
      />

      {rightIcon && !multiline && (
        <TouchableOpacity onPress={toggleSecurity}>
        <AppIcon name={rightIcon} size={rightIconSize} style={styles.iconr} />
        </TouchableOpacity>
      )}
      {enableEmojis&&<TouchableOpacity  onPress={toggleEmojis} style={styles.emojiIcons} >
        <AppIcon name={"emoticon"} size={24} style={styles.iconr} />
        </TouchableOpacity>}
  
        {enableCounter&&<TouchableOpacity style={styles.inputCounter}>
          <Text style={{color: currentTheme.values.placeholders}}>{value.length}/{validation.maxLength}</Text>
        </TouchableOpacity>}
    </View>
  );
});

Finput.propTypes = {
  style: PropTypes.object,
  type: PropTypes.oneOf(["number", "text", "phone", "pin", "secure"]),
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  inputLabel: PropTypes.string.isRequired,
  rightIconSize: PropTypes.number,
  leftIconSize: PropTypes.number,
  multiline: PropTypes.bool,
  validation: PropTypes.shape({
    validNumber: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    minWordsCount: PropTypes.number,
    maxWordCount: PropTypes.number,
  }),
  onValueChange: PropTypes.func,
};

export default Finput;
