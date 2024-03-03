import React, {ReactElement} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    // margin: 15,
    backgroundColor: '#eeeeee',
    height: 60,
    width: "100%",
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: "50%",
    right: 25,
    top: 100,
    backgroundColor: "#eeeeee"
  },
});

const AppHeader = (props: {
  name:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
  style1: any;
}): ReactElement => {
  return (
    <View style={styles.view}>
      {/* <Text style={props.style1}>{props.name}</Text> */}
      {/* <Image
                  source={require('../../assets/middle-icon.png')} // Replace with your company logo
                  style={styles.logo}
                /> */}
    </View>
  );
};

export default AppHeader;
