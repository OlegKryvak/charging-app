import react from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 0,
    borderWidth: 1,
    flex: 1,
  },
  navContainer: {
    paddingTop: 16,
  },
  navigationItemWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 16,
    borderColor: '#F4F2F2',
    borderBottomWidth: 1,
  },
  imageContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  accountBtns: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#19181A',
  },
  accountText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#19181A',
  },
  goBackBtnContainer: {
    paddingLeft: 24,
    paddingBottom: 24,
  },
});
