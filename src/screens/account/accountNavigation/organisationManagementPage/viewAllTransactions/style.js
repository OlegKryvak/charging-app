import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  manageUsersWrapper: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 25,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  activedBtn: {
    width: (Dimensions.get('window').width - 40) / 3,
    height: 42,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#000000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 14,
  },
  unActivedBtn: {
    width: (Dimensions.get('window').width - 40) / 3,
    height: 42,
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 14,
    color: '#AFB1B4',
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 16,
  },
  filterIconContainer: {
    position: 'relative',
  },
  filterActive: {
    position: 'absolute',
    top: -2,
    left: 10,
    width: 16,
    height: 16,
    backgroundColor: '#0091FF',
    zIndex: 6,
    borderRadius: 50,
  },
  error: {
    width: Dimensions.get('window').width - 40,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
    color: 'red',
  },
  noData: {
    width: Dimensions.get('window').width - 40,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
    color: 'green',
  },
});

export default styles;
