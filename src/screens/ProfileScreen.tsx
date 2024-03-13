import React, {ReactElement} from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import CameraComponent from '../components/CameraComponent';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eeeeee'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  profPicContainer: {
    width: 206,
    height: 206,
    marginLeft: "50%",
    right: 103,
    backgroundColor: "green",
    top: 22,
    borderRadius: 100,
    borderColor: "#3A64B8",
    borderWidth: 3
  },
  profPic: {
    width: 200,
    height: 200,
    // marginLeft: "50%",
    // right: 100,
    // backgroundColor: "blue",
    borderRadius: 100
  },
  username: {
    width: 400,
    marginLeft: "50%",
    right: 200,
    // backgroundColor: "blue",
    textAlign: "center",
    fontSize: 33,
    marginTop: 39,
    color: "black", //"#3A64B8" 
  }
});

const ProfileScreen = (): ReactElement => {


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profPicContainer}>
        <Image source={require('../../assets/sharky.png')} style={styles.profPic}></Image>
      </View>
      <Text style={styles.username}>@sgrutman978</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
