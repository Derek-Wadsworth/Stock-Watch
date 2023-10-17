import React, {useState} from 'react';
import { View, Text, useWindowDimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useHeaderHeight } from '@react-navigation/elements';
import InputBox from '../components/InputBox';
import StylableButton from '../components/StylableButton';

// import IP from .env
import { MY_IP_ADDRESS } from '@env';

const Password = ({ route, navigation }) => {
    // get param from email screen
    const { email } = route.params;

    // state for handling user entered password
    const [userPassword, setUserPassword] = useState('');

    const { control, handleSubmit, errors } = useForm();
    const { width, height } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    // handle updating a user in the db with entered password
    const updatePassword = async () => {
      try {
          console.log('trying to update user\'s password...');

          // fetch using IPv4 NOTE
          const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/password`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({email: email, password: userPassword }),
          });

          if (response.status === 200) {
              // password is updated, navigate to next part of signup process
              console.log('Navigating to Password screen...');
              navigation.navigate('FullName', { email : email });
          } else if (response.status === 404) {
              // no user found for the given email
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
        <View style={[styles.container, { width, height } ]}>
          <View style={[styles.textContainer, {width}]}>
            <Text style={styles.header}>Please choose a password.</Text>
            <Text style={styles.info}>Password must contain a capital letter, number, and special symbol.</Text>
          </View>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
              <InputBox 
                placeholder='Password' 
                autoFocus={true}
                onChange={(userPassword) => setUserPassword(userPassword)}
                value={userPassword}
              />
            )}
            name="Password"
            rules={{ required: true }}
            defaultValue=''
            />
          </View>
          <KeyboardAvoidingView style={[styles.footer, {width}]} keyboardVerticalOffset={headerHeight} behavior='padding'>
            <StylableButton 
              text='Continue' 
              style={[styles.TOpacity, styles.ContinueContainer, styles.ContinueText]} 
              onPress={updatePassword}
            />
          </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
    },
    textContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: '0.4',
    },
    header: {
      fontSize: 28,
      paddingTop: 15,
      color: 'white'
    },
    info: {
      width: '80%',
      paddingTop: 15,
      fontSize: 16,
      textAlign: 'center',
      color: 'white'
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0.2',
    },
    input: {
        width: '90%',
        height: 45,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1
    },
    footer: {
      flex: '0.4',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#000000'
    },
    TOpacity: {
      width: '80%',
      paddingBottom: 20
    },
    ContinueContainer: {
      borderRadius: 30,
      paddingVertical: 11,
      marginBottom: 10,
      backgroundColor: '#4E9F3D',
    },
    ContinueText: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center'
    }
});

export default Password;