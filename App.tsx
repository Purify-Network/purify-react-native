import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/Tabs';
import { AuthScreen } from './src/screens';

const App = (): ReactElement => {
  return (
    <NavigationContainer>
      {true ? <Tabs /> : <AuthScreen />}
    </NavigationContainer>
  );
};

export default App;
