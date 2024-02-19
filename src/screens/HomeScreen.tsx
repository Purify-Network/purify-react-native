import React, {ReactElement} from 'react';
import {SafeAreaView} from 'react-native';
import AuthScreen from './AuthScreen';

const HomeScreen = (): ReactElement => {
  return (
    <SafeAreaView>
      <AuthScreen />
    </SafeAreaView>
  );
};

export default HomeScreen;
