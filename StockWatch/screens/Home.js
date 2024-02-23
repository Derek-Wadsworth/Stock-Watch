import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, useWindowDimensions, StyleSheet, Image, Keyboard, Animated, Easing, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screen imports
import Investing from './Investing';
import Search from './Search';
import News from './News';
import Profile from './Profile';

// Screen names
const investingName = 'Investing';
const searchName = 'Search';
const newsName = 'News';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

const Home = ({ route, navigation}) => {

    const { width, height } = useWindowDimensions();

    return (
       <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName='Investing'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === investingName) {
                            iconName = focused ? 'analytics' : 'analytics-outline';
                        } else if (rn === searchName) {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (rn === newsName) {
                            iconName = focused ? 'today' : 'today-outline';
                        } else {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={height*0.0375} color={color}/>
                    },
                    headerShown: false,
                    tabBarStyle: { backgroundColor: '#000000', height: height*0.125, borderTopWidth: 0},
                    tabBarActiveTintColor: '#ffffff',
                    tabBarInactiveTintColor: '#7C7C7C'
                })}
                
                    // tabBarItemStyle: { justifyContent: 'center' }, // Adjust as needed
                    // tabBarItemLabelStyle: { fontSize: 12, fontWeight: 'bold' }, // Set text style
                    // tabBarActiveTintColor: '#YourActiveColor', // Set active icon and text color
                    // tabBarInactiveTintColor: '#YourInactiveColor', // Set inactive icon and text color
                >
                <Tab.Screen name={investingName} component={Investing}/>
                <Tab.Screen name={searchName} component={Search}/>
                <Tab.Screen name={newsName} component={News}/>
                <Tab.Screen name={profileName} component={Profile}/>
            </Tab.Navigator>
       </NavigationContainer>
    );
};

export default Home;