import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {client} from '../../android/app/google-services.json';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
// Add Services
import authService from '../services/auth';
import {FbLogo, GoogleLogo} from '../assets';

function SocialLogin({navigation}) {
  const [info, setInfo] = useState('');

  GoogleSignin.configure({
    webClientId:
      '839772959388-78qc4lpp8no0rgvurotrtaqia9l2lj7c.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

  /**
   * Handles SignIn via Google
   */
  const handleGoogleSignIn = () => {
    const clientId = client[0].oauth_client.filter(
      _each => _each.client_type === 3,
    )[0].client_id;
    GoogleSignin.configure({
      webClientId: clientId,
    });

    GoogleSignin.hasPlayServices()
      .then(async hasPlayService => {
        if (hasPlayService) {
          // Get the users ID token
          const {idToken} = await GoogleSignin.signIn();

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          await auth().signInWithCredential(googleCredential);
          const token = await auth().currentUser.getIdToken();
          serverSideLogin(token);
        }
      })
      .catch(error => {
        Sentry.captureMessage('Google Play Services are not available');
      });
  };

  /**
   * Handles SignIn via Google
   */
  const handleGoogleSignInV2 = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(async res => {
        console.log('google login success', res);
        const token = await auth().currentUser.getIdToken();
        serverSideLogin(token);
      })
      .catch(err => console.error(err));
  };

  /**
   * Handles SignIn via Facebook
   */
  const handleFacebookSignIn = async () => {
    console.log('inside handleFBsignin');
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(async res => {
        console.log('FB success login');
        const token = await auth().currentUser.getIdToken();
        serverSideLogin(token);
      })
      .catch(err => console.log('Failed to login via fb', err));
  };

  /**
   * Serverside authentication of the token
   * @param {String} _token
   */
  const serverSideLogin = _token => {
    console.log('inside serversidelogin ', _token);
    authService
      .login(_token)
      .then(data => {
        const bearerToken = data.data?.access_token;
        AsyncStorage.setItem('@access_token', bearerToken);
        navigation.navigate('Home');
      })
      .catch(error => {
        setInfo('Failed to authenticate on the server');
        setTimeout(() => {
          setInfo('');
        }, 5000);
        console.log(error);
        console.log(error.message);
        Sentry.captureException(error);
      });
  };

  return (
    <View>
      <View style={styles.loginContainer}>
        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Icon}
          onPress={handleGoogleSignIn}
        /> */}
        <TouchableOpacity
          onPress={handleGoogleSignInV2}
          style={styles.facebookBtn}>
          <GoogleLogo />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFacebookSignIn}
          style={styles.facebookBtn}>
          <FbLogo />
        </TouchableOpacity>
      </View>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  facebookBtn: {
    marginTop: 7,
    marginLeft: 40,
  },
  info: {
    padding: 10,
    color: 'red',
    marginTop: 20,
  },
});

export default SocialLogin;
