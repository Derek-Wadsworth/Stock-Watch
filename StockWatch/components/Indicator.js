import * as React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import slides from '../data/slides';

// create dot indicator displaying total number of Flatlist pages and current index
const Indicator = ({ xPos }) => {
    const { width } = useWindowDimensions();
    
    return (
      <View style={ styles.container }>
        {slides.map((_, i) => {
          // range corresponds to [prev dot, current dot, next dot]
          const inputRange = [(i - i) * width, i * width, (i + 1) * width];
          const opacity = xPos.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View 
              key={i.toString()}
              style={[ styles.indicatorDot, { opacity }]}
            />
          ); 
        })}
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center',
        height: '25%'
    },
    indicatorDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#000000',
        marginLeft: 10,
        marginRight: 10,
    }
  });

  export default Indicator;