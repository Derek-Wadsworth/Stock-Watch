import * as React from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions, Animated } from 'react-native';

const FlatListItem = ({ item, width }) => {
  return(  
    <View style={[styles.container, { width }]}>
      {/*<Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]}/>*/}
      <View>
        <Text style={ styles.title }>{item.title}</Text>
        <Text style={ styles.description }>{item.description}</Text>
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red'
    },
    title: {
      fontWeight: '800',
      fontSize: 28,
      marginBottom: 10,
      color: '#493d8a',
      textAlign: 'center'
    },
    description: {
      fontWeight: '300',
      color: '#62656b',
      textAlign: 'center',
      paddingHorizontal: 64
    },
});

export default FlatListItem;