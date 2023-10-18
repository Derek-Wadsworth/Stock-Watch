import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, useWindowDimensions, Animated } from 'react-native';

// component imports
import LandingFlatListItem from '../components/LandingFlatListItem';
import slides from '../data/slides';
import Footer from '../components/Footer';

const Landing = ({ navigation }) => {

    const { width, height } = useWindowDimensions();
    const xPos = React.useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={[{ width, height }, {backgroundColor: '#000000'}]}>
            <FlatList
            data = {slides}
            renderItem={({ item }) => <LandingFlatListItem item = {item} width={width}/>}
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            bounces={false}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: xPos}}}], {useNativeDriver: false})}
            />
            <Footer navigation={ navigation } xPos={xPos}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
})

export default Landing;