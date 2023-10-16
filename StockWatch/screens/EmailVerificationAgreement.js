import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import StylableButton from '../components/StylableButton';

// import IP from .env
import { MY_IP_ADDRESS } from '@env';

const EmailVerificationAgreement = ({ route, navigation }) => {
    
    const { width, height } = useWindowDimensions();

    // get params from Email screen
    const {email} = route.params;

    // handle sending verification email and navigating to next signup step if button is clicked
    const sendVerificationEmail = async () => {
        try {
            
            // fetch using IPv4 NOTE: PUT THIS VAR IN .env file LATER
            const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/email/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            if (response.status === 200) {
                // email has been sent, navigate to the EmailVerificationEntry screen
                console.log('Navigating to EmailVerificationEntry screen...');
                navigation.navigate('EmailVerificationEntry', { email: email });
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
                <Text style={styles.infoTitle}>Verify your email address</Text>
                <Text style={styles.infoBody}>We'll send you a email with a unique verification link. It expires 10 minutes after you request it. Learn more</Text>
            </View>
            <View style={styles.emailContainer}>
                <Text style={styles.email}>{email}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.terms}>You are consenting to be contacted via this email address for the purpose of receiving a verification link from StockWatch. Your device will only be used consistent with our Privacy Policy</Text>
                <StylableButton 
                text='Send Email' 
                style={[styles.TOpacity, styles.continueContainer, styles.continueText]} 
                onPress={sendVerificationEmail}
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
        flex: '0.3',
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
    emailContainer: {
        alignItems: 'center',
        flex: 'flex-start',
        flex: '0.3',
    },
    email: {
        fontSize: 18,
        color: 'white',
        paddingTop: 30,
    },
    buttonContainer: {
        flex: '0.4',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    terms: {
        textAlign: 'center',
        padding: 10,
        fontSize: 14,
        color: '#7F8487',
    },
    TOpacity: {
        width: '80%',
        paddingBottom: 20,
        paddingTop: 20,
    },
    continueContainer: {
        borderRadius: 30,
        paddingVertical: 11,
        marginBottom: 10,
        backgroundColor: '#4E9F3D',
    },
    continueText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default EmailVerificationAgreement;