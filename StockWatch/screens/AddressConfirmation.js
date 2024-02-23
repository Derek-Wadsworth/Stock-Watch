import React, { useEffect, useRef, useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet, Image, Keyboard, Animated, Easing, KeyboardAvoidingView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import MapView, { Marker } from 'react-native-maps';

// component imports
import StylableButton from '../components/StylableButton';
import InputBox from '../components/InputBox';

// .env imports
import { MY_IP_ADDRESS } from '@env';
import { PLACES_API_KEY } from '@env';

const AddressConfirmation = ({ route, navigation }) => {
    // get params from DateofBirth screen
    const { address, city, email, lat, long } = route.params;
    console.log(lat);
    console.log(long);

    const { width, height } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    // state for handling user entered apt number
    const [apt, setApt] = useState('');

    // starting animated value for MapView y position
    const shiftY = useRef(new Animated.Value(0)).current;

    // listener to detect when page is navigated to
    useEffect(() => {
        Animated.timing(shiftY, {
            toValue: 500,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, []);

    // handle updating a user in the db with entered Address
    const updateAddress = async (address) => {
        try {
        console.log('trying to update user\'s Address...');

        if (apt.trim() !== '') {
            // input is not empty, so append it to the end of the addres
            address = address + ' ' + apt;
        }

        // fetch using IPv4 NOTE
        const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/address`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, address: address }),
        });
        if (response.status === 200) {
            // Address is updated, navigate to next part of signup process
            console.log('Navigating to AddressConfirmation screen...');
            navigation.navigate('Home', { email : email, address: address });
        } else if (response.status === 404) {
            // no user found for the given email
            console.error('Error', `No user found for given address ${address}`);
        } else {
            // server error
            console.log('Server error...');
        }
        } catch (error) {
        console.error('Error', error);
        }
    };

    return (
        <View style={[styles.container, { width, height }]}>
            <View style={[styles.contentContainer, {width}]}>
                <View style={styles.textContainer}>
                    <Text style={styles.address}>{address}</Text>
                    <Text style={styles.city}>{city}</Text>
                </View>
                <View style={styles.inputContainer}>
                <InputBox
                    placeholder='Apt, Suite, Bldg #'
                    placeholderTextColor={'#7F8487'}
                    style={styles.input}
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardAppearance='dark'
                    onChange={(apt) => setApt(apt)}
                    value={apt}
                />
                </View>
            </View>
            <KeyboardAvoidingView style={[styles.footer, {width}]} keyboardVerticalOffset={headerHeight} behavior='padding'> 
                <StylableButton
                text='Continue'
                style={[styles.TOpacity, styles.continueContainer, styles.continueText]}
                onPress={() => updateAddress(address + ' ' + city)}
                />
            </KeyboardAvoidingView>
            <Animated.View style={[styles.mapContainer, { height: shiftY }]}>
                <MapView 
                    style={styles.map}
                    provider='google'
                    initialRegion={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.000002,
                        longitudeDelta: 0.000002,
                    }}
                    scrollEnabled={false}
                >
                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: long,
                        }}
                        title='chosen address'
                        description='pin representing chosen address'
                    >
                        <Image
                            source={require('../assets/pin.png')}
                            style={{ width: 40, height: 40 }}
                        />
                    </Marker>
                </MapView>
                
            </Animated.View>
        </View>  
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#000000',
    },
    contentContainer: {
        alignItems: 'center',
        height: '20%',
    },
    textContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    address: {
        fontSize: 28,
        paddingTop: 15,
        color: 'white',
        textAlign: 'center'
    },
    city: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1,
    },
    TOpacity: {
        width: '70%'
    },
    continueContainer: {
        borderRadius: 30,
        paddingVertical: 11,
        marginBottom: 10,
        backgroundColor: '#4E9F3D'
    },
    continueText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    mapContainer: {
         height: 0,
         width: '100%',
         position: 'absolute',
         bottom: 0,
         zIndex: 0,
    }, 
    map: {
        ...StyleSheet.absoluteFillObject,
    }

});

export default AddressConfirmation;