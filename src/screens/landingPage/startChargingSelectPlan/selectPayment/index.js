import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {GoBackBtn} from '../../../../components/goBackBtn';

export const SelectPayment = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <GoBackBtn title="Select Payment" />
      <View style={{marginTop: 27}}>
        <View style={styles.row}>
          <Text style={styles.type}>Zomato credits</Text>
          <Text style={styles.current}>Current</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.type}>Zomato credits</Text>
          <TouchableOpacity style={styles.select}>
            <Text style={styles.selectText}>Select </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
