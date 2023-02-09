import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import EmailLinkHandler from './EmailLinkHandler';
import SocialLogin from '../components/SocialLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import {ChargeSmallLogo} from '../assets';

const Login = ({navigation}) => {
  // state variable
  const [loginName, setLoginName] = useState();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState();
  const [isActive, setActive] = useState(false);

  /**
   * Login via email using magic link
   */
  const handleEmailLogin = async () => {
    AsyncStorage.setItem('@email', loginName);
    const actionCodeSettings = {
      handleCodeInApp: true,
      url: 'https://charging.page.link',
      android: {
        packageName: 'com.moeving_charging',
        installApp: true,
        minimumVersion: '9',
      },
    };

    try {
      await auth().sendSignInLinkToEmail(loginName, actionCodeSettings);
      setInfo(
        'An Email with signIn link has been sent. Please click on it to login.',
      );
    } catch (error) {
      setInfo('Failed to send an email with signIn link');
      Sentry.captureException(error);
    }
  };

  const isPhone = () => {
    return loginName.match(/^\d{10}$/g);
  };

  /**
   * Function is called when user clicks on 'Proceed' button for login
   * Also, if input is a mobile number, then triggers the OTP
   */
  const handleLogin = async () => {
    setLoading(true);

    if (isPhone()) {
      try {
        const confirm = await auth().signInWithPhoneNumber('+91' + loginName);
        setLoading(false);
        navigation.navigate('otp', {
          phone: loginName,
          confirmation: confirm,
        });
      } catch (error) {
        console.log('Auth with phone number failed - ', loginName);
        Sentry.captureException(error);
      }
    } else {
      await handleEmailLogin();
    }
  };

  return (
    <View style={styles.container}>
      <EmailLinkHandler navigation={navigation} />
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email / Mobile"
          placeholderTextColor="#B1B1B1"
          value={loginName}
          onChangeText={val => {
            val.length ? setActive(true) : setActive(false);
            setLoginName(val);
          }}
        />
        <TouchableOpacity
          disabled={!isActive}
          style={[
            styles.proceedBtn,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: isActive ? 'black' : '#ccc',
            },
          ]}
          onPress={() => handleLogin()}>
          <Text style={styles.proceedBtnText}>Proceed</Text>
        </TouchableOpacity>
        <View style={styles.demarcationContainer}>
          <View style={styles.leftLine} />
          <View style={styles.textContainer}>
            <Text style={styles.demarcationText}>Or Login with</Text>
          </View>
          <View style={styles.leftLine} />
        </View>
        <SocialLogin navigation={navigation} />
      </View>
      <View>
        <Text style={styles.info}>{info}</Text>
        {loading && <ActivityIndicator />}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Connection Failed')}>
        <Text>ConnectionFailed</Text>
      </TouchableOpacity>
      <ChargeSmallLogo width={120} height={120} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    width: '80%',
    marginTop: '20%',
  },
  demarcationContainer: {
    marginTop: 40,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  leftLine: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    width: '30%',
    margin: 5,
  },
  textContainer: {
    marginBottom: 20,
  },
  demarcationText: {
    marginHorizontal: 9,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginLeft: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 12,
    padding: 10,
    borderRadius: 20,
    fontSize: 14,
  },
  proceedBtn: {
    borderRadius: 23,
    padding: 13,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedBtnText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  image: {
    marginTop: 0,
  },
  info: {
    fontWeight: 'bold',
    color: 'red',
    padding: 5,
  },
});

export default Login;
