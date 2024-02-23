import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Animated, useWindowDimensions, Keyboard } from 'react-native';
import Modal from 'react-native-modal';

// component imports 
import StylableButton from '../components/StylableButton';
import InputBox from '../components/InputBox';

const Profile = () => {

  const { width, height } = useWindowDimensions();

  // state for handling height of the keyboard
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // state for handling visibility of the modal
  const [isModalVisible, setModalVisible] = useState(true);

  // state for animations associated with modal watchlist creation
  const [isWatchlistNameable, setIsWatchlistNameable] = useState(false);

  // state for handling user inputted modal name
  const [listName, setListName] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fadeAnim = new Animated.Value(1);
  const brightenAnim = new Animated.Value(0);
  const changeModalHeight = new Animated.Value(height*0.4);


  const changeModalContent = () => {
    // fade out modal selection screen
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsWatchlistNameable(!isWatchlistNameable);
    });
  };

  // useEffect to listen for isWatchlistNameable updates
  useEffect(() => {
    // skip animating on the initial mount
    if (!isWatchlistNameable) {
      return;
    }

    // fade in watchlist creation options
    Animated.timing(brightenAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {console.log('animation triggered!')});
    
    // changed height of modal content to avoid keyboard
    Animated.timing(changeModalHeight, {
      toValue: height*0.7,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isWatchlistNameable]);

  // useEffect to listen for change in keyboard height
  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     (event) => {
  //       setKeyboardHeight(event.endCoordinates.height);
  //     }
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardHeight(0);
  //     }
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  // handle updating a user's list array with new watchlist data
  const updateListArray = async (listName) => {
    try {
    console.log('trying to update user\'s list Array...');

    if (apt.trim() !== '') {
        // input is not empty, so append it to the end of the address
        address = address + ' ' + apt;
    }

    // fetch using IPv4 NOTE
    const response = await fetch(`http://${MY_IP_ADDRESS}:3000/signup/address`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, address: address }),
    });
    if (response.status === 200) {
        // Address is updated, navigate to next part of signup process
        console.log('Navigating to AddressConfirmation screen...');
        navigation.navigate('AddressConfirmation', { email : email, address: address });
    } else if (response.status === 404) {
        // no user found for the given email
        console.error('Error', `No user found for given address ${address}`);
    } else {
        // server error
        console.log('Server error...');
    }
    } catch (error) {
    console.error('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Your other profile content */}
      <StylableButton
        text='Go back'
        style={[{width: '85%'}, styles.continueContainer, styles.continueText]}
        onPress={toggleModal}
      />
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => {
          toggleModal();
          setIsWatchlistNameable(false);
          setListName('');
        }}
        style={styles.modal}
      >
        {/* screen cover view */}
        <View style={styles.coveringView}>
          {/*  modal content view */}
          <Animated.View style={{height: changeModalHeight, width: width, backgroundColor: '#1E2023', borderWidth: 0.4, borderTopColor: '#7F8487', alignItems: 'center'}}>
            {/* modal content before TouchableWithoutFeedback triggered */}
            {!isWatchlistNameable && (
              <Animated.View style={{ width: width, height: height*0.4, alignItems: 'center', opacity: fadeAnim}}>
                <TouchableWithoutFeedback onPress={() => {console.log('hello')}}>
                  <View style={{
                    height: height*0.125, 
                    width: width*0.85,
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: '#1E2023', 
                    marginTop: height*0.025, 
                    marginBottom: height*0.025,
                    borderRadius: 15,
                    borderWidth: 0.4,
                    borderColor: '#7F8487'
                  }}>
                    <View style={{
                      height: height*0.125, 
                      width: '25%', 
                      backgroundColor: '#DAE5FD', 
                      borderTopLeftRadius: 15, 
                      borderBottomLeftRadius: 15, 
                      marginRight: '5%', 
                      justifyContent: 'center', 
                      alignItems: 'center'
                    }}>
                      <Image source={require('../assets/business.png')} style={{width: '60%', height: '60%'}}/>
                    </View>
                    <View style={{height: height*0.085, width: '65%', justifyContent: 'space-evenly', alignItems: 'baseline', marginRight: '5%'}}> 
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>Create screener</Text>
                      <Text style={{color: '#fff', fontSize: 12}}>Find your next trade with filters for price, volume, and other indicators</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => changeModalContent()}>
                  <View style={{
                    height: height*0.125, 
                    width: width*0.85,
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: '#1E2023', 
                    marginBottom: height*0.025,
                    borderRadius: 15,
                    borderRadius: 15,
                    borderWidth: 0.4,
                    borderColor: '#7F8487'
                  }}>
                    <View style={{
                      height: height*0.125, 
                      width: '25%', 
                      backgroundColor: '#98E574', 
                      borderTopLeftRadius: 15, 
                      borderBottomLeftRadius: 15, 
                      marginRight: '5%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Image source={require('../assets/binoculars.png')} style={{width: '40%', height: '80%'}}/>
                    </View>
                    <View style={{height: height*0.085, width: '65%', justifyContent: 'space-evenly', alignItems: 'baseline', marginRight: '5%'}}>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>Create watchlist</Text>
                      <Text style={{color: '#fff', fontSize: 12}}>Keep an eye on investments you're interested in</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <StylableButton
                  text='Go back'
                  style={[{width: '85%'}, styles.continueContainer, styles.continueText]}
                  onPress={() => {
                    toggleModal();
                    setIsWatchlistNameable(false);
                  }}
                />
              </Animated.View>
            )}
            {/* modal content after TouchableWithoutFeedback trigger */}
            {isWatchlistNameable && (
              <Animated.View style={{height: height*0.4, width: width, alignItems: 'center', opacity: brightenAnim, backgroundColor: '#1E2023'}}>
                <View style={{height: height*0.075, justifyContent: 'center'}}>  
                  <Text style={{color: '#fff', fontWeight: '600', fontSize: 22}}>Create New List</Text>
                </View>
                <View style={{width: height*0.1, height: height*0.1, alignItems: 'center'}}>
                  <Image source={require('../assets/lightbulb.png')} style={{height: height*0.075, width: height*0.075}}/>
                </View>
                <InputBox
                  style={{width: width*0.9, height: height*0.055, borderRadius: 5, borderWidth: 2}} 
                  placeholder='Enter list name' 
                  autoFocus={true}
                  onChange={(listName) => setListName(listName)}
                  value={listName}
                />
                <View style={{width: width*0.9, height: height*0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <StylableButton
                    text='Cancel'
                    style={[{width: width*0.425}, styles.cancelContainer, styles.cancelText]}
                    onPress={() => {
                      toggleModal();
                      setIsWatchlistNameable(false);
                      setListName('');
                    }}
                  />
                  <StylableButton
                    text='Create'
                    style={[{width: width*0.425}, {
                        borderRadius: 30,
                        paddingVertical: 11,
                        marginBottom: 10,
                        backgroundColor: listName.length >= 1 ? '#ffffff' : '#42484D'
                      }, 
                      {
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 16,
                        textAlign: 'center'
                      }
                    ]}
                    onPress={() => {console.log('hello')}}
                    disabled={listName.length < 1}
                  />
                </View>
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueContainer: {
    borderRadius: 30,
    paddingVertical: 11,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  continueText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  coveringView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    alignItems: 'center',
  },
  coveringText: {
    color: 'white',
    textAlign: 'center',
  },
  cancelContainer: {
    borderRadius: 30,
    paddingVertical: 11,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default Profile;