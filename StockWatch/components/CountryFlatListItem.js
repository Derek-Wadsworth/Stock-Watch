import React, {useState} from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CountryFlatListItem = ({ navigation, item }) => {

    const { width } = useWindowDimensions();

    // handle changing country code on click of TouchableOpacity
    const changeCountryCode = () => {
        navigation.navigate('PhoneNumber', { code: item.code });
    }

    return(  
        <TouchableOpacity 
            style={[{width}, styles.container]}
            onPress={changeCountryCode}
        >
            <View style={styles.textContainer}>
                <Text style={ styles.country }>{item.name} ({item.code})</Text>
            </View>
        </TouchableOpacity>
    );  
}

const styles = StyleSheet.create({
    container: {
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
        paddingTop: 10,
        width: '90%',
        height: '100%',
        alignItems: 'right',
        justifyContent: 'center',
        borderBottomColor: '#474a4b',
        borderBottomWidth: 0.17,
    },
    country: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: '500',
      color: 'white',
      textAlign: 'center',
    },
});

export default CountryFlatListItem;