import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  data: {
    width: '40%',
    flexWrap: 'wrap',
  },
  editBtn: {
    marginLeft: 10,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 10,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FFF',
    backgroundColor: '#F6F6F6',
    color: 'black',
    padding: 2,
  },
  info: {
    fontWeight: 'bold',
    color: 'red',
    padding: 5,
  },
});
