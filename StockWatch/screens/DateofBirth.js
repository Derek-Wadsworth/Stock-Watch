import React, { useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

// component imports
import StylableButton from '../components/StylableButton';
import InputBox from '../components/InputBox';

// import IP from .env
import { MY_IP_ADDRESS } from '@env';

const DateofBirth = ({ route, navigation }) => {
  // get params from FullName screen
  const { email } = route.params;
  
  // state for handling user entered phone number and visibility of warning
  const [date, setDate] = useState('');
  const backgroundText = 'MM / DD / YYYY';
  const [showWarning, setShowWarning] = useState(false);

  const { width, height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  // format date using '/'
  const handleDateChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, '');

    let formattedDate = '';
    for (let i = 0; i < cleanedText.length; i++) {
      if (i === 2 || i === 4) {
        formattedDate += '/';
      }
      formattedDate += cleanedText[i];
    }
    if (formattedDate.length <= 10) {
      // Update the state with the formatted date
      setDate(formattedDate);
    }
  };

  //handle updating a user in the db with entered date of birth
  const updateDateofBirth = async() => {
    try {
      console.log('trying to update user\'s date of birth...');

      // fetch using IPv4 NOTE
      const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/dateofBirth`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email, dateofBirth: date }),
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
        <Text style={styles.header}>What's your date of birth?</Text>
        <Text style={styles.info}>We're legally required to collect this information</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputBox
          placeholder='MM / DD / YYYY'
          placeholderTextColor={'#7F8487'}
          style={styles.input}
          textAlign='center'
          autoCorrect={false}
          autoFocus={true}
          keyboardAppearance='dark'
          keyboardType='numeric'
          onChange={handleDateChange}
          value={date}
        />
        {/* conditionally render warning */}
        {showWarning && ( 
          <Text style={styles.warning}>Please enter a valid date</Text>
        )}
      </View>
      <KeyboardAvoidingView style={[styles.footer, {width}]} keyboardVerticalOffset={headerHeight} behavior='padding'> 
        <StylableButton
          text='Continue'
          style={[styles.TOpacity, styles.continueContainer, styles.continueText]}
          onPress={updateDateofBirth}
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

    // width: '90%',
    // alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // borderRadius: 5,
    // borderColor: 'white',
    // borderWidth: 2,
    // marginBottom: 10,
    // backgroundColor: 'red'
  },
  input: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    fontWeight: '400',
    borderWidth: 2,
  },
  warning: {
    fontSize: 16,
    padding: 5,
    color: 'red',
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

export default DateofBirth;