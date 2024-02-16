import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CryptoJS from 'crypto-js';

const AuthScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginMode, setLoginMode] = useState(true);

  const handleSignUp = () => {
    if(confirmPassword == password){
      const hash = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
    }
    console.log('Signing up...', username, email, password, confirmPassword);
  };

  const handleLogin = () => {
    // Implement login logic here
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

      <TouchableOpacity style={authStyles.switchButton} onPress={switchMode}>
        <Text style={authStyles.switchText}>Need an account?</Text>
      </TouchableOpacity>
      </View>
         )
         : 
         (
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
        value={password}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={authStyles.button} onPress={handleSignUp}>
        <Text style={authStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={authStyles.switchButton} onPress={switchMode}>
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
    left:'10%', 
    flex: 1,
    width:'80%',
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
    height:40
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
    height:40,
  },
  switchText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;