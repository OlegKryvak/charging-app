import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: '3%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  amountContainer: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 100,
  },
  heading: {
    color: '#AFB1B4',
    fontSize: 16,
  },
  currentContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  balance: {
    fontSize: 18,
    color: '#979797',
  },
  balanceText: {
    fontSize: 14,
    color: '#AFB1B4',
  },
  input: {
    fontSize: 55,
    flex: 2,
    paddingVertical: 0,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  currency: {
    flex: 1,
    alignItems: 'flex-end',
    color: '#AFB1B4',
  },
  currencyText: {
    fontSize: 24,
    lineHeight: 50,
  },
  line: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: '80%',
  },
  btn: {
    backgroundColor: '#000000',
    borderRadius: 36,
    padding: 15,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
