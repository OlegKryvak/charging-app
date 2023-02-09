import {Dimensions, View} from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
export const Alert = ({
  title,
  showAlert,
  setShowAlert,
  confirm,
  confirmText,
}) => {
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title={title}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      overlayStyle={{
        backgroundColor: '#00000066',
        opacity: 40,
        height: Dimensions.get('screen').height,
      }}
      contentContainerStyle={{
        borderRadius: 12,
      }}
      titleStyle={{
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 36,
        color: '#000000',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
      }}
      showConfirmButton={true}
      cancelButtonStyle={{
        width: 125,
        height: 42,
        backgroundColor: '#fff',
        borderColor: '#898A8D',
        borderWidth: 1,
        borderRadius: 4,
      }}
      cancelButtonTextStyle={{
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Poppins Regular',
      }}
      confirmButtonStyle={{
        width: 125,
        height: 42,
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
      }}
      confirmButtonTextStyle={{
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins Regular',
      }}
      cancelText="No"
      confirmText={confirmText}
      onCancelPressed={() => {
        setShowAlert(false);
      }}
      onConfirmPressed={() => {
        confirm();
      }}
    />
  );
};
