import React, { forwardRef }from 'react';
import PropTypes        from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient   from 'react-native-linear-gradient';
import useStyle         from '../../assets/style/style';

const Fbutton = forwardRef(({
    text,
    onPress,
    onLongPress,
    color,
    textColor,
    fluid,
    buttonStyle={},
    ...otherProps
}, ref) => {
    const gradientColors = [
        color,
        darkenColor(color, 0.2),
    ];
    const STYLES = useStyle();

    return (
        <TouchableOpacity
            ref={ref}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
            {...otherProps}
        >
            <LinearGradient
                colors={gradientColors}
                style={[(fluid && styles.fluidButton), styles.button, buttonStyle]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Text style={[{...STYLES.generalTextstyle}, styles.buttonText, { color: textColor }]}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
});

const darkenColor = (color, percent) => {
    let num = parseInt(color.replace("#", ""), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) - amt;
    let G = ((num >> 8) & 0x00FF) - amt;
    let B = (num & 0x0000FF) - amt;

    R = (R < 255) ? R : 255;  
    G = (G < 255) ? G : 255;  
    B = (B < 255) ? B : 255;  

    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;

    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8, // sharp rounded corners
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        elevation: 2
    },
    fluidButton: {
        width: Dimensions.get('window').width - 30, // subtracting side paddings
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600"
    },
});

Fbutton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    color: PropTypes.string,
    textColor: PropTypes.string,
    fluid: PropTypes.bool,
    buttonStyle: PropTypes.object
};

Fbutton.defaultProps = {
    color: '#3498db',
    textColor: '#ffffff',
};

export default Fbutton;
