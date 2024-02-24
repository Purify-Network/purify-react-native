import React, {ReactElement, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import MainService from '../services/MainService';

import Mapbox from '@rnmapbox/maps';
Mapbox.setAccessToken('pk.eyJ1IjoicHVyaWZ5LW5ldHdvcmsiLCJhIjoiY2xzeXpsdjBqMGpraDJxbm55bWZ4aDV3YSJ9.yQsnZeNbvSsx-rw-J4s5Bg');


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

  const [coordinates] = useState([-5, 55]);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [calloutVisible, setCalloutVisible] = useState(false);

    useEffect(() => {
        const markersTmp: MarkerType[] = [];
        props.server.getNearbyLocs(10, 10, 200)!
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







const markerView = (color: string) => {
    return (      
        <View
        style={{
          height: 20,
          width: 20,
          backgroundColor: 'green',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 50,
        }}
      ></View>
      );
};

const onMarkerPress = () => {
  setCalloutVisible(true);
};

const loadAnnotationUK = (lat: number, lng: number) => {
  return (
    <Mapbox.PointAnnotation
      key={`marker${lat}-${lng}`}
      id={`marker${lat}-${lng}`}
      coordinate={[lat, lng]}
      onSelected={onMarkerPress}
    >
    {markerView("green")}
      <Mapbox.Callout
        title="Welcome to London!"
        contentStyle={{ borderRadius: 5 }}
      ></Mapbox.Callout>
    </Mapbox.PointAnnotation>
  );
};





  return (
    <SafeAreaView style={styles.safeArea}>
        <Mapbox.MapView 
        style={styles.map}
        styleURL='mapbox://styles/purify-network/clsz0u56w01cv01p4e9p5g0kx'>
            <Mapbox.Camera zoomLevel={4} centerCoordinate={coordinates} />
            {markers.map((marker, index) => (
                <View key={`marker${marker.latlng.latitude}-${marker.latlng.longitude}`}>{loadAnnotationUK(marker.latlng.latitude, marker.latlng.longitude)}</View>
            ))}
        </Mapbox.MapView>
    </SafeAreaView>
  );
};

export default MapScreen;



