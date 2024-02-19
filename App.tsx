import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/Tabs';

const App = (): ReactElement => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
