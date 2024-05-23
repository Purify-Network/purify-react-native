// import { FlatList, Image, StyleSheet, View } from "react-native";
import React, {ReactElement, useEffect, useState} from 'react';
import {Button, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MainService from '../services/MainService';

interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  interface TestingInfo {
    testType: string;
    testResult: string;
  }
  
  interface LocationPanelProps {
    server: MainService;
    locid: number;
    coordinates: Coordinates;
    testingInfo: TestingInfo[];
    closePanel: () => void;
    newTest: () => void;
  }

const LocationPanel: React.FC<LocationPanelProps> = ({ server, locid, coordinates, testingInfo, closePanel, newTest }) => {

  const [imageSource, setImageSource] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getLocData();
}, [])


const getLocData = () => {
  server.getLoc(locid)!
  .then((data) => {
    data.forEach((loc: { name: string, image_path: string}) => {
      setImageSource(loc.image_path);
      setName(loc.name);
    })
  });
};

    return (
      <View style={styles2.container}>
        <Image source={{ uri: ("https://purify.network:3000/uploads/" + imageSource)}} style={styles2.image} /> 
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
        <TouchableHighlight
          onPress={newTest}
          underlayColor="white"
          style={{...styles2.bottomButton, backgroundColor: "lightblue"}}>
            <Text>new test</Text>
        </TouchableHighlight>
          <TouchableHighlight
          onPress={closePanel}
          underlayColor="white"
          style={{...styles2.bottomButton, backgroundColor: "lightgrey"}}>
            <Text>Cancel</Text>
        </TouchableHighlight>
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
      // height: "10%",
      borderRadius: 10,
      marginBottom: 10,
      aspectRatio: 1.0
    },
    bottomButton: {
      width: "100%",
      height: 70,
      borderRadius: 35,
      backgroundColor: "#609EEF",
      // marginTop: "100%",
      // position: "absolute",
      // flexDirection: "row",
      // top:10,
      // bottom: 10,
      // flex: 1,
      left: "0%",
      // marginLeft: "50%",
      // right: 70,
      zIndex: 100,
      borderBlockColor: '#eeeeee',
      borderLeftColor: '#eeeeee',
      borderRightColor: '#eeeeee',
      borderWidth: 2,
      marginTop: 10
    },
  });

  export default LocationPanel;