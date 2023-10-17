import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const PhoneNumber = ({ navigation }) => {
  const [areaCode, setAreaCode] = useState('123'); // Replace '123' with your actual area code
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.areaCodeContainer}>
        <Text style={styles.areaCodeText}>{areaCode}</Text>
      </View>
      <TextInput
        style={styles.phoneNumberInput}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  areaCodeContainer: {
    marginRight: 10,
  },
  areaCodeText: {
    fontSize: 16,
    color: 'black',
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default PhoneNumber;