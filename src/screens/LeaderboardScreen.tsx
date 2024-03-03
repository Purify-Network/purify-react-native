import React, {ReactElement} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
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
});

const LeaderboardScreen = (): ReactElement => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>
      Leaderboard
      </Text>
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
