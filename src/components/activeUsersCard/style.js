import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  cardsContainer: {
    // flexDirection: 'row',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 75,
    backgroundColor: '#FDF8F2',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.2,
    color: '#19181A',
  },
  additionalInfo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#979797',
  },
});
