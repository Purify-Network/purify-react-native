// import { FlatList, Image, StyleSheet, View } from "react-native";
import React, {ReactElement, useEffect, useState} from 'react';
import {Button, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  interface TestingInfo {
    testType: string;
    testResult: string;
  }
  
  interface LocationPanelProps {
    name: string;
    coordinates: Coordinates;
    testingInfo: TestingInfo[];
    imageSource: string;
  }

const LocationPanel: React.FC<LocationPanelProps> = ({ name, coordinates, testingInfo, imageSource }) => {
    return (
      <View style={styles2.container}>
        <Image source={{ uri: imageSource}} style={styles2.image} />
        {/* require('../../assets/fountain.jpeg') */}
        <Text style={styles2.title}>{name}</Text>
        <Text style={styles2.subtitle}>Coordinates: {coordinates.latitude}, {coordinates.longitude}</Text>
        <FlatList
          data={testingInfo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles2.testingInfoItem}>
              <Text>{item.testType}: {item.testResult}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  
  const styles2 = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 20,
      height: "100%"
      // marginBottom: 20,
      // borderRadius: 10,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      // elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 10,
    },
    testingInfoItem: {
      marginBottom: 5,
    },
    image: {
      width: "100%",
      height: "10%",
      borderRadius: 10,
      marginBottom: 10,
      aspectRatio: 1
    },
  });

  export default LocationPanel;