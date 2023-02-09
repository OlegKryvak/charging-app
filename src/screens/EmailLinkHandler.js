import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Add Services
import authService from '../services/auth';

const EmailLinkHandler = ({navigation}) => {
  const {loading, error} = useEmailLinkEffect();

  useEffect(() => {
    AsyncStorage.getItem('@access_token')
      .then(token => {
        if (token) {
          // navigation.navigate('home');
        }
      })
      .catch(err => console.log('Failed to get token from async storage'));
  });

  // Show an overlay with a loading indicator while the email link is processed
  if (loading || error) {
    return (
      <View style={styles.container}>
        {Boolean(error) && <Text>{error.message}</Text>}
        {loading && <ActivityIndicator />}
      </View>
    );
  }

  // Hide otherwise. Or show some content if you are using this as a separate screen
  return null;
};

const useEmailLinkEffect = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleDynamicLink = async link => {
      console.log(link);
      // Check and handle if the link is a email login link
      if (auth().isSignInWithEmailLink(link.url)) {
        setLoading(true);

        try {
          // use the email we saved earlier
          const email = await AsyncStorage.getItem('@email');
          AsyncStorage.removeItem('@email');
          await auth().signInWithEmailLink(email, link.url);
          const token = await auth().currentUser.getIdToken();

          /* You can now navigate to your initial authenticated screen
            You can also parse the `link.url` and use the `continueurl` param to go to another screen
            The `continueurl` would be the `url` passed to the action code settings */

          authService
            .login(token)
            .then(res => {
              const bearerToken = res.data?.access_token;
              console.log('bearer token inside email handler is ', bearerToken);
              AsyncStorage.setItem('@access_token', bearerToken);
              setLoading(false);
              // props.navigation.navigate('home');
            })
            .catch(err => console.log('Failed to fetch token from API'));
        } catch (e) {
          setLoading(null);
          setError(e);
        } finally {
        }
      }
    };

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    /* When the app is not running and is launched by a magic link the `onLink`
        method won't fire, we can handle the app being launched by a magic link like this */
    dynamicLinks()
      .getInitialLink()
      .then(link => link && handleDynamicLink(link));

    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  return {error, loading};
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(250,250,250,0.33)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 190,
  },
});
export default EmailLinkHandler;
