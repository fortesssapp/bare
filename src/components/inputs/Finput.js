import React, { forwardRef, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet } from 'react-native';
import { AppIcon } from '../../assets/style/AppIcons';
import useStyles from './styles/Fstyles';

const Finput = forwardRef((props, ref) => {
    const {
        style,
        type = 'text',
        leftIcon,
        rightIcon,
        validation,
        onValueChange,
        ...otherProps
    } = props;

    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const styles = useStyles();

    // Map custom type to keyboardType
    const getKeyboardType = () => {
        switch (type) {
            case 'number':
                return 'numeric';
            case 'phone':
                return 'phone-pad';
            case 'text':
            default:
                return 'default';
        }
    };

    const validateInput = (value) => {
        if (validation) {
            if (validation.minLength && value.length < validation.minLength) {
                return false;
            }

            if (validation.maxLength && value.length > validation.maxLength) {
                return false;
            }

            if (validation.validNumber && isNaN(Number(value))) {
                return false;
            }

            const wordCount = value.split(/\s+/).length;
            if (validation.minWordsCount && wordCount < validation.minWordsCount) {
                return false;
            }

            if (validation.maxWordCount && wordCount > validation.maxWordCount) {
                return false;
            }
        }

        return true;
    };

    const handleChange = (text) => {
        const valid = validateInput(text);
        setIsValid(valid);
        setValue(text);
        if (onValueChange) onValueChange(text);
    };

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    return (
        <View style={[styles.container, !isValid && styles.errorBorder, style]}>
            {leftIcon && (
                <AppIcon name={leftIcon} size={24} style={styles.icon} />
            )}

            <TextInput
                style={styles.input}
                keyboardType={getKeyboardType()}
                onChangeText={handleChange}
                secureTextEntry={type === 'secure'}
                value={value}
                {...otherProps}
            />

            {rightIcon && (
                <AppIcon name={leftIcon} size={24} style={styles.icon} />
            )}
        </View>
    );
});

Finput.propTypes = {
    style: PropTypes.object,
    type: PropTypes.oneOf(['number', 'text', 'phone', 'pin', 'secure']),
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
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
