import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/Tabs';
import { AuthScreen } from './src/screens';
import MainService from './src/services/MainService';

const App = (): ReactElement => {

  const server = new MainService();

  return (
    <NavigationContainer>
      {false ? <Tabs server={server}/> : <AuthScreen server={server}/>}
    </NavigationContainer>
  );
};

export default App;
