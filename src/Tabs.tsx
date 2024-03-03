import React, {ReactElement, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppHeader} from './components';
// import MapView, {Marker, Region} from 'react-native-maps';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import MainService from './services/MainService';
import MapScreen from './screens/MapScreen';
// import { BlurView } from 'expo-blur';

import { Icon } from 'react-native-elements'
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import NewTestScreen from './screens/NewTestScreen';

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
  },
  
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green', // Set your desired background color
    paddingHorizontal: 20,
    paddingBottom: 10,
    height: "100%"
  },
  tabIcon: {
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  tabStyle: {
    backgroundColor: "#eeeeee", //"#609EEF",
    borderBlockColor: '#3A64B8', //"#609EEF",
    borderTopWidth: 3,
    height: 100,
    paddingTop: 15,
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
          tabBarStyle: styles.tabStyle,
          headerStyle: {
            height: 70, // Specify the height of your custom header
            backgroundColor: '#333333'
          },
          headerBackground: () => (
          <View style={styles.tabBar}></View>
          ),
          header: ({route, options}) => (
            <AppHeader
              name={getHeaderTitle(options, route.name)}
              style1={Object.assign({}, styles.red, {
                fontWeight: 'bold',
                fontSize: 30,
              })}
            />
          ),
          tabBarShowLabel: false,
        }}>
{/* <Tab.Screen name="Logo" 
         children={()=>{
          return(
            <NewTestScreen server={props.server} />
          )
        }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('../assets/middle-icon.png')} // Replace with your company logo
                  style={styles.logo}
                />
               )
            }}
          /> */}
         <Tab.Screen name="Home" children={()=>{
          return(
            <HomeScreen server={props.server} />
          )
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='home'
              type='font-awesome'
              color='#609EEF'
              size={36} />
           )
        }} />
        <Tab.Screen name="Map" children={()=>{
          return(
            <MapScreen server={props.server} />
          )
        }} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='map'
              type='font-awesome'
              color='#609EEF'
              size={30} />
           )
        }}/>
         
        <Tab.Screen name="leaderboard" component={LeaderboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='trophy'
              type='font-awesome'
              color='#609EEF'
              size={35} />
           )
        }} />
        <Tab.Screen name="user" component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='user'
              type='font-awesome'
              color='#609EEF'
              size={34} />
           )
        }}
        />
      </Tab.Navigator> 
  );
};

export default Tabs;



