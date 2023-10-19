import React, { useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

// component imports
import StylableButton from '../components/StylableButton';
import InputBox from '../components/InputBox';

// import IP from .env
import { MY_IP_ADDRESS } from '@env';

const PhoneNumber = ({ route, navigation }) => {
  // get params from FullName screen
  const { email, code } = route.params;
  
  // state for handling user entered phone number and visibility of warning
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const { width, height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  // handle updating a user in the db with entered phone-number
  const updatePhoneNumber = async () => {
    try {
      console.log('trying to update user\'s password...');

      // fetch using IPv4 NOTE
      const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/phoneNumber`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email, phoneNumber: phoneNumber }),
      });
      if (response.status === 400) {
          // email format is invalid, throw warning
          setShowWarning(true);
      } else if (response.status === 200) {
          // password is updated, navigate to next part of signup process
          console.log('Navigating to Landing screen...');
          navigation.navigate('Landing', { email : email });
      } else if (response.status === 404) {
          // no user found for the given email
          console.error('Error', `No user found for given phone number ${phoneNumber}`);
      } else {
          // server error
          console.log('Server error...');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <View style={[styles.container, { width, height } ]}>
      <View style={[styles.textContainer, {width}]}>
        <Text style={styles.header}>What's your phone number?</Text>
        <Text style={styles.info}>We'll send you a six-digit code. It expires 5 minutes after you request it.</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.areaCodeContainer}>
            <Text style={styles.areaCodeText}>{code}</Text>
            <InputBox
              placeholder='Phone Number'
              placeholderTextColor={'#7F8487'}
              style={styles.input}
              autoCorrect={false}
              autoFocus={true}
              keyboardAppearance='dark'
              keyboardType='numeric'
              onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
              value={phoneNumber}
            />
        </View>
        {/* conditionally render warning */}
        {showWarning && ( 
          <Text style={styles.warning}>Please enter a valid phone number</Text>
        )}
        <TouchableOpacity
          style={[styles.touchable, { width }]}
          onPress={() => { navigation.navigate('CountryPicker')}}
        >
          <Text style={styles.touchableText}>Change country code</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={[styles.footer, {width}]} keyboardVerticalOffset={headerHeight} behavior='padding'> 
        <StylableButton
          text='Continue'
          style={[styles.TOpacity, styles.continueContainer, styles.continueText]}
          onPress={updatePhoneNumber}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  textContainer:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: '0.4',
  },
  header: {
    fontSize: 28,
    paddingTop: 15,
    color: 'white',
  },
  info: {
    width: '80%',
    paddingTop: 15,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  inputContainer: {
    flex: '0.2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaCodeContainer: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 10,
  },
  areaCodeText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400'
  },
  input: {
    width: '50%',
    height: 50,
    fontSize: 16,
    fontWeight: '400',
    borderWidth: 0,
    marginBottom: 0,
  },
  warning: {
    fontSize: 16,
    color: 'red',
  },
  touchable: {
    alignItems: 'center',
  },
  touchableText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flex: '0.4',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  TOpacity: {
    width: '70%',
  },
  continueContainer:{
    borderRadius: 30,
    paddingVertical: 11,
    marginBottom: 10,
    backgroundColor: '#4E9F3D',
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
    textAlign: 'center',
  }
});

export default PhoneNumber;