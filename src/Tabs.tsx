import React, {ReactElement} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppHeader} from './components';
// import MapView, {Marker, Region} from 'react-native-maps';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import {HomeScreen, SettingsScreen} from './screens';
// import { BlurView } from 'expo-blur';

const styles = StyleSheet.create({
  red: {
    color: 'red',
  },
});

const Tab = createBottomTabNavigator();

const Tabs = (): ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {position: 'absolute'},
          headerStyle: {
            height: 80, // Specify the height of your custom header
          },
          // tabBarBackground: () => (
          // <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
          // ),
          header: ({route, options}) => (
            <AppHeader
              name={getHeaderTitle(options, route.name)}
              style1={Object.assign({}, styles.red, {
                fontWeight: 'bold',
                fontSize: 30,
              })}
            />
          ),
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Tabs;
