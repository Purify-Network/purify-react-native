import React, {ReactElement, useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import AuthScreen from './AuthScreen';
import MainService from '../services/MainService';
import { Camera } from 'react-native-vision-camera';

type HomeScreenProps = {
  server: MainService;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eeeeee'
  },
  view: {
    flexDirection: 'row',
    // margin: 15,
    backgroundColor: '#eeeeee',
    height: 60,
    width: "100%",
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  logoImg: {
    width: 50,
    height: 50,
    marginLeft: "50%",
    right: 92.5,
    top: 10,
    backgroundColor: "#eeeeee"
  },
  logoName: {
    width: 120,
    height: 40,
    marginLeft: "50%",
    right: -65+92.5,
    top: -31,
    backgroundColor: "#eeeeee"
  },
  textSpace: {
    // borderBlockColor: "#3A64B8",
    borderWidth: 1,
    textAlign: "center",
    color: "#3A64B8",
    width: 250,
    fontSize: 36,
    borderRadius: 20
  },
  // raindrop: {
  //   width: 100,
  //   height: 150,
  //   backgroundColor: "#4ABEFF", /* Blue color, you can change it */
  //   borderRadius: 50,
  //   position: "relative",
  //   overflow: "hidden"
  // },
});

const HomeScreen = (props: HomeScreenProps): ReactElement => {

  const [userCount, setUserCount] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [locCount, setLocCount] = useState(0);

    useEffect(() => {
        props.server.genericGetNoParams("total-users")!
        .then((data) => {   
          console.log(data.count);
          setUserCount(data.count);
        });
        props.server.genericGetNoParams("total-tests")!
        .then((data) => {   
          console.log(data.count);
          setTestCount(data.count);
        });
        props.server.genericGetNoParams("total-locs")!
        .then((data) => {   
          console.log(data.count);
          setLocCount(data.count);
        });
    }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
                  source={require('../../assets/middle-icon.png')} // Replace with your company logo
                  style={styles.logoImg}
                />
            <Image
                  source={require('../../assets/text-icon.png')} // Replace with your company logo
                  style={styles.logoName}
                />
      <Text style={styles.textSpace}>{String(userCount)}{"\n"}Users</Text>
      <Text style={styles.textSpace}>{String(testCount)}{"\n"}Tests</Text>
      <Text style={styles.textSpace}>{String(locCount)}{"\n"}AquaSpots</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
