import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    margin: 15,
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
      <Text style={props.style1}>{props.name}</Text>
    </View>
  );
};

export default AppHeader;
