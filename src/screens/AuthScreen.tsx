import React, {ReactElement, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import MainService from '../services/MainService';
// import StorageService from '../services/StorageService';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _retrieveData, _storeData } from '../services/StorageService';

type AuthScreenProps = {
  server: MainService
}

type LoginResponse = {
  login_token: string
}

const AuthScreen = (props: AuthScreenProps): ReactElement => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginMode, setLoginMode] = useState(true);

  // const storageService = new Storage({
  //   size: 1000,
  //   storageBackend: AsyncStorage, 
  //   defaultExpires: 1000 * 3600 * 24,
  //   enableCache: true,
  //   sync: {}
  // });

  // storageService.load({
  //     key: 'loginToken',
  //     // autoSync: true,
  //     // syncInBackground: true,
  //     // syncParams: {
  //     //   extraFetchOptions: {
  //     //   },
  //     //   someFlag: true
  //     // }
  //   })
  //   .then(ret => {
  //     console.log("pepepepepepe");
  //     console.log(ret.userid);
  //   })
  //   .catch(err => {
  //     console.warn(err.message);
  //     switch (err.name) {
  //       case 'NotFoundError':
  //         break;
  //       case 'ExpiredError':
  //         break;
  //     }
  //   });

  _retrieveData('loginToken');

  const handleSignUp = () => {
    if (confirmPassword === password) {
      console.log("matched");
      console.log(props.server);
      console.log(props.server.signup);
      props.server.signup(username, password, email);
    }else{
      console.log("passwords dont match");
    }
    console.log('Signing up...', username, email, password, confirmPassword);
  };

  const handleLogin = () => {
    props.server.login(username, password).then((data: any) => {
      // storageService.save({
      //       key: 'loginToken', // Note: Do not use underscore("_") in key!
      //       data: {
      //         // from: 'some other site',
      //         // userid: 
      //         token: data.login_token
      //       },
      //       expires: 1000 * 3600
      //     });
      _storeData("loginToken", data.login_token);
    });
    console.log('Logging in...', username, password);
  };

  const switchMode = () => {
    setLoginMode(!loginMode);
  };

  

  return (
    <View>
      {loginMode ? (
        <View style={authStyles.container}>
          <Text style={authStyles.title}>Login</Text>
          <TextInput
            style={authStyles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={authStyles.button} onPress={handleLogin}>
            <Text style={authStyles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={authStyles.switchButton}
            onPress={switchMode}>
            <Text style={authStyles.switchText}>Need an account?</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={authStyles.container}>
          <Text style={authStyles.title}>Sign Up</Text>
          <TextInput
            style={authStyles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            style={authStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={authStyles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={authStyles.button} onPress={handleSignUp}>
            <Text style={authStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={authStyles.switchButton}
            onPress={switchMode}>
            <Text style={authStyles.switchText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const authStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '10%',
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  or: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    // backgroundColor: 'clear',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
  },
  switchText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
