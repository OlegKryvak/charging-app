import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  addUsersWrapper: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 10,
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
    padding: 10,
    marginBottom: 10,
  },
  input2: {
    width: '40%',
  },
  inputList: {
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: '#AFB1B4',
  },
  inviteBtn: {
    borderRadius: 26,
    height: 44,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  inviteBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 11,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 9,
  },
  resultWrapper: {
    flex: 1,
    marginTop: 20,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconResult: {
    marginRight: 15,
  },
  resultContent: {
    flex: 1,
  },
  users: {
    flex: 1,
    flexGrow: 1,
    padding: 5,
    paddingRight: 20,
  },
  user: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F4F5F6',
    marginBottom: 9,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    color: '#000000',
    fontSize: 15,
  },
  status: {
    fontSize: 16,
    paddingRight: 5,
  },
  summary: {
    color: '#C6C6C6',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  msg: {
    fontSize: 14,
  },
  success: {
    color: '#39B54A',
  },
  failed: {
    color: '#EB6A6A',
  },
});
