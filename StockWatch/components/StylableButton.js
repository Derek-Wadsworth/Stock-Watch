import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const StylableButton = ({ text, onPress, disabled, style }) => {
    return(
        <TouchableOpacity onPress={onPress} style={style[0]} disabled={disabled}>
            <View style={style[1]}>
                <Text style={style[2]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default StylableButton;