import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View, KeyboardAvoidingView, Image, Modal, Text } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import InputBox from '../components/InputBox';
import StylableButton from '../components/StylableButton';
import { useHeaderHeight } from '@react-navigation/elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import IP from .env
import { MY_IP_ADDRESS } from '@env';

const Login = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const { control, handleSubmit, errors } = useForm();

    //state for handling users inputted email and password
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    //state for handling the visibility of the modal
    const [modalVisible, setModalVisible] = useState(false);

    //state for handling content of the modal
    const [modalBody, setModalBody] = useState('');

    const onSubmit = data => console.log(data);
    const headerHeight = useHeaderHeight();

    // handle logging in user by matching email and password in database
    const loginUser = async () => {
      try {

        // fetch using IPv4
        const response = await fetch(`http://${MY_IP_ADDRESS}:3000/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail.toLowerCase(), password: userPassword }),
        });
        // response is not 200
        if (!response.ok) {
          // Server error
          if (response.status === 500) {
            setModalBody('Server may be experiencing issues');
            setModalVisible(true);
          // login credentials are invalid
          } else {
            const responseData = await response.json();
            setModalBody(responseData.message);
            setModalVisible(true);
          }
        // response is 200
        } else {
          // login successful, store login token in AsyncStorage
          const responseData = await response.json();
          const token = responseData.token;
          await AsyncStorage.setItem('userToken', token);

          console.log('Navigating to Home screen...');
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    return (
        <View style={[styles.container, { width }]}>
          <Modal
            animationType='fade'
            transparent
            visible={modalVisible}>
            <View style={[styles.modalBackground, { width, height }]}>
              <View style={styles.modalContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>Error</Text>
                  <Text style={styles.body}>{modalBody}</Text>
                </View>
                <StylableButton 
                  text='Ok'
                  style={[{width: '90%'}, styles.submitContainer, styles.submitText]}
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </Modal>
          <View style={[styles.inputContainer, { width }]}>
            <Image source={require('../assets/feather.png')} style={styles.logo}/>
            <Controller
              control={control}
              rules={{ required: true, minLength: 3, maxLength: 254 }}
              render={({ onChange, onBlur, value }) => (
                <InputBox 
                  placeholder='Email'
                  autoFocus={true}
                  onChange={(userEmail) => setUserEmail(userEmail)}
                  value={userEmail}
                />
              )}
              name="firstName"
            />
            <Controller
              control={control}
              rules={{ required: true, minLength: 10, maxLength: 20}}
              render={({ onChange, onBlur, value }) => (
                <InputBox 
                  placeholder='Password'
                  autoFocus={false}
                  onChange={(userPassword) => setUserPassword(userPassword)}
                  value={userPassword}
                />
              )}
              name="lastName"
            />
          </View>
          <KeyboardAvoidingView 
            style={[styles.buttonContainer, {width}]} 
            keyboardVerticalOffset={headerHeight}  
            behavior='padding'
          >
            <StylableButton 
              text='submit' 
              style={[styles.TOpacity, styles.submitContainer, styles.submitText]} 
              onPress={loginUser}
            />
            <StylableButton 
              text='Need help?' 
              style={[{width: '70%', paddingBottom: 20}, styles.helpContainer, styles.helpText]}
              onPress={()=> setModalVisible(true)}
            />
              </KeyboardAvoidingView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: '1',
      backgroundColor: '#000000',
    },
    modalBackground: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
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
    textContainer: {
      height: '60%',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    title: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold'
    },
    body: {
      color: 'white',
      fontSize: 16
    },
    inputContainer: {
      flex: '0.7',
      paddingTop: 20,
      alignItems: 'center',
    },
    logo: {
      height: 80,
      width: 80
    },
    buttonContainer: {
      paddingBottom: 10,
      flex: '0.3',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    TOpacity: {
      width: '70%',
    },
    submitContainer: {
      borderRadius: 30,
      paddingVertical: 11,
      marginBottom: 10,
      backgroundColor: '#4E9F3D',
    },
    submitText: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center'
    },
    helpContainer: {
      borderRadius: 30,
      paddingVertical: 11,
      paddingHorizontal: '30%',
      backgroundColor: '#000000',
      borderColor: '#7F8487',
      borderWidth: 1

    },
    helpText: {
      color: '#7F8487',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center'
    }
});

export default Login;