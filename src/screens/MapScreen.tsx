import React, {ReactElement, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import MainService from '../services/MainService';

type MapScreenProps = {
    server: MainService
  }

export type MarkerType = {
        latlng: {
          latitude: number,
          longitude: number,
        },
        title: string,
      //   description: 'big',
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const MapScreen = (props: MapScreenProps): ReactElement => {
  const region: Region = {
    latitude: 10.78825,
    longitude: 12.4324,
    latitudeDelta: 0.922,
    longitudeDelta: 0.421,
  };

  const [markers, setMarkers] = useState<MarkerType[]>([]);

useEffect(() => {
    const markersTmp: MarkerType[] = [];
    props.server.getNearbyLocs(10, 10, 2)!
    .then((data) => {
      console.log("lklk");
      console.log(data);
      console.log("jkjkjkj");
      data.forEach((loc: { latitude: any; longitude: any; name: any; }) => {
          markersTmp.push({
              latlng: {
                  latitude: loc.latitude,
                  longitude: loc.longitude
              },
              title: loc.name
          })
  })
  console.log(markers);
  setMarkers(markersTmp);
    });
}, [])


  return (
    <SafeAreaView style={styles.safeArea}>
      <MapView region={region} style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            // description={marker.description}
          />
        ))}
      </MapView>
    </SafeAreaView>

    /* <SafeAreaView>
    <Text>Hello</Text>
    <MapView
     initialRegion={{
       latitude: 37.78825,
       longitude: -122.4324,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }}
     zoomControlEnabled={true}
     style={{
       width: "100%",
       height: "100%"
     }}
    />
    </SafeAreaView> */
  );
};

export default MapScreen;
