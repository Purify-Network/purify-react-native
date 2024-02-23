import React, {ReactElement} from 'react';
import {SafeAreaView} from 'react-native';
import AuthScreen from './AuthScreen';
import MainService from '../services/MainService';

type HomeScreenProps = {
  server: MainService;
}

const HomeScreen = (props: HomeScreenProps): ReactElement => {
  return (
    <SafeAreaView>
      <AuthScreen server={props.server} />
    </SafeAreaView>
  );
};

export default HomeScreen;
