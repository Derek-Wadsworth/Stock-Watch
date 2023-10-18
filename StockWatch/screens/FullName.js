import React, {useState} from 'react';
import { View, Text, useWindowDimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useHeaderHeight } from '@react-navigation/elements';
import InputBox from '../components/InputBox';
import StylableButton from '../components/StylableButton';

// import IP from .env
import { MY_IP_ADDRESS } from '@env';

const FullName = ({ route, navigation }) => {
    // get params from password screen
    const { email } = route.params;

    // state for handling user first name
    const [userFName, setUserFName] = useState('');

    // state for handling user last name 
    const [userLName, setUserLName] = useState('');

    const { control, handleSubmit, errors } = useForm();
    const { width, height } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    // handle updating a user in the db with entered first and last name
    const updateName = async () => {
      try {
        console.log('trying to update user\'s name...');

        // fetch using IPv4 
        const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/fullName`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email, 
            firstName: userFName,
            lastName: userLName }),
          });

          if (response.status === 200) {
            // name is updated, navigate to next part of signup process
            console.log('Navigating to PhoneNumber screen...');
            navigation.navigate('PhoneNumber', { email : email, code: '+1' });
          } else if (response.status === 404) {
            // no user found for given email
            console.error('Error', `No user found for given email ${email}`);
          } else {
            // server error
            console.log('Server error...');
          }
      } catch (error) {
          console.error('Error', error);
      }
    };

    return(
        <View style={[styles.fullNameContainer, { width, height }]}>
          <View style={[styles.textContainer, { width, height } ]}>
            <Text style={styles.title}>What is your full name?</Text>
            <Text style={styles.info}>Please answer how your name would appear on an official document.</Text>
          </View>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <InputBox 
                  placeholder='First Name' 
                  autoFocus={true}
                  onChange={(userFName) => setUserFName(userFName)}
                  value={userFName}
                />
              )}
              name="firstName"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <InputBox 
                  placeholder='Last Name'
                  autoFocus={false}
                  onChange={(userLName) => setUserLName(userLName)}
                  value={userLName}
                />
              )}
              name="lastName"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <KeyboardAvoidingView style={[styles.footer, {width}]} keyboardVerticalOffset={headerHeight} behavior='padding'>
            <StylableButton 
              text='Continue' 
              style={[styles.TOpacity, styles.continueContainer, styles.continueText]} 
              onPress={updateName}
            />
          </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullNameContainer: {
      flex: 1,
      backgroundColor: '#000000',
    },
    textContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: '0.4'
    },
    title: {
      fontSize: 28,
      paddingTop: 15,
      color: 'white'
    },
    info: {
      width: '80%',
      paddingTop: 15,
      fontSize: 16,
      textAlign: 'center',
      color: 'white',
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0.2'
    },
    footer: {
      flex: '0.4',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    TOpacity: {
      width: '80%',
      paddingBottom: 20
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

export default FullName;