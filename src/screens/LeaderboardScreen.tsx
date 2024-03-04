import React, {ReactElement, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import MainService from '../services/MainService';

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

type LeaderboardScreenProps = {
  server: MainService
}

type LeaderboardUser = {
  username: string,
  points: number
}

const LeaderboardScreen = (props: LeaderboardScreenProps): ReactElement => {

  const [top100, setTop100] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    let tmp: LeaderboardUser[] = [];
    props.server.genericGetNoParams("leaderboard")?.then((data) => {
      data.forEach((elem: { username: any; points: any; }) => {
        tmp.push({
          username: elem.username,
          points: elem.points
        });
      });
      setTop100(tmp);
    }).catch((e) => {
      console.log(e);
    })
  }, [])

  const makeLeaderListElem = (user: LeaderboardUser) => {
    return (
      <View key={user.username}>
        <Text>{user.username + ": " + user.points}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {top100.map((user, index) => (
                makeLeaderListElem(user)
            ))}
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
