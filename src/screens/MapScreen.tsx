import React, {ReactElement, useEffect, useState} from 'react';
import {Button, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import MainService from '../services/MainService';
import { Icon } from 'react-native-elements'
import GetLocation from 'react-native-get-location';
import { LocationPuck } from '@rnmapbox/maps';

import Mapbox from '@rnmapbox/maps';
import LocationPanel from '../components/LocationPanel';
import NewLocationPanel from '../components/NewLocationPanel';
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
    // backgroundColor: "red"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: "red",
    position: "absolute",
    zIndex: 20
  },
  addLocButton: {
    width: 140,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#609EEF",
    // marginTop: "100%",
    position: "absolute",
    // flexDirection: "row",
    // top:10,
    bottom: 10,
    // flex: 1,
    left: Dimensions.get('window').width/2 - 70,
    // marginLeft: "50%",
    // right: 70,
    zIndex: 100,
    borderBlockColor: '#eeeeee',
    borderLeftColor: '#eeeeee',
    borderRightColor: '#eeeeee',
    borderWidth: 2
  },
  newLocPanel: {
    width: "80%",
    height: "77%",
    borderRadius: 35,
    backgroundColor: "#eeeeee",
    position: "absolute",
    // marginTop: "10%",
    top:"5%",
    // bottom: 150,
    // left: "100%",
    // marginLeft: "5%",
    right: "10%",
    zIndex: 300,
    borderBlockColor: "#609EEF",
    borderLeftColor: "#609EEF",
    borderRightColor: "#609EEF",
    borderWidth: 2,
    overflow: "hidden"
  },
  locInfoPanel: {
    width: "80%",
    height: "77%",
    borderRadius: 35,
    backgroundColor: "#eeeeee",
    position: "absolute",
    // marginTop: "10%",
    top:"5%",
    // bottom: 150,
    // left: "100%",
    // marginLeft: "5%",
    right: "10%",
    zIndex: 300,
    borderBlockColor: "#609EEF",
    borderLeftColor: "#609EEF",
    borderRightColor: "#609EEF",
    borderWidth: 2,
    overflow: "hidden"
  },
  aquaSpotImg: {
    width: 150,
    height: 220,
    position: "absolute",
    left: 10,
    borderRadius: 20,
    top: 10,

  }
});

const MapScreen = (props: MapScreenProps): ReactElement => {

  const [coordinates, setCoordinates] = useState([-5, 55]);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [startCoordinates, setStartCoordinates] = useState<number[]>();

  const [locationPanelVisible, setlocationPanelVisible] = useState(false);
  const [newLocationPanelVisible, setNewLocationPanelVisible] = useState(false);

    useEffect(() => {
        getMarkers();
    }, [])


    const getMarkers = () => {
        console.log("ffff");
        const markersTmp: MarkerType[] = [];
        props.server.getNearbyLocs(10, 10, 200)!
        .then((data) => {
        data.forEach((loc: { latitude: any; longitude: any; name: any; }) => {
            markersTmp.push({
                latlng: {
                    latitude: loc.latitude,
                    longitude: loc.longitude
                },
                title: loc.name
            })
    })
    setMarkers(markersTmp);
        });
    };


    const getCurrentLocInterval = (currentLocation: Mapbox.Location) => {
          setCoordinates([currentLocation.coords.latitude, currentLocation.coords.longitude]);
          if (!startCoordinates){
            setStartCoordinates([currentLocation.coords.latitude, currentLocation.coords.longitude]); 
          }
    };


const markerView = (color: string) => {
    return (      
        <View
        style={{
          height: 20,
          width: 20,
          backgroundColor: color,
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 50,
        }}
      ></View>
      );
};

const onMarkerPress = () => {
  setlocationPanelVisible(true);
    console.log(locationPanelVisible);
};

const makeMarker = (lat: number, lng: number, color: string) => {
    console.log("ghghgh");
  return (
    <Mapbox.PointAnnotation
      key={`marker${lat}-${lng}`}
      id={`marker${lat}-${lng}`}
      coordinate={[lat, lng]}
      onSelected={onMarkerPress}
    >
    {markerView(color)}
    </Mapbox.PointAnnotation>
  );
};

const addLocButtonPressed = () => {
    // setTimeout(() => {
    //     props.server.new_loc("pizza", "image path", coordinates[1], coordinates[0], Math.floor(Date.now()/1000))
    // }, 500);
    //  setTimeout(() => {
    //     getMarkers();
    // }, 1000);
    setNewLocationPanelVisible(true);
};


const upd = (location: Mapbox.Location) => {
    getCurrentLocInterval(location);
}

const closePopout = () => {
    setlocationPanelVisible(false);
    setNewLocationPanelVisible(false);
}

const showLocationPanel = () => {
    return (
        <View style={styles.locInfoPanel}>
                <LocationPanel 
                name={'water fountain'} 
                coordinates={{latitude: 50.4, longitude: 23.5}} testingInfo={[{testResult: "tov", testType: "PH"}, {testResult: "tov", testType: "PH"}, {testResult: "tov", testType: "PH"}]} 
                imageSource='../../assets/fountain.jpeg'
                >
            </LocationPanel>
        </View>
    )
} 


const showNewLocationPanel = () => {
    return (
        <View style={styles.newLocPanel}>
                <NewLocationPanel 
                name={'water fountain'} 
                coordinates={{latitude: 50.4, longitude: 23.5}} testingInfo={[{testResult: "tov", testType: "PH"}, {testResult: "tov", testType: "PH"}, {testResult: "tov", testType: "PH"}]} 
                imageSource='../../assets/fountain.jpeg'
                >
            </NewLocationPanel>
        </View>
    )
} 


  return (
    <SafeAreaView style={styles.safeArea}>
        {locationPanelVisible ? showLocationPanel(): ""}
        {newLocationPanelVisible ? showNewLocationPanel(): ""}

        <TouchableHighlight
          onPress={addLocButtonPressed}
          underlayColor="white"
          style={styles.addLocButton}>
            <Text>New AquaSpot</Text>
        </TouchableHighlight>

        <Mapbox.MapView 
        onPress={closePopout}
        style={styles.map}
        styleURL='mapbox://styles/purify-network/clsz0u56w01cv01p4e9p5g0kx'>
            <Mapbox.Camera zoomLevel={16} centerCoordinate={(startCoordinates ? [startCoordinates[1], startCoordinates[0]] : [0,0])} />
            {markers.map((marker, index) => (
                makeMarker(marker.latlng.latitude, marker.latlng.longitude, "green")
            ))}
            <Mapbox.UserLocation onUpdate={upd} showsUserHeadingIndicator></Mapbox.UserLocation>
        </Mapbox.MapView>
       
    </SafeAreaView>
  );
};

export default MapScreen;






