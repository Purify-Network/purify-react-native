import React, {useState} from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import AuthScreen from './components/AuthScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
// import { BlurView } from 'expo-blur';

const styles = StyleSheet.create({
  red: {
    color: "red",
  }
});


function HomeScreen() {
  return (
 <SafeAreaView>
    <AuthScreen></AuthScreen>
</SafeAreaView>
  )
}


const MyHeader = (props: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; style1: any}) => {
  return (
    <View style={{flexDirection:'row', margin:15 }}>
      <Text style={props.style1}>
        {props.name}
      </Text>
    </View>
  )
}

 
function SettingsScreen() {
  let region: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  let markers = [{latlng: {
    latitude: 37.78825,
    longitude: -122.4324},
  title: "penis",
  description: "big"}];

  return (
  <SafeAreaView style={{flex: 1, padding: 10}}>
    <MapView region={region} 
    style={{
      width: "100%",
      height: "100%"
    }}>
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
  )
}


function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { position: 'absolute' },
      headerStyle: {
        height: 80, // Specify the height of your custom header
      },
      // tabBarBackground: () => (
        // <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
      // ),
      header: ({ navigation, route, options }) => {
        const title = getHeaderTitle(options, route.name);
      
        return <MyHeader name={title} style1={Object.assign({}, styles.red, {fontWeight:'bold', fontSize:30})} />;
      }
    }}
     >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
 
  );
 
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
