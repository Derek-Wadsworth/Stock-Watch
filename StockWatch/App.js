import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screen imports
import Landing from './screens/Landing';

const Stack = createNativeStackNavigator();

// Navigation between screen
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'screen'}}>
      <Stack.Screen name='Landing' component={ Landing } options={{ headerShown: false}}/>
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
