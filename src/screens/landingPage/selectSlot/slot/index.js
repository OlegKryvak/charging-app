import React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Location from 'react-native-vector-icons/Ionicons';
import {SlotSvg} from '../../../../assets';

export const Slot = ({slot, isSelected, setSelectedSlot}) => {
  const {id, name, status} = slot;
  const styles = StyleSheet.create({
    slot: {
      width: 100,
      alignItems: 'center',
    },
    container: {
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor:
        status === 'Unavailable'
          ? '#E4E5E6'
          : isSelected
          ? '#8EE8BD'
          : '#AFB1B3',
      borderRadius: 4,
      backgroundColor: isSelected ? 'rgba(142, 232, 189, 0.1)' : '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontFamily: 'Poppins-Regular',
      color: status === 'Unavailable' ? '#E4E5E6' : '#000000',
      fontSize: 14,
      marginTop: 8,
    },
    text: {
      fontFamily: 'Poppins-Regular',
      color: status === 'Unavailable' ? '#EB6A6A' : '#40D18B',
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <View style={styles.slot}>
      <TouchableOpacity
        disabled={status === 'Unavailable'}
        style={styles.container}
        onPress={() => setSelectedSlot(id)}>
        <SlotSvg style={{color: status === 'Unavailable' ? 'grey' : 'black'}} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};
