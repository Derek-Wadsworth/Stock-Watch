import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import StylableButton from './StylableButton';
import Indicator from './Indicator.js';

// use navigation prop from Parent to change screen when button is clicked
const Footer = ( { navigation, xPos } ) => {
    return(
      <View style={ styles.container }>
        <Indicator xPos={xPos}/>
        <View style={ styles.buttonContainer }>
          <StylableButton 
            text='Log in' 
            style={[styles.TOpacity, styles.LogInContainer, styles.LogInText]} 
            onPress={() => navigation.navigate('Login')}
          />
          <StylableButton 
            text='Sign up' 
            style={[styles.TOpacity, styles.SignUpContainer, styles.SignUpText]}
            onPress={() => navigation.navigate('Email')}
          />
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '20%',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    TOpacity: {
        width: '40%'
    },
    LogInContainer: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#000000',
        paddingVertical: 11,
        marginBottom: 10,
        backgroundColor: 'transparent',
    },
    LogInText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
      },
      SignUpContainer: {
        borderRadius: 30,
        paddingVertical: 11,
        marginBottom: 10,
        backgroundColor: '#000000',
      },
      SignUpText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
      }
  });

  export default Footer;
  