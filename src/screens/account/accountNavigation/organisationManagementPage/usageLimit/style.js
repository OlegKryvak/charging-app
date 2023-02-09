import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: '3%',
  },
  content: {
    flex: 1,
    padding: 5,
  },
  textContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  limitText: {
    fontSize: 14,
    color: '#AFB1B4',
  },
  container: {
    flex: 1,
    padding: 9,
  },
  amtContainer: {
    flex: 1,
    maxHeight: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    padding: 10,
  },
  amount: {
    fontSize: 32,
    lineHeight: 48,
    color: '#000000',
    marginRight: 20,
    alignSelf: 'center',
  },
  credits: {
    fontSize: 12,
    color: '#AFB1B4',
    lineHeight: 30,
    alignSelf: 'center',
  },
  changeLimit: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  changeLimitText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#0091FF',
  },
  input: {
    fontSize: 50,
    maxHeight: 200,
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxHeight: 70,
  },
  setBtnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  setBtn: {
    backgroundColor: '#000000',
    borderRadius: 36,
    padding: 10,
    marginBottom: 20,
  },
  msg: {
    fontWeight: 'bold',
    color: 'red',
  },
});
