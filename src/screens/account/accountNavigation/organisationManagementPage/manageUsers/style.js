import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  manageUsersWrapper: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingTop: 37,
  },
  activedBtn: {
    width: 94,
    height: 42,
    backgroundColor: '#000000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#AFB1B4',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
  },
  unActivedBtn: {
    width: 94,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
  },

  allTextContainer: {
    marginBottom: 24,
    marginTop: 8,
  },
  allText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
    color: '#19181A',
    marginLeft: 9,
  },
  error: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
    color: 'red',
    width: Dimensions.get('window').width - 48,
    textAlign: 'center',
  },
  noUsers: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.28,
    color: 'green',
    width: Dimensions.get('window').width - 48,
    textAlign: 'center',
  },
});
