import react from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  map: {
    alignItems: 'center',
    width: 330,
    height: 182,
    opacity: 0.5,
    position: 'relative',
  },
  batteryContainer: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 7,
  },
  mapContainer: {
    marginBottom: 30,
    marginTop: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  nearbyStationsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
    lineHeight: 28,
    paddingTop: 5,
  },
});
