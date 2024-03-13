import React, {ReactElement, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/Tabs';
import  AuthScreen from './src/screens/AuthScreen';
import MainService from './src/services/MainService';
import { _retrieveData } from './src/services/StorageService';

const App = (): ReactElement => {

  const server = new MainService();
  const [loginToken, setLoginToken] = useState<string | null>(null);

  _retrieveData('loginToken').then((data) => {
    setLoginToken(data!);
  })

  return (
    <NavigationContainer>
      {loginToken ? <Tabs server={server}/> : <AuthScreen server={server}/>}
    </NavigationContainer>
  );
};

export default App;
