import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const StylableButton = ({ text, onPress, style }) => {
    return(
        <TouchableOpacity onPress={onPress} style={style[0]}>
            <View style={style[1]}>
                <Text style={style[2]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default StylableButton;