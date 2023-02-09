import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  type: {
    color: '#19181A',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  current: {
    color: '#39B54A',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  select: {
    backgroundColor: '#0091FF',
    paddingVertical: 2,
    paddingHorizontal: 13,
    borderRadius: 4,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  selectText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
