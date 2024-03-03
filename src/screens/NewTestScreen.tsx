import React, {ReactElement, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import MainService from '../services/MainService';
import GetLocation from 'react-native-get-location';
import { getDistanceFromLatLonInMiles } from '../services/DistanceService';

type NewTestScreenProps = {
  server: MainService
}

type LocNearMe = {
  latitude: number,
  longitude: number,
  name: string,
  description: string,
  distanceToMe: number
}

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    // padding: 10,
    textAlign: "center",
    overflow: "scroll",
    height: "90%",
    backgroundColor: "green" //"#eeeeee"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  header: {
    fontSize: 40,
  },
  location: {
    width: "90%",
    height:140,
    marginTop: 20,
    borderBlockColor: "blue",
    borderTopWidth: 2,
    left: "5%"
  }
});

const NewTestScreen = (props: NewTestScreenProps): ReactElement => {

  const [closeEnoughLocs, setCloseEnoughLocs] = useState<any[]>([]);

    useEffect(() => {
      getLocs();
      setInterval(() => {
        getLocs();
    }, 10000);  
  }, [])

  const getLocs = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
  })
  .then(currentLocation => {
      console.log(currentLocation);
      props.server.getNearbyLocs(currentLocation.latitude, currentLocation.longitude, 1001)!
      .then((data) => {
        let tmp: LocNearMe[] = [];
        console.log("lklk");
        console.log(data);
        console.log("jk2jkjkj");
        data.forEach((loc: { latitude: any; longitude: any; name: any; }) => {
          const x1 = currentLocation.latitude;
          const y1 = currentLocation.longitude;
          const x2 = loc.latitude;
          const y2 = loc.longitude;
          const lat1 = currentLocation.latitude;
          const lon1 = currentLocation.longitude;
          const lat2 = loc.latitude;
          const lon2 = loc.longitude;
          tmp.push({
            latitude: x2,
            longitude: y2,
            name: loc.name,
            description: loc.name,
            distanceToMe: getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) //Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*6371 //(6371 is Earth radius in km.) //Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
          })
        });
        setCloseEnoughLocs(tmp);
      });
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
  };

  const renderLocs = () => {
    return closeEnoughLocs.map((item, index) => {
        return (
          <View style={styles.location}>
            <Text key={`locNearby${index}`}>
                {item.latitude}
            </Text>
          </View>
        );
    });
}

  return (
    <ScrollView style={styles.safeArea}>
      <Text style={styles.header}>
      New test screen
      </Text>
      {renderLocs()}
    </ScrollView>
  );
};

export default NewTestScreen;
