import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import authService from '../services/auth';
import {updateProfileInfo} from '../services/chargingService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import SmsRetriever from 'react-native-sms-retriever';
import {GoBackBtn} from '../components/goBackBtn';

class Otp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      info: '',
      loading: false,
    };
  }
  componentWillUnmount() {
    this.setState({
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      info: '',
      loading: false,
    });
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',
        info: '',
        loading: false,
      });
    });

    this.autoFillOtp();

    auth().onAuthStateChanged(async user => {
      Sentry.captureMessage('User is logged In inside onAuthStateChanged');
      if (user) {
        Sentry.captureMessage(
          'User is logged In inside onAuthStateChanged - Logged In',
        );
        if (!this.props.route.params.linkPhone) {
          this.serverSideAuth(await auth().currentUser.getIdToken());
        }
      }
    });
  }

  /**
   * Function to auto fill the OTP
   */
  async autoFillOtp() {
    // Listen for SMS
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          const msgText = event.message;
          if (msgText) {
            const otp = msgText.split('', 6);

            this.setState({
              otp1: otp[0],
              otp2: otp[1],
              otp3: otp[2],
              otp4: otp[3],
              otp5: otp[4],
              otp6: otp[5],
            });
          }
          SmsRetriever.removeSmsListener();
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  /**
   * Server side authentication of the token
   * @param {string} _token
   */
  serverSideAuth(_token) {
    console.log(_token);
    authService
      .login(_token)
      .then(res => {
        const bearerToken = res.data?.access_token;
        AsyncStorage.setItem('@access_token', bearerToken);
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        let msg = err.message;
        if (err.response && err.response.data) {
          msg = err.response.data.message;
        }
        console.log('Failed to login via Firebase on Server', msg);
        Sentry.captureException(err);
        this.setState({
          info: `Failed to login via Firebase on Server - ${msg}`,
        });
      })
      .finally(() => {
        this.setState(prevState => ({...prevState, loading: false}));
      });
  }

  /**
   * Function is called when user clicks on 'Proceed' button for login
   */
  async handleVerifyOtp() {
    this.setState(prevState => ({...prevState, loading: true}));
    const otpText =
      this.state.otp1 +
      this.state.otp2 +
      this.state.otp3 +
      this.state.otp4 +
      this.state.otp5 +
      this.state.otp6;
    try {
      if (this.props.route.params.linkPhone) {
        const verificationId =
          this.props.route.params.confirmation.verificationId;

        const phoneCreds = auth.PhoneAuthProvider.credential(
          verificationId,
          otpText,
        );

        const phone = auth().currentUser.phoneNumber;
        if (phone) {
          auth()
            .currentUser.updatePhoneNumber(phoneCreds)
            .then(async response => {
              const result = await updateProfileInfo();
              console.log('result is ', result);
              this.props.navigation.navigate('Profile');
            })
            .catch(error => {
              console.log(error);
              this.setState({
                info: error.message,
              });
            });
        } else {
          auth()
            .currentUser.linkWithCredential(phoneCreds)
            .then(async response => {
              console.log('response is ', response);
              const result = await updateProfileInfo();
              console.log('result is ', result);
              this.props.navigation.navigate('Profile');
            })
            .catch(error => {
              console.log(error);
              this.setState({
                info: error.message,
              });
            });
        }
      } else {
        // Validate the OTP
        const result = await this.props.route.params.confirmation.confirm(
          otpText,
        );
        if (!result) {
          Alert.alert('OTP verification failed');
          throw new Error('OTP verification failed');
        }
        // Fetch auth token from firebase
        const tokenFromFirebase = await result.user.getIdToken();
        if (!tokenFromFirebase) {
          Alert.alert('Failed to fetch auth token from Firebase');
          throw new Error('Failed to fetch auth token from Firebase');
        }

        // Do Server side auth via firebase
        this.serverSideAuth(tokenFromFirebase);
      }
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.goBackBtn}>
          <GoBackBtn title="Enter OTP" />
        </View>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Enter OTP</Text>
            <View style={styles.otpRow}>
              <TextInput
                style={styles.input}
                textAlign={'center'}
                // keyboardType="numeric"
                textContentType="oneTimeCode"
                maxLength={1}
                autoComplete="sms-otp"
                autoFocus={true}
                value={this.state.otp1}
                ref={input => (this.otp1 = input)}
                onChangeText={val => {
                  this.setState({otp1: val});
                  this.otp2.focus();
                }}
              />
              <TextInput
                style={styles.input}
                textAlign={'center'}
                keyboardType="numeric"
                maxLength={1}
                autoComplete="sms-otp"
                value={this.state.otp2}
                ref={input => (this.otp2 = input)}
                onChangeText={val => {
                  this.setState({otp2: val});
                  this.otp3.focus();
                }}
              />
              <TextInput
                style={styles.input}
                textAlign={'center'}
                keyboardType="numeric"
                maxLength={1}
                autoComplete="sms-otp"
                value={this.state.otp3}
                ref={input => (this.otp3 = input)}
                onChangeText={val => {
                  this.setState({otp3: val});
                  this.otp4.focus();
                }}
              />
              <TextInput
                style={styles.input}
                textAlign={'center'}
                keyboardType="numeric"
                maxLength={1}
                autoComplete="sms-otp"
                value={this.state.otp4}
                ref={input => (this.otp4 = input)}
                onChangeText={val => {
                  this.setState({otp4: val});
                  this.otp5.focus();
                }}
              />
              <TextInput
                style={styles.input}
                textAlign={'center'}
                keyboardType="numeric"
                maxLength={1}
                autoComplete="sms-otp"
                value={this.state.otp5}
                ref={input => (this.otp5 = input)}
                onChangeText={val => {
                  this.setState({otp5: val});
                  this.otp6.focus();
                }}
              />
              <TextInput
                style={styles.input}
                textAlign={'center'}
                keyboardType="numeric"
                maxLength={1}
                autoComplete="sms-otp"
                value={this.state.otp6}
                ref={input => (this.otp6 = input)}
                onChangeText={val => this.setState({otp6: val})}
              />
            </View>
            <TouchableOpacity
              style={styles.verifyBtn}
              onPress={() => this.handleVerifyOtp()}>
              <Text style={styles.verifyBtnText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
          {this.state.loading ? (
            <View style={styles.loader}>
              <ActivityIndicator />
            </View>
          ) : (
            ''
          )}
          <Text style={styles.info}>{this.state.info}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  goBackBtn: {
    paddingLeft: 15,
  },
  contentContainer: {
    width: '80%',
    marginTop: '20%',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 52,
    width: 52,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 12,
    marginTop: 12,
    padding: 10,
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: '#F4F4F4',
    alignContent: 'center',
  },
  verifyBtn: {
    borderRadius: 23,
    padding: 13,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyBtnText: {
    color: 'white',
  },
  image: {
    marginTop: 140,
  },
  info: {
    fontWeight: 'bold',
    color: 'red',
    padding: 5,
    margin: 10,
    marginTop: 45,
  },
  loader: {
    marginTop: 30,
  },
});

export default Otp;
