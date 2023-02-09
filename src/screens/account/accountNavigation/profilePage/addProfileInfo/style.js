import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  container: {
    marginTop: 47,
    flex: 1,
  },
  input: {
    height: 49,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#F6F6F6',
    backgroundColor: '#F6F6F6',
    padding: 10,
  },
  text: {
    width: '60%',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: 'black',
    marginBottom: 20,
  },
  otp: {
    borderRadius: 12,
    width: 96,
    height: 38,
    // backgroundColor: '#CCCCCC',
  },
  otpText: {
    color: 'white',
    fontSize: 14,
    position: 'absolute',
    top: 10,
    left: 20,
  },
  msg: {
    fontWeight: 'bold',
    color: 'red',
    padding: 5,
    marginTop: 30,
  },
  cancelBtn: {
    width: 100,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#898A8D',
    borderRadius: 4,
  },
  cancelBtnText: {
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  confirmBtn: {
    width: 100,
    height: 36,
    backgroundColor: '#DE6666',
    borderWidth: 1,
    borderColor: '#EB6A6A',
    borderRadius: 4,
  },
  confirmBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins',
  },
});
