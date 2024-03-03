import React, {ReactElement, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import MainService from '../services/MainService';
import { Icon } from 'react-native-elements'
import GetLocation from 'react-native-get-location';
import { LocationPuck } from '@rnmapbox/maps';

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
    backgroundColor: "red"
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
    height: 50,
    borderRadius: 35,
    backgroundColor: "#609EEF",
    marginTop: "200%",
    // top:10,
    bottom: 150,
    // left: "100%",
    marginLeft: "50%",
    right: 70,
    zIndex: 100,
    borderBlockColor: '#eeeeee',
    borderLeftColor: '#eeeeee',
    borderRightColor: '#eeeeee',
    borderWidth: 2
  },
  text: {
    width: 100,
    height: 100,
    position: "absolute",
  }
});

const MapScreen = (props: MapScreenProps): ReactElement => {

  const [coordinates, setCoordinates] = useState([-5, 55]);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState([-5, 55]);
  let init = false;

    useEffect(() => {
        getCurrentLocInterval();
        getMarkers();
    }, [])


    const getMarkers = () => {
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
    };


    const getCurrentLocInterval = () => {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
      })
      .then(currentLocation => {
        console.log("7777");
        console.log(currentLocation);
        // setCoordinates([0,0]);
          setCoordinates([currentLocation.latitude, currentLocation.longitude]);
          if (!init){
            console.log(coordinates);
            setStartCoordinates([currentLocation.latitude, currentLocation.longitude]); 
            console.log("prprprp");
            setInterval(() => {
                getCurrentLocInterval();
            }, 1000);  
            init = true;
          }
      })
      .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
      })
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
  setCalloutVisible(true);
};

const makeMarker = (lat: number, lng: number, color: string) => {
  return (
    <Mapbox.PointAnnotation
      key={`marker${lat}-${lng}`}
      id={`marker${lat}-${lng}`}
      coordinate={[lat, lng]}
      onSelected={onMarkerPress}
    >
    {markerView(color)}
      {/* <Mapbox.Callout
        title="Welcome to London!"
        contentStyle={{ width: "100%", borderRadius: 5 }}
      ></Mapbox.Callout> */}
    </Mapbox.PointAnnotation>
  );
};

const addLocButtonPressed = () => {
    props.server.new_loc("pizza", "image path", coordinates[1], coordinates[0], Math.floor(Date.now()/1000))
    setTimeout(() => {
        getMarkers();
    }, 1000);
};


// const currentLocationMarker = (lat: number, lng: number) => {
//     console.log("latLng");
//     console.log(lat);
//     console.log(lng);
//     console.log(coordinates);
//   return (
//     <Mapbox.PointAnnotation
//       key={`me${lat}-${lng}`}
//       id={`me${lat}-${lng}`}
//       coordinate={[lat, lng]}
//     //   onSelected={onMarkerPress}
//     >
//     <Icon
//                 name='location-arrow'
//                 type='font-awesome'
//                 color='red'
//                 size={36} />
    
//       <Mapbox.Callout
//         title="Welcome to London!"
//         contentStyle={{ borderRadius: 5 }}
//       ></Mapbox.Callout>
//     </Mapbox.PointAnnotation>
//   );
// };




  return (
    <SafeAreaView style={styles.safeArea}>
        <TouchableHighlight
          onPress={addLocButtonPressed}
          underlayColor="white"
          style={styles.addLocButton}>
         <View style={styles.addLocButton}>
            {/* <Text style={styles.text}>+</Text> */}
          </View>
        </TouchableHighlight>

        <Mapbox.MapView 
        style={styles.map}
        styleURL='mapbox://styles/purify-network/clsz0u56w01cv01p4e9p5g0kx'>
            <Mapbox.Camera zoomLevel={16} centerCoordinate={[startCoordinates[1], startCoordinates[0]]} />
            {/* {makeMarker(coordinates[1], coordinates[0], "blue")} */}
            {markers.map((marker, index) => (
                makeMarker(marker.latlng.latitude, marker.latlng.longitude, "green")
            ))}
            <Mapbox.LocationPuck puckBearing='heading'></Mapbox.LocationPuck>
        </Mapbox.MapView>
       
    </SafeAreaView>
  );
};

export default MapScreen;



