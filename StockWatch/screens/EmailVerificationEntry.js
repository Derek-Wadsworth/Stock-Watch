import React, {useEffect, useState} from 'react';
import { View, Text, useWindowDimensions, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import StylableButton from '../components/StylableButton';

// import IP from .env
import { MY_IP_ADDRESS } from '@env';

const EmailVerificationEntry = ({ route, navigation }) => {

    const { width, height } = useWindowDimensions();
    
    // get params from EmailVerificationAgreement screen
    const {email} = route.params;

    // fetch email verification data from backend once component is mounted
    useEffect(() => {
        emailVerificationStatus();
    }, []);

    // handle verifying email and navigating to next signup step if verification successful
    const emailVerificationStatus = async () => {
        try {
            console.log('We are in the try block');

            // create object with query parameters
            const params = new URLSearchParams();
            params.append('email', email);
            // fetch using IPv4 NOTE: PUT THIS VAR IN .env file LATER
            const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/email/verify/user?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // email is verified, navigate to next part of signup process
                console.log('Navigating to Password screen...');
                navigation.navigate('Password', { email : email });
            } else if (response.status === 403) {
                // email has not yet been verified, so check verification status in 10 sec
                setTimeout(emailVerificationStatus, 10000);
            } else {
                // server error
                console.log('Server error...');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    return(
        <View style={[styles.screenContainer, { width, height }]}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Verify your email</Text>
                <Text style={styles.infoBody}>An email with a verification link has been sent to</Text>
                <Text style={styles.infoEmail}>{email}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.resend}>Didn't receive it?</Text>
                <StylableButton 
                text='Resend code' 
                style={[styles.TOpacity, styles.resendContainer, styles.resendText]} 
                onPress={() => { console.log('Hello')}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: '0.5',
    },
    infoTitle: {
        fontSize: 28,
        paddingTop: 15,
        color: 'white',
    },
    infoBody: {
        fontSize: 16,
        paddingTop: 25,
        textAlign: 'center',
        color: 'white'
    },
    infoEmail: {
        fontSize: 18,
        color: 'white',
        paddingTop: 30,
    },
    buttonContainer: {
        flex: '0.5',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    resend: {
        textAlign: 'center',
        fontSize: 14,
        color: '#7F8487',
    },
    TOpacity: {
        width: '80%',
        paddingBottom: 20,
        paddingTop: 20,
    },
    resendContainer: {
        borderRadius: 30,
        paddingVertical: 11,
        marginBottom: 10,
        backgroundColor: '#4E9F3D',
    },
    resendText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default EmailVerificationEntry;