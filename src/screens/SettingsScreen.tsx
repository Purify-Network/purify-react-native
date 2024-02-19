import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';

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

const SettingsScreen = (): ReactElement => {
  const region: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const markers = [
    {
      latlng: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      title: 'penis',
      description: 'big',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <MapView region={region} style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
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

export default SettingsScreen;
