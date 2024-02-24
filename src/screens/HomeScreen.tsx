import React, {ReactElement} from 'react';
import {SafeAreaView, Text} from 'react-native';
import AuthScreen from './AuthScreen';
import MainService from '../services/MainService';

type HomeScreenProps = {
  server: MainService;
}

const HomeScreen = (props: HomeScreenProps): ReactElement => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
