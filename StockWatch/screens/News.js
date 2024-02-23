import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, useWindowDimensions, StyleSheet } from 'react-native';

const News = () => {
  const labels = ['1D', '1W', '1M', '3M', 'YTD', '1Y', 'ALL'];
  const [selectedLabel, setSelectedLabel] = useState(labels[0]);

  const { width, height } = useWindowDimensions();

  const handleLabelPress = (label) => {
    setSelectedLabel(label);
  };

  return (
    <View style={{height: height, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000'}}>
        <View style={{height: 50, width: width*0.9}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.scrollView, { height: 50 }]}>
            {labels.map((label, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => handleLabelPress(label)}
                style={[
                    styles.labelContainer,
                    { backgroundColor: selectedLabel === label ? '#5AC53A' : '#000000' },
                ]}
                >
                <Text style={[styles.labelText, {color: selectedLabel === label ? '#000000' : '#5AC53A'}]}>{label}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    backgroundColor: 'red'
  },
  labelContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 12,
    height: 30,
    marginTop: 10
  },
  labelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default News;