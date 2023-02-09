import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import {GoBackBtn} from '../../../../../components/goBackBtn';
import auth from '@react-native-firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';
// Add Services
import {updateProfileInfo} from '../../../../../services/chargingService';

const AddProfileInfo = ({navigation, route}) => {
  // route params
  let {editItem, value: editValue} = route.params;
  if (editValue.includes('+91')) {
    editValue = editValue.replace('+91', '');
  }
  // state variables
  const [mobile, setMobile] = useState(null);
  const [defaultMobile, setDefaultMobile] = useState(editValue);
  const [isActive, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = _mobile => {
    if (editItem === 'mobile') {
      _mobile.length === 10 ? setActive(true) : setActive(false);
    } else {
      _mobile.length > 0 ? setActive(true) : setActive(false);
    }
    setMobile(_mobile);
  };

  const handleOtp = async () => {
    setLoading(true);
    if (editItem === 'mobile') {
      try {
        // const confirm = await auth().verifyPhoneNumber('+91' + mobile);
        const signOutStatus = await auth().signOut();
        const confirm = await auth().signInWithPhoneNumber('+91' + mobile);
        await updateProfileInfo();
        setTimeout(() => setLoading(false), 5000);
        navigation.navigate('otp', {
          phone: mobile,
          confirmation: confirm,
          linkPhone: true,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
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
        await auth().currentUser.updateEmail(mobile, actionCodeSettings);
        await updateProfileInfo();
        navigation.navigate('Profile');
      } catch (error) {
        let _msg = 'Failed to update email - ' + error.message;
        if (error.message.includes('auth/requires-recent-login')) {
          _msg =
            'For security reasons, you need to login again before updating this info';
        }
        setMsg(_msg);
        setShowAlert(true);
      }
    }
  };

  const handleRelogin = async () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.wrapper}>
      <GoBackBtn title={'Add/Edit ' + editItem} />
      <View style={styles.container}>
        <Text style={styles.text}>
          Enter your {editItem === 'mobile' ? 'Mobile Number' : 'Email ID'}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={mobile}
          defaultValue={defaultMobile}
          placeholder={
            'Type your ' +
            (editItem === 'mobile' ? 'number' : 'Email ID') +
            ' here'
          }
          keyboardType={editItem === 'mobile' ? 'numeric' : 'email-address'}
        />
        <TouchableOpacity onPress={handleOtp} disabled={!isActive}>
          <View
            style={[
              styles.otp,
              {
                backgroundColor: isActive ? 'black' : '#ccc',
              },
            ]}>
            <Text style={styles.otpText}>
              {editItem === 'mobile' ? 'Get OTP' : 'Update'}
            </Text>
          </View>
        </TouchableOpacity>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          message={msg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={
            msg ===
            'For security reasons, you need to login again before updating this info'
          }
          cancelText="Cancel"
          cancelButtonStyle={styles.cancelBtn}
          cancelButtonTextStyle={styles.cancelBtnText}
          confirmText="Relogin"
          confirmButtonStyle={styles.confirmBtn}
          confirmButtonTextStyle={styles.confirmBtnText}
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={handleRelogin}
        />
      </View>
      <View>{loading && <ActivityIndicator />}</View>
    </View>
  );
};

export default AddProfileInfo;
