import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cardsContainer: {
    // flexDirection: 'row',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 75,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 26,
    color: '#19181A',
  },
  activeDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#979797',
  },
  added: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#39B54A',
  },
  deleted: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#EB6A6A',
  },
});
