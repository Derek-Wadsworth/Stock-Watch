import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, useWindowDimensions, StyleSheet, Keyboard, Animated, Easing } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

// component imports
import StylableButton from '../components/StylableButton';
import InputBox from '../components/InputBox';

// .env imports
import { MY_IP_ADDRESS } from '@env';
import { PLACES_API_KEY } from '@env';

const Address = ({ route, navigation }) => {
  // get params from DateofBirth screen
  const { email } = route.params;

  const { width, height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  //state for handling visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // state for updating the height of the keyboard
  const keyboardHeight = useRef(0);

  // variable for storing the height of the keyboard
  const keyboardHeightOpen = useRef(0);

  // state for handling Google autocomplete predictions and updating text in InputBox
  const [query, setQuery] = useState('');

  // state for handling whether the animations have run and styling and visibility of textContainer and footer
  const hasAnimated = useRef(false);

  // state for handling visibility of textContainer
  const [isVisible, setIsVisible] = useState(true);

  // state for handling Google Places autocomplete predictions
  const [predictions, setPredictions] = useState([]);

  // state for handling visibility of predictions
  const [showPredictions, setShowPredictions] = useState(false);

  // state for handling lat and long of chosen address
  const lat = useRef(0);
  const long = useRef(0);

  // handle calling fetching of autocomplete predictions and visibility of predictions
  useEffect(() => {
    if (query.length >= 3) {
      fetchPredictions(query);
    }
    setShowPredictions(query.length >= 3);
  }, [query]);

  // starting animated value for textContainer flex
  const collapseY = useRef(new Animated.Value(0.3)).current;

  // starting animated value for position of guaranteeContainer
  const slideY = useRef(new Animated.Value(0)).current;

  // listener to detect when keyboard is shown or hidden
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
      keyboardHeight.current = e.endCoordinates.height;
      keyboardHeightOpen.current = e.endCoordinates.height;
      Animated.timing(slideY, {
        toValue:  -(keyboardHeight.current),
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () => {
      keyboardHeight.current = 0;
      Animated.timing(slideY, {
        toValue: keyboardHeight.current,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();  
    });

    // remove listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    }
  }, []);
  
  // handle collapsing of textContainer
  useEffect(() => {
    if (query.length >= 1 && !hasAnimated.current) {
      Animated.timing(collapseY, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        hasAnimated.current = true;
        setIsVisible(false);
      });
    }
  }, [query, hasAnimated.current]);

  // fetch autocomplete options for flatlist
  const fetchPredictions = async (input) => {
    const apiKey = PLACES_API_KEY;
    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=address&key=${apiKey}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.status === 'OK') {
        if (data.predictions.length > 5) {
          const visibleData = data.predictions.slice(0,5);
          setPredictions(visibleData);
        } else {
          setPredictions(data.predictions);
        }
      }
    } catch (error) {
      console.error('Error finding predictions', error);
    }
  };

  // handling fetching lat and long of address using Google Geocode API
  const getLatLong = async (address) => {
    const apiKey = PLACES_API_KEY;
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.status === 'OK') {
            lat.current = data.results[0].geometry.location.lat;
            long.current = data.results[0].geometry.location.lng;
        }
    } catch (error) {
        console.error('Error finding predictions', error);
    }
};

  // handle validating chosen address
  const validateAddress = (address, city) => {
    if (!isNaN(address.charAt(0))) {
      // first character of address is an address not a street name, so address is valid
      getLatLong(address + ' ' + city)
        .then(() => {
          navigation.navigate('AddressConfirmation', {address: address, city: city, email: email, lat: lat.current, long: long.current});
        })
        .catch(error => {
          console.error('Error fetching location data:', error);
        });
    } else {
      setModalVisible(true);
    }
  };

  // navigate user to AddressCreation screen if Address doesnt exist in predictions
  const createAddress = () => {
    navigation.navigate('Landing,', { email: email });
  };
  
  return (
    <View style={[styles.container, { width, height } ]}>
      <Modal
        animationType='fade'
        transparent
        visible={modalVisible}>
        <View style={[styles.modalBackground, { width, height }]}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalTitle}>Error</Text>
              <Text style={styles.modalInfo}>Please enter a valid address</Text>
            </View>
            <StylableButton 
              text='Ok'
              style={[{width: '85%'}, styles.continueContainer, styles.continueText]}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <Animated.View style={[
        styles.textContainer, 
        { width, height }, 
        { flex: collapseY },
        isVisible ? null : { display: 'none' },
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
      <View style={[
        styles.footer, {width},
        { flex: isVisible ? 0.6 : 0.9 },
        { justifyContent: isVisible ? 'flex-end' : 'flex-start'}
        ]} 
      >
        {/* conditionally render guarantee */}
        {isVisible && (
          <Animated.View style={[
            styles.guaranteeContainer,
            { transform: [{ translateY: slideY }]}]}>
            <Text style={styles.guarantee}>We will never share this information with marketers and we will never send you spam.</Text>
          </Animated.View>
        )}
        {/* conditionally render predictions */}
        {showPredictions && (
          <View style={styles.predictions}>
            <FlatList
              data={predictions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity style={[
                  styles.queryContainer,
                  {height: (height - (headerHeight + (0.1 * (height - headerHeight)) + keyboardHeightOpen.current))/4}]}
                  onPress={() => validateAddress(item.structured_formatting.main_text, item.structured_formatting.secondary_text)}
                  >
                  <Text style={styles.queryTitle}>{item.structured_formatting.main_text}</Text>
                  <Text style={styles.queryDescription}>{item.structured_formatting.secondary_text}</Text>
                </TouchableOpacity>
              )}
              ListFooterComponent={() => (
                <TouchableOpacity style={[
                  styles.queryContainer,
                  {height: (height - (headerHeight + (0.1 * (height - headerHeight)) + keyboardHeightOpen.current))/4}]}
                  onPress={() => createAddress()}
                  >
                  <Text style={styles.queryTitle}>I don't see my address here</Text>
                </TouchableOpacity>  
              )}
            />
          </View>
        )} 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  modalBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
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
  modalTextContainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  modalTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  modalInfo: {
    color: 'white',
    fontSize: 16
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
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: '0.2',
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
    flex: '0.1',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center'
  },
  input: {
    width: '90%',
    height: 50,
    fontWeight: '400',
    borderWidth: 2,
    marginBottom: 0,
  },
  predictions: {
    flex: 1,
    width: '90%',
  },
  queryContainer: {
    width: '100%',
    alignItems: 'right',
    justifyContent: 'space-evenly',
    borderBottomColor: '#474a4b',
    borderBottomWidth: 0.17,
  },
  queryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingLeft: 10
  },
  queryDescription: {
    fontSize: 13,
    color: '#7F8487',
    paddingLeft: 10
  },
  guaranteeContainer: {
    width: '90%',
    alignItems: 'center',
  },
  guarantee: {
    width: '90%',
    textAlign: 'center',
    color: '#7F8487',
    padding: 10
   }
});

export default Address;