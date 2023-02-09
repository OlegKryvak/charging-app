import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: 20,
    flex: 1,
    position: 'relative',
  },
  orgContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  btn: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    backgroundColor: '#000000',
    left: 20,
    paddingVertical: 19,
    borderRadius: 36,
  },
  btnText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },
});
