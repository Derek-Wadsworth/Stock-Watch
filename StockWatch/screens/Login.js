import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View, KeyboardAvoidingView, Image, Modal, Text } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import InputBox from '../components/InputBox';
import StylableButton from '../components/StylableButton';
import { useHeaderHeight } from '@react-navigation/elements'

const Login = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const { control, handleSubmit, errors } = useForm({
      defaultValues: {
        email: '',
        password: ''
      }
    });

    //state for handling the visibility of the modal
    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = data => console.log(data);
    const headerHeight = useHeaderHeight();

    //function for handling authentication of users
    const auth = () => {
      fetch('localhost:3000/login')
      .then(() => navigation.navigate('Landing'))
      .catch(() => setModalVisible(true))
    }

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
                  <Text style={styles.body}>Unable to log in with provided credentials</Text>
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
              onPress={()=> setModalVisible(true)}
            />
            <StylableButton 
              text='Need help?' 
              style={[{width: '70%', paddingBottom: 20}, styles.helpContainer, styles.helpText]}
              onPress={()=> navigation.navigate('Landing')}
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