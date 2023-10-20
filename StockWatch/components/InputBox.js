import React, {useState} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const InputBox = ({placeholder, autoFocus, onChange, textAlign, onBlur, value, keyboardType, style }) => {
    //state for handling focusing and blurring of TextInput
    const [focus, changeFocus] = useState(false);

    return(
        <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#7F8487'}
        style={[styles.input, focus? styles.focus : null, style]}
        textAlign={textAlign}
        autoCorrect={false}
        autoFocus={autoFocus}
        keyboardAppearance='dark'
        keyboardType={keyboardType}
        onBlur={()=>changeFocus(false)}
        onFocus={()=>changeFocus(true)}
        onChangeText={onChange}
        value={value}
      />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 40,
        paddingHorizontal: 15,
        borderWidth: 1,
        paddingVertical: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#7F8487',
        color: 'white',
        borderRadius: 8,
        fontSize: 16,
    },
    focus: {
        borderColor: 'white',
    },
});

export default InputBox;