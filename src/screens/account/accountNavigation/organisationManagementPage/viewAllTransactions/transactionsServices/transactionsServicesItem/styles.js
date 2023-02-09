import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 109,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  },
  info: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  name: {
    margin: 0,
    fontFamily: 'Poppins-Regular',
    color: '#19181A',
    fontSize: 16,
    lineHeight: 20,
  },
  infodetails: {
    margin: 0,
    fontFamily: 'Poppins-Regular',
    color: '#979797',
    fontSize: 14,
  },
  date: {
    fontFamily: 'Poppins-Light',
    color: '#979797',
    fontSize: 14,
  },
  priceContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  priceTypeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontFamily: 'Poppins-Light',
    color: '#979797',
    fontSize: 14,
  },
  value: {
    fontFamily: 'Poppins-Regular',
    color: '#19181A',
    fontSize: 16,
  },
});
