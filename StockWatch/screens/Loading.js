import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import IP from .env
import { MY_IP_ADDRESS } from '@env';

const Loading = ({ navigation }) => {

    const { width, height } = useWindowDimensions();

    // animated value used for controlling opacity of lotties
    const fadeAnim = new Animated.Value(1);
    const brightenAnim = new Animated.Value(0);

    // state for setting user's name if token exists in AsyncStorage
    const [name, setName] = useState('');

    // state for swapping lotties on successful search of token
    const [tokenFound, setTokenFound] = useState(false);

    // state 

    // look for userToken, if token exists, navigate to the user's Home screen
    // if token does not exist, remain on Landing page
    useEffect(() => {
        const tokenCheck = async () => {
            const userToken = await AsyncStorage.getItem('userToken');

            // token exists, fetch user's name from backend and navigate to Home
            if (userToken) {
                fetchName(userToken);

            // token does not exist, navigate user to Landing Screen
            } else {
                navigation.navigate('Landing');
            }
        };

        tokenCheck();
    }, []);

    // function for fetching user's name from backend
    const fetchName = async (token) => {
        try {

            // fetch using IPv4
            const response = await fetch(`http://${MY_IP_ADDRESS}:3000/login/verify`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // response is 200
            if (response.ok) {
                const responseData = await response.json();
                // wait 2 seconds before changing displayed content
                setTimeout(() => {
        
                    setName(responseData.name);

                }, 2000);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    // listen for state updates to handle fading out content and conditional rendering
    useEffect(() => {
        // skip animating on the initial mount
        if (!name) {
            return;
          }

        // fade out loading.json
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            setTokenFound(true);
        });

        

    }, [name]);

    useEffect(() => {
        // skip animating on initial mount
        if (!tokenFound) {
            return;
        }

        // fade in success.json
        Animated.timing(brightenAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        
        // navigate to user Home page after the animation has finished and with a 1 sec delay
        setTimeout(() => {
            navigation.navigate('Home');
        }, 2000);

    }, [tokenFound]);

    return (
        <View style={[styles.container, {height: height, width: width}]}>
            {/* content to be shown before token has been found/not found */}
            {!tokenFound && (
                <Animated.View style={{width: width*0.6, height: width*0.8, opacity: fadeAnim}}>
                    <LottieView
                        style={{width: width*0.6, height: width*0.6}}
                        source={require('../assets/loading.json')}
                        autoPlay
                        loop
                    />
                </Animated.View>
            )}
            {/* content to be shown after token has been found/not found */}
            {tokenFound && (
                <Animated.View style={{width: width, height: height, opacity: brightenAnim}}>
                    <View style={{height: width*0.4, width: width*0.4, marginHorizontal: width*0.3, marginTop: height*0.5 - width*0.4}}>
                        <LottieView
                            style={{width: width*0.4, height: width*0.4}}
                            source={require('../assets/success.json')}
                            autoPlay
                            loop={false}
                        />
                    </View>
                    <View style={[styles.textContainer, {width: width, height: width*0.2}]}>
                        <Text style={styles.text}>Welcome back, {name}</Text>
                    </View>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    text: {
        color: '#ffffff',
        fontSize: 24
    }
});

export default Loading;