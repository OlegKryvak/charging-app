import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;

const Help = () => {
  return (
    <View>
      <Text>Hello from Help {myIcon}</Text>
      <Icon name="rocket" size={30} color="#900" />
    </View>
  );
};
export default Help;
