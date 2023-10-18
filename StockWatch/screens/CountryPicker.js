import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, useWindowDimensions, Animated } from 'react-native';

// component imports
import CountryFlatListItem from '../components/CountryFlatListItem';
import countries from '../data/countries';

const CountryPicker = ({ route, navigation }) => {
    const { width, height } = useWindowDimensions();

    return (
        <View style={[{ width, height }, styles.container]}>
            <FlatList
                data={countries}
                renderItem={({ item }) => <CountryFlatListItem item = {item} navigation={navigation}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center'
    }
})

export default CountryPicker;