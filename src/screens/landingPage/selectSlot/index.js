import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {GoBackBtn} from '../../../components/goBackBtn';
import {Slot} from './slot';
import {styles} from './styles';

const availableSlots = [
  {
    id: 0,
    name: 'Slot 1',
    status: 'Available',
  },
  {
    id: 1,
    name: 'Slot 2',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Slot 3',
    status: 'Unavailable',
  },
];

export const SelectSlot = () => {
  const [selectedSlot, setSelectedSlot] = useState(0);
  return (
    <View style={styles.pageWrapper}>
      <GoBackBtn title="Select the slot" />
      <View style={styles.slotContainer}>
        {availableSlots.map(slot => {
          return (
            <Slot
              key={slot.id}
              slot={slot}
              isSelected={selectedSlot === slot.id}
              setSelectedSlot={setSelectedSlot}
            />
          );
        })}
      </View>
    </View>
  );
};
