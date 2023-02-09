import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    backgroundColor: 'red',
    position: 'relative',
    zIndex: 20,
  },
  pageWrapper: {
    height: '100%',
    backgroundColor: '#000000',
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    zIndex: 15,
    position: 'relative',
  },
  chargingImg: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').width - 100,
  },
  chargingInfoContainer: {
    backgroundColor: '#262626',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 9,
    paddingLeft: 16,
    marginTop: -20,
  },
  chargingInfoText: {
    color: '#2FFEBA',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    lineHeight: 36,
    marginBottom: 16,
  },
  chargingInfoValue: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  hint: {
    paddingHorizontal: 5,
    textAlign: 'center',
    marginTop: 22,
    color: '#9F9F9F',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    marginTop: 16,
    width: '100%',
    paddingVertical: 18,
    borderRadius: 22,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000000',
  },
});
