import React, { useEffect, useRef, useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet, KeyboardAvoidingView, Animated, Easing } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

// component imports
import InputBox from '../components/InputBox';

import sample from '../data/sample';

// .env imports
import { MY_IP_ADDRESS } from '@env';
import { PLACES_API_KEY } from '@env';

const Address = ({ route, navigation }) => {

  const { width, height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  // state for handling Google autocomplete predictions
  const [query, setQuery] = useState('');

  // state for handling whether the animations have run and styling and visibility of textContainer and footer
  const hasAnimated = useRef(false);

  // state for handling visibility of textContainer
  const [isVisible, setIsVisible] = useState(true);

  // state for handling visibility of predictions
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    setShowPredictions(query.length >= 3);
  }, [query]);

  const translateY = useRef(new Animated.Value(0.4)).current;

  // function for handling collapsing of textContainer
  useEffect(() => {
    if (query.length >= 1 && !hasAnimated.current) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        hasAnimated.current = true;
        setIsVisible(false);
      });
    }
  }, [query, hasAnimated.current]);

  // function for handling expansion of Footer
  // useEffect(() => {
  //   if (query.length >= 1 && !hasAnimated.current) {
  //     Animated.timing(translateY, {
  //       toValue: 0.8,
  //       duration: 200,
  //       easing: Easing.ease,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // }, [query]);

  return (
    <View style={[styles.container, { width, height } ]}>
      <Animated.View style={[
        styles.textContainer, 
        { width, height }, 
        { flex: translateY },
        isVisible ? null : { display: 'none' }
      ]}>
        <Text style={styles.header}>What is your address</Text>
        <Text style={styles.info}>We are legally required to collect this.</Text>
      </Animated.View>
      <View style={styles.inputContainer}>
        <InputBox
          placeholder='Enter your address'
          placeholderTextColor={'#7F8487'}
          style={styles.input}
          textAlign='center'
          autoCorrect={false}
          autoFocus={true}
          keyboardAppearance='dark'
          onChange={(query) => {setQuery(query)}}
          value={query}
        />
      </View>
      <KeyboardAvoidingView style={[styles.footer, {width}]} keyboardVerticalOffset={headerHeight} behavior='padding'>
        {/* conditionally render predictions */}
        {showPredictions && (
          <View style={styles.predictions}>
            <FlatList
              data={sample}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.queryContainer}>
                  <Text style={styles.queryTitle}>{item.title}</Text>
                  <Text style={styles.queryDescription}>{item.description}</Text>
                </TouchableOpacity>
              )}
            />     
          </View>
        )} 
        <Text style={styles.guarantee}>We will never share this information with marketers and we will never send you spam.</Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center'
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 0.4,
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
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    fontWeight: '400',
    borderWidth: 2,
    marginBottom: 0,
  },
  predictions: {
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  queryContainer: {
    height: 50,
  },
  queryTitle: {
    color: 'white',
  },
  queryDescription: {
    color: '#7F8487'
  },
  footer: {
    flex: '0.4',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  guarantee: {
    width: '90%',
    textAlign: 'center',
    color: '#7F8487',
    padding: 10
   }
});

// const Address = ({ route, navigation }) => {
//   // get params from FullName screen
//   // const { email } = route.params;

//   // state for handling animations
//   state = {
//     slide: new Animated.Value(0),
//     fadeOut: new Animated.Value(1),
//   };

//   // state for handling Google autocomplete option
//   const [query, setQuery] = useState('');
//   const [predictions, setPredictions] = useState([]);

//   // state for handling the visibility of predictions  
//   const [showPredictions, setShowPredictions] = useState(false);

//   // animation for sliding inputContainer up upon user typing
//   slideUpInput = () => {
//     Animated.timing(this.state.slide, {
//       toValue: -100,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   };

//   // animation for fading out textContainer upon user typing
//   fadeOutTitleInfo = () => {
//     Animated.timing(this.state.fadeOut, {
//       toValue: 0,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   }

//   const fetchPredictions = async (input) => {
//     const apiKey = PLACES_API_KEY;
//     const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

//     try {
//       const response = await fetch(endpoint);
//       const data = await response.json();

//       if (data.status === 'OK') {
//         setPredictions(data.predictions);
//       }
//     } catch (error) {
//       console.error('Error finding predictions', error);
//     }
//   };

//   useEffect(() => {
//     if (query.length >= 3) {
//       setShowPredictions(true);
//       slideUpInput();
//       fadeOutTitleInfo();
//     } else {
//       setShowPredictions(false);
//     }
//   }, [query]);
  
//   // state for handling user entered phone number and visibility of warning
//   const [date, setDate] = useState('');

//   const { width, height } = useWindowDimensions();
//   const headerHeight = useHeaderHeight();

//   //handle updating a user in the db with entered address
//   // const updateDateofBirth = async() => {
//   //   try {
//   //     console.log('trying to update user\'s date of birth...');

//   //     // fetch using IPv4 NOTE
//   //     const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/dateofBirth`, {
//   //         method: 'PATCH',
//   //         headers: {
//   //             'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify({email: email, dateofBirth: date }),
//   //     });
//   //     if (response.status === 400) {
//   //         // email format is invalid, throw warning
//   //         setShowWarning(true);
//   //     } else if (response.status === 200) {
//   //         // password is updated, navigate to next part of signup process
//   //         console.log('Navigating to Landing screen...');
//   //         navigation.navigate('Landing', { email : email });
//   //     } else if (response.status === 404) {
//   //         // no user found for the given email
//   //         console.error('Error', `No user found for given phone number ${phoneNumber}`);
//   //     } else {
//   //         // server error
//   //         console.log('Server error...');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error', error);
//   //   }
//   // };

//   return (
//     <View style={[styles.container, { width, height } ]}>
//       <Animated.View style={[styles.textContainer, {width}]}>
//         <Text style={styles.header}>What's your date of birth?</Text>
//         <Text style={styles.info}>We're legally required to collect this information</Text>
//       </Animated.View>
//       <Animated.View style={styles.inputContainer}>
//         <InputBox
//           placeholder='Enter your address'
//           placeholderTextColor={'#7F8487'}
//           style={styles.input}
//           textAlign='center'
//           autoCorrect={false}
//           autoFocus={true}
//           keyboardAppearance='dark'
//           keyboardType='numeric'
//           onChange={(query) => {setQuery(query)}}
//           value={query}
//         />
//         {/* conditionally render predictions */}
//         {showPredictions && (
//           <View style={styles.predictions}>
//             <FlatList
//               data={sample}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity>
//                   <Text>{item.title}</Text>
//                   <Text>{item.description}</Text>
//                 </TouchableOpacity>
//               )}
//             />     
//           </View>
//         )}
//       </Animated.View>
//       <KeyboardAvoidingView style={[styles.footer, {width}]} keyboardVerticalOffset={headerHeight} behavior='padding'> 
//         <StylableButton
//           text='Continue'
//           style={[styles.TOpacity, styles.continueContainer, styles.continueText]}
//           onPress={updateDateofBirth}
//         />
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
//   textContainer:{
//     opacity: this.state.fadeOut,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flex: '0.4',
//   },
//   header: {
//     fontSize: 28,
//     paddingTop: 15,
//     color: 'white',
//   },
//   info: {
//     width: '80%',
//     paddingTop: 15,
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'white',
//   },
//   inputContainer: {
//     translateY: this.state.slide,
//     flex: '0.2',
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',

//     // width: '90%',
//     // alignItems: 'center',
//     // flexDirection: 'row',
//     // justifyContent: 'center',
//     // borderRadius: 5,
//     // borderColor: 'white',
//     // borderWidth: 2,
//     // marginBottom: 10,
//     // backgroundColor: 'red'
//   },
//   input: {
//     width: '90%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 50,
//     fontSize: 16,
//     fontWeight: '400',
//     borderWidth: 2,
//   },
//   predictions: {
//     flex: '0.2'
//   },
//   footer: {
//     flex: '0.4',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   TOpacity: {
//     width: '70%',
//   },
//   continueContainer:{
//     borderRadius: 30,
//     paddingVertical: 11,
//     marginBottom: 10,
//     backgroundColor: '#4E9F3D',
//   },
//   continueContainer: {
//     borderRadius: 30,
//     paddingVertical: 11,
//     marginBottom: 10,
//     backgroundColor: '#4E9F3D'
//   },
//   continueText: {
//     color: '#000000',
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//   }
// });

export default Address;