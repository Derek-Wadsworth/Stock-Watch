import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// screen imports
import Loading from './screens/Loading';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Email from './screens/Email';
import EmailVerificationAgreement from './screens/EmailVerificationAgreement';
import EmailVerificationEntry from './screens/EmailVerificationEntry';
import Password from './screens/Password';
import FullName from './screens/FullName';
import PhoneNumber from './screens/PhoneNumber';
import CountryPicker from './screens/CountryPicker';
import DateofBirth from './screens/DateofBirth';
import Address from './screens/Address';
import AddressConfirmation from './screens/AddressConfirmation';
import Home from './screens/Home';

const Stack = createStackNavigator();

// Navigation between screen
function AppStack() {
  return (
    <Stack.Navigator initialRouteName='Loading' screenOptions={{ headerMode: 'screen'}}>
      <Stack.Screen name='Loading' component={ Loading } options={{ headerShown: false}}/>
      <Stack.Screen name='Landing' component={ Landing } options={{ headerShown: false}}/>
      <Stack.Screen 
        name="Login" 
        component={ Login } 
        options={{
          gestureEnabled: false, 
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 30, width: 30, margin: 5 }} source={require('../StockWatch/assets/return.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen 
        name="Email"
        component={ Email }
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 30, width: 30, margin: 5 }} source={require('../StockWatch/assets/return.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen 
        name="EmailVerificationAgreement"
        component={ EmailVerificationAgreement }
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 30, width: 30, margin: 5 }} source={require('../StockWatch/assets/return.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen 
        name="EmailVerificationEntry"
        component={ EmailVerificationEntry }
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 30, width: 30, margin: 5 }} source={require('../StockWatch/assets/return.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen
        name="Password"
        component={ Password }
        options={{
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 20, width: 20, margin: 5 }} source={require('../StockWatch/assets/backArrow.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen
        name="FullName"
        component={ FullName }
        options={{
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 20, width: 20, margin: 5 }} source={require('../StockWatch/assets/backArrow.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={ PhoneNumber }
        options={{
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 20, width: 20, margin: 5 }} source={require('../StockWatch/assets/backArrow.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen
        name="CountryPicker"
        component={ CountryPicker }
        options={{
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 20, width: 20, margin: 5 }} source={require('../StockWatch/assets/backArrow.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
       <Stack.Screen
        name="DateofBirth"
        component={ DateofBirth }
        options={{
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 20, width: 20, margin: 5 }} source={require('../StockWatch/assets/backArrow.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen
        name="Address"
        component={ Address }
        options={{
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 20, width: 20, margin: 5 }} source={require('../StockWatch/assets/backArrow.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen
        name="AddressConfirmation"
        component={ AddressConfirmation }
        options={{
          gestureEnabled: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (<Image style={{ height: 20, width: 20, margin: 5 }} source={require('../StockWatch/assets/backArrow.png')}/>), 
          headerStyle: {backgroundColor: '#000000', shadowColor: 'transparent'}}}
      />
      <Stack.Screen
        name="Home"
        component={ Home }
        options={{
          headerShown: false,
          gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppStack/>
    </NavigationContainer>
  );
}
