import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 61,
    borderTopLeftRadius: 24,
    paddingTop: 45,
    paddingHorizontal: 30,
    borderTopRightRadius: 24,
    paddingBottom: 70,
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
  },

  title: {
    fontSize: 34,
    color: '#000',
    fontWeight: '800',
    marginBottom: 5,
  },
  subtitle: {
    color: '#AFB1B4',
    fontSize: 18,
    marginBottom: 16,
  },
  distanceInfo: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 30,
    fontFamily: 'Poppins',
  },
  planInfo: {
    color: '#FFC804',
    fontSize: 18,
    lineHeight: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingVertical: 24,
    borderRadius: 40,
  },
  textButton: {
    color: 'white',
    fontSize: 22,
    lineHeight: 25,
  },
});
