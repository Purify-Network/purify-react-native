// import { FlatList, Image, StyleSheet, View } from "react-native";
import React, {ReactElement, useEffect, useState} from 'react';
import {Button, Dimensions, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import CameraComponent from './CameraComponent';

interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  interface TestingInfo {
    testType: string;
    testResult: string;
  }
  
  interface NewLocationPanelProps {
    name: string;
    coordinates: Coordinates;
    testingInfo: TestingInfo[];
    imageSource: string;
  }

  const styles2 = StyleSheet.create({
    container: {
      backgroundColor: '#eee',
      padding: 20,
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
      width: '100%',
      // height: 200,
      borderRadius: 10,
      marginBottom: 10,
      aspectRatio: 1
      // marginTop: -20
      // backgroundColor: "red"
    },
    cameraContainer: {
      width: '100%',
      height: "100%",
      zIndex: 500
    }
  });

const NewLocationPanel: React.FC<NewLocationPanelProps> = ({ name, coordinates, testingInfo, imageSource }) => {

  const [showCamera, setShowCamera] = useState(false);
  const [imgPath, setImgPath] = useState('https://i.fbcd.co/products/resized/resized-750-500/f8b30a80c3dd7846280debe018062435fb0273b9a391c2d05b1783ac5a473077.jpg');

  const loadCamera = () => {
    setShowCamera(true);
  };

  const getPhotoPath = (path: string) => {
    setImgPath(`file://'${path}`);
    console.log("pathhhhh");
    console.log(path);
    setShowCamera(false);
}

    return (
      <View>
        { showCamera ? <View style={styles2.cameraContainer}><CameraComponent callback={getPhotoPath} /></View> : 
          <View style={styles2.container}>
            <Pressable onPress={loadCamera}>
              <Image source={{
                uri: imgPath,
              }} style={styles2.image} resizeMode="cover" />
            </Pressable>
            <Text style={styles2.title}>{name}</Text>
            <Text style={styles2.subtitle}>Coordinates: {coordinates.latitude}, {coordinates.longitude}</Text>
            <FlatList
              data={testingInfo}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles2.testingInfoItem}>
                  <Text>{item.testType}: {item.testResult}</Text>
                </View>
              )} />
          </View>
       }
      </View>
    );
  };

  export default NewLocationPanel;