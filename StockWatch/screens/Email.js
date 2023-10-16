import React, {useState} from 'react';
import { View, Text, useWindowDimensions, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useHeaderHeight } from '@react-navigation/elements';
import InputBox from '../components/InputBox';
import StylableButton from '../components/StylableButton';

const Email = ({ navigation }) => {
    //state for handling visibility of the modal
    const [modalVisible, setModalVisible] = useState(false);

    //state for handling user inputted email
    const [userEmail, setUserEmail] = useState('');

    // state for handling modal error message
    const [modalMessage, setModalMessage] = useState('');

    const { control, handleSubmit, errors } = useForm();
    const { width, height } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    // handle sending email info to server and either rejecting
    // or accepting email as a response
    const handleClick = async () => {
      try {

        // fetch using IPv4 NOTE: PUT THIS VAR IN .env file LATER
        const response = await fetch(`http://192.168.0.72:3000/signup/email?email=${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // response is not 200
        if (!response.ok) {
          // Server error
          if (response.status === 500) {
            console.error('Server error...');
          // email format is invalid or email is in use
          } else {
            // parse json response for message data
            const responseData = await response.json();
            setModalMessage(responseData.message);
            setModalVisible(true);
          }
        // response is 200
        } else {
          console.log('Navigating to Email Verification screen...');
          navigation.navigate('EmailVerificationAgreement', { email: userEmail });
        }
      } catch (error) {
        console.error('Error', error);
      }
    };
     
    return(
        <View style={[styles.emailContainer, { width, height } ]}>
          <Modal
            animationType='fade'
            transparent
            visible={modalVisible}>
            <View style={[styles.modalBackground, { width, height }]}>
              <View style={styles.modalContainer}>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalTitle}>Error</Text>
                  <Text style={styles.modalInfo}>{modalMessage}</Text>
                </View>
                <StylableButton 
                  text='Ok'
                  style={[{width: '85%'}, styles.continueContainer, styles.continueText]}
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
          <View style={styles.bodyTextContainer}>
            <Text style={styles.bodyTitle}>Please enter your email.</Text>
            <Text style={styles.bodyInfo}>You'll use this to log in.</Text>
          </View>
          <View style={styles.bodyInputContainer}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <InputBox 
                  placeholder='Email Address' 
                  autoFocus={true}
                  onChange={(userEmail) => setUserEmail(userEmail)}
                  value={userEmail}
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <KeyboardAvoidingView style={[styles.footer, {width}]} keyboardVerticalOffset={headerHeight}  behavior='padding'>
            <Text style={styles.terms}>By continuing, you agree to the StockWatch User Account Agreement and Privacy Policy</Text>
            <StylableButton 
              text='Continue' 
              style={[styles.TOpacity, styles.continueContainer, styles.continueText]} 
              onPress={handleClick}
            />
          </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    emailContainer: {
      flex: 1,
      backgroundColor: '#000000',
    },
    modalBackground: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)'
    },
    modalContainer: {
      width: '90%',
      height: '20%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#7F8487',
      backgroundColor: '#3b3b3b'
    },
    modalTextContainer: {
      height: '60%',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    modalTitle: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold'
    },
    modalInfo: {
      color: 'white',
      fontSize: 16
    },
    bodyTextContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: '0.4',
    },
    bodyTitle: {
      fontSize: 28,
      paddingTop: 15,
      color: 'white'
    },
    bodyInfo: {
      fontSize: 16,
      paddingTop: 15,
      textAlign: 'center',
      color: 'white'
    },
    bodyInputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0.2',
    },
    input: {
      width: '90%',
      height: 45,
      borderRadius: 5,
      borderColor: '#7F8487',
      borderWidth: 1
    },
    focus: {
      borderColor: 'white',
    },
    footer: {
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

export default Email;