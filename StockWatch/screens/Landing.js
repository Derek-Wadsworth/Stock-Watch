import * as React from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// component imports
import Footer from '../components/Footer';


const Landing = ({ navigation }) => {

    const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    const xPos = React.useRef(new Animated.Value(0)).current;

    const { width, height } = useWindowDimensions();

    // look for userToken, if token exists, navigate to the user's Home screen
    // if token does not exist, remain on Landing page
    React.useEffect(() => {
        const tokenCheck = async () => {
            const userToken = await AsyncStorage.getItem('userToken');

            // token exists, navigate to Home screen
            if (userToken) {
                navigation.navigate('Home');
            }
        }

        tokenCheck();
    }, []);

    // interpolation for the height of Animted View
    const viewHeight = xPos.interpolate({
        inputRange: [width/2, width],
        outputRange: [0, height/2],
        extrapolate: 'clamp',
    });

    // interpolation for sliding content of Animated View
    const slideRow = xPos.interpolate({
        inputRange: [width, width * 4],
        outputRange: [0, width * 3],
        extrapolate: 'clamp',
    });

    // interpolation for sliding Lotties in the Y direction
    const lottieSlideY = xPos.interpolate({
        inputRange: [width/2, width, width * 2, width * 3],
        outputRange: [0, -height, -(2 * height + height/2), -(2 * height + 2*height) + 20],
        extrapolate: 'clamp',
    });

    // interpolation for opacity of Lotties when sliding in the Y direction
    const lottieOpacityY = xPos.interpolate({
        inputRange: [width/2, width, 3*width/2, width * 2, 5*width/2, width * 3],
        outputRange: [0, 1, 0, 1, 0, 1],
        extrapolate: 'clamp',
    })

    // interpolation of opacity for content of phone.js
    const lottieOpacity = xPos.interpolate({
        inputRange: [0, width*0.5],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    })

    // interpolation of background colors for FlatList Items
    const backgroundColor = xPos.interpolate({
        inputRange: [0, width, width * 2, width * 3],
        outputRange: ['#fff', '#85a3e0', '#ffea00', '#c4ff4d'],
        extrapolate: 'clamp',
    })

    return (
        <View style = {{width: width, height: height}}>
            <Animated.View style={{position: 'absolute', width: width, height: height, alignItems: 'center', backgroundColor: backgroundColor}}>
                <Animated.View style={{paddingTop: 110, opacity: lottieOpacity}}> 
                    <Text style={{fontSize: 40, color: '#493d8a', textAlign: 'center'}}>Welcome to StockWatch</Text>
                    <Text style={{textAlign: 'center', paddingHorizontal: 64}}>Get access to the tools you need to invest, spend, and put your money in motion.</Text>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Swipe to learn more</Text>
                </Animated.View>
                <Animated.View style={{width: width*0.9, paddingTop: 15, opacity: lottieOpacity}}>
                    <LottieView
                        style={{width: '100%', aspectRatio: 1}}
                        source={require('../assets/phone.json')}
                        autoPlay
                        loop
                    />
                </Animated.View>
            </Animated.View>
            <Animated.View style={{position: 'absolute', top: lottieSlideY, left: 0, height: 4*height, width: width, flexDirection: 'column', alignItems: 'center'}}>
                <Animated.View style={{height: height/2, width: width, top: height, opacity: lottieOpacityY}}>
                    <Image source={require('../assets/calculator-PhotoRoom.png-PhotoRoom.png')} style={{width: '100%', height: '100%'}}/>
                </Animated.View>
                <Animated.View style={{height: height/2, width: width, top: height*2, opacity: lottieOpacityY}}>
                    <Image source={require('../assets/laptop-PhotoRoom.png-PhotoRoom.png')} style={{width: '100%', height: '100%'}}/>
                </Animated.View>
                <Animated.View style={{height: height/2, width: width, top: height*3, opacity: lottieOpacityY}}>
                    <Image source={require('../assets/lock-PhotoRoom.png-PhotoRoom.png')} style={{width: '100%', height: '100%'}}/>
                </Animated.View>
            </Animated.View>
            <Animated.FlatList
                style={{zIndex: 1, elevation: 1}}
                data={data}
                renderItem={({item}) => (
                    <View style={[styles.item, {width: width}]}>
                    </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {x: xPos}}}], {useNativeDriver: false})}
            >
            </Animated.FlatList>
            <Footer  xPos={xPos} navigation={navigation}/>
            <Animated.View style={[styles.slidesContainer, {height: viewHeight}]}>
                <Animated.View style={{flexDirection: 'row', right: slideRow}}>
                    <View style={{width: width, height: height * 0.3, alignItems: 'center'}}>
                        <View style={{width: '90%', height: '100%', justifyContent: 'space-evenly'}}>
                            <Text style={styles.slideTitle}>Investing made for everyone</Text>
                            <Text style={styles.slideBody}>You're protected with security measures like encryption and two-factor authentication, and you have access to in-app phone support 24/7</Text>
                            <Text style={styles.slideFooter}>Securities trading is offered through Robinhood Financial, member SIPC and FINRA.</Text>
                        </View>
                    </View>
                    <View style={{width: width, height: height * 0.3, alignItems: 'center'}}>
                        <View style={{width: '90%', height: '100%', justifyContent: 'space-evenly'}}>
                            <Text style={styles.slideTitle}>Start with just $1</Text>
                            <Text style={styles.slideBody}>Account minimums? Commission fees? Never heard of them. Invest with as much as you'd like and get your money's worth every time.</Text>
                            <Text style={styles.slideFooter}>Limitations and other fees may apply. View our Customer Agreement and fee schedule to learn more.</Text>
                        </View>
                    </View>
                    <View style={{width: width, height: height * 0.3, alignItems: 'center'}}>
                        <View style={{width: '90%', height: '100%', justifyContent: 'space-evenly'}}>
                            <Text style={styles.slideTitle}>We've got you covered</Text>
                            <Text style={styles.slideBody}>You're protected with security measures like encryption and two-factor authentication, and you have access to in-app phone support 24/7.</Text>
                            <Text style={styles.slideFooter}>Investing involves risk, including loss of principal.</Text>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: '#fff',
    },
    firstItemContainer: {
        height: '100%',
        alignItems: 'center',
    },
    otherItemContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 40,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center'
    },
    description: {
        fontWeight: '300',
        textAlign: 'center',
        paddingHorizontal: 64
    },
    next: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    slidesContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopColor: '#000000', 
        borderTopWidth: 1,
        zIndex: 0,
    },
    slideTitle: {
        fontSize: 40,
    },
    slideBody: {
        fontSize: 14,
    },
    slideFooter: {
        color: 'grey'
    }
});

export default Landing;