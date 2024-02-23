import {React, useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LineChart } from 'react-native-wagmi-charts';
import Icon from 'react-native-vector-icons/Ionicons';

// component imports
import Accordian from '../components/Accordian';
import StylableButton from '../components/StylableButton';

const Investing = () => {

    const { width, height } = useWindowDimensions();
    const tabBarHeight = useBottomTabBarHeight(); 

    // labels for linechart filtering
    const labels = ['1D', '1W', '1M', '3M', 'YTD', '1Y', 'ALL'];
    // state for handling selected linechart filter
    const [selectedLabel, setSelectedLabel] = useState(labels[0]);

    // function for updating selected label
    const handleLabelPress = (label) => {
      setSelectedLabel(label);
    };

    const data = [
      {
        timestamp: 1625945400000,
        value: 33575.25,
      },
      {
        timestamp: 1625946300000,
        value: 33545.25,
      },
      {
        timestamp: 1625947200000,
        value: 33510.25,
      },
      {
        timestamp: 1625948100000,
        value: 33215.25,
      },
    ];

    const body = (
      <>
        <TouchableOpacity style={{height: height/10, width: width*0.9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomColor: 'grey', borderWidth: 0.2}}>
                <View>
                  <Text style={{color: '#fff'}}>TSLA</Text>
                  <Text style={{color: 'grey'}}>Tesla</Text>
                </View>
                <LineChart.Provider data={data}>
                  <LineChart height={height/20} width={width/5}>
                    <LineChart.HorizontalLine at={{ index: 2}}/>
                    <LineChart.Path color='#b51a28'/>
                  </LineChart>
                </LineChart.Provider>
                <View style={{borderColor: '#b51a28', borderWidth: 1}}>
                  <Text style={{color: '#b51a28'}}>420.76</Text>
                </View>
              </TouchableOpacity>
              {/* followed stocks */}
              <TouchableOpacity style={{height: height/10, width: width*0.9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomColor: 'grey', borderWidth: 0.2}}>
                <View>
                  <Text style={{color: '#fff'}}>TSLA</Text>
                  <Text style={{color: 'grey'}}>Tesla</Text>
                </View>
                <LineChart.Provider data={data}>
                  <LineChart height={height/20} width={width/5}>
                    <LineChart.HorizontalLine at={{ index: 2}}/>
                    <LineChart.Path color='#b51a28'/>
                  </LineChart>
                </LineChart.Provider>
                <View style={{borderColor: '#b51a28', borderWidth: 1}}>
                  <Text style={{color: '#b51a28'}}>420.76</Text>
                </View>
              </TouchableOpacity>
              {/* followed stocks */}
              <TouchableOpacity style={{height: height/10, width: width*0.9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomColor: 'grey', borderWidth: 0.2}}>
                <View>
                  <Text style={{color: '#fff'}}>TSLA</Text>
                  <Text style={{color: 'grey'}}>Tesla</Text>
                </View>
                <LineChart.Provider data={data}>
                  <LineChart height={height/20} width={width/5}>
                    <LineChart.HorizontalLine at={{ index: 2}}/>
                    <LineChart.Path color='#b51a28'/>
                  </LineChart>
                </LineChart.Provider>
                <View style={{borderColor: '#b51a28', borderWidth: 1}}>
                  <Text style={{color: '#b51a28'}}>420.76</Text>
                </View>
              </TouchableOpacity>
              {/* followed stocks */}
              <TouchableOpacity style={{height: height/10, width: width*0.9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomColor: 'grey', borderWidth: 0.2}}>
                <View>
                  <Text style={{color: '#fff'}}>TSLA</Text>
                  <Text style={{color: 'grey'}}>Tesla</Text>
                </View>
                <LineChart.Provider data={data}>
                  <LineChart height={height/20} width={width/5}>
                    <LineChart.HorizontalLine at={{ index: 2}}/>
                    <LineChart.Path color='#b51a28'/>
                  </LineChart>
                </LineChart.Provider>
                <View style={{borderColor: '#b51a28', borderWidth: 1}}>
                  <Text style={{color: '#b51a28'}}>420.76</Text>
                </View>
              </TouchableOpacity>
      </>
    );
    
      return (
        <SafeAreaView style={[styles.container, {height: height - tabBarHeight, width: width}]}>
          <ScrollView style={[styles.scrollContainer, {height: height, width, width}]}>
            <View style={{height: height*0.2, justifyContent: 'flex-end'}}>
              <Text style={{color: '#fff', fontSize: 32}}>Investing</Text>
              <Text style={{color: '#fff', fontSize: 32}}>Amount</Text>
              <Text style={{color: '#5AC53A', fontSize: 18}}>Increase/Decrease</Text>
            </View>
            <View>
              <LineChart.Provider data={data}>
                <LineChart height={height/4}>
                  <LineChart.Path color='#5AC53A'>
                    <LineChart.HorizontalLine at={{ index: 2}} />
                  </LineChart.Path>
                  <LineChart.CursorCrosshair/>
                </LineChart>
              </LineChart.Provider>
            </View>

            {/* View for linechart timeline */}
            <View style={{width: width, height: 50, alignItems: 'center'}}>
              <View style={{height: 50, width: width*0.95, borderColor: '#7F8487', borderBottomWidth: 0.2}}>
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

            {/* View for users buying power*/}
            <View style={{height: 50, width: width, alignItems: 'center'}}>
              <TouchableWithoutFeedback>
                <View style={{width: width, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'space-between', width: width*0.95}}>
                  <Text style={{color: '#ffffff'}}>Buying Power</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#ffffff'}}>$0.00</Text>
                    <Icon name="chevron-forward-outline" size={24} color='#7F8487'/>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
           
            <View style={[{alignItems: 'center'}, {width}]}>
              {/* View for users stocks followed */}
              <View style={{height: height/20, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, color: '#fff'}}>Lists</Text>
              </View>
              {/*  View for creating a new list */}
              <View style={{height: height/10, width: width*0.9, backgroundColor: '#000000'}}>
                <TouchableOpacity style={{height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                  <View style={{
                    height: '80%', 
                    width: '15%', 
                    backgroundColor: '#2a2a2a', 
                    marginHorizontal: 10, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    borderRadius: 4
                  }}>
                    <Icon name="add-outline" size={28} color='#fff'/>
                  </View>
                  <Text style={{color: 'white'}}>Create Screener or Watchlist</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Accordian>
              {body}
            </Accordian>
          </ScrollView>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    position: 'relative',
  },
  scrollContainer: {
    zIndex: 0,
  },
  graph: {
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
  scrollView: {
    flexDirection: 'row',
  },
  labelContainer: {
    height: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
    marginHorizontal: 12,
    marginTop: 15
  },
  labelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
})

export default Investing;