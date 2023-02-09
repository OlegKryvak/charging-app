import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Add Services
import authService from '../services/auth';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const msg = error.response.data?.message;
        if (status == 401 && msg === 'User Succesfully Logged Out') {
          AsyncStorage.removeItem('@access_token');
          //firebase logout
          if (auth().currentUser) {
            auth().signOut();
          }
          // Logout from Google
          handleGoogleSignOut();
          // Logout from Facebook
          LoginManager.logOut();
          navigation.navigate('login');
        } else {
          Alert('Logout process failed');
        }
      }
      AsyncStorage.removeItem('@access_token');
    }
  };

  const handleGoogleSignOut = async () => {
    const signedIn = await GoogleSignin.isSignedIn();
    if (signedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  return (
    <View>
      <Text>You are logged In successfully!</Text>
      <View style={{margin: 120, width: 100}}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <View style={{margin: 80, width: 200}}>
        <Button onPress={clearAsyncStorage} title="Clear async storage" />
      </View>
    </View>
  );
}

export default Home;
