import React, {ReactElement, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppHeader} from './components';
// import MapView, {Marker, Region} from 'react-native-maps';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import {HomeScreen, SettingsScreen} from './screens';
import MainService from './services/MainService';
import MapScreen from './screens/MapScreen';
// import { BlurView } from 'expo-blur';

type TabsProps = {
  server: MainService
};

const styles = StyleSheet.create({
  backgroundStyle:{
    height:'100%',
    width:'100%'
  },
  red: {
    color: 'red',
  },
  map: {
    flex: 1
  }
});

const Tab = createBottomTabNavigator();

const Tabs = (props: TabsProps): ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {},
          headerStyle: {
            height: 70, // Specify the height of your custom header
          },
          // tabBarBackground: () => (
          // <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
          // ),
          // header: ({route, options}) => (
          //   <AppHeader
          //     name={getHeaderTitle(options, route.name)}
          //     style1={Object.assign({}, styles.red, {
          //       fontWeight: 'bold',
          //       fontSize: 30,
          //     })}
          //   />
          // ),
        }}>

        <Tab.Screen name="Home" children={()=>{
          return(
            <HomeScreen server={props.server} />
          )
        }} />
        <Tab.Screen name="Map" children={()=>{
          return(
            <MapScreen server={props.server} />
          )
        }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
};

export default Tabs;
