import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import GoBackArrowIcon from 'react-native-vector-icons/MaterialIcons';

const goBackArrowIcon = (
  <GoBackArrowIcon name="keyboard-arrow-left" size={25} color="#323232" />
);

export const GoBackBtn = ({
  title,
  headline,
  icon = null,
  backCross = null,
  resetSelected = null,
}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleNavigate = title => {
    navigation.navigate(title);
  };
  return (
    <View style={styles.backContainer}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={resetSelected ? resetSelected : handleGoBack}
          style={styles.arrowContainer}>
          {!backCross ? goBackArrowIcon : backCross}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.yourPlanText}>{headline ? headline : title}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleNavigate('Add users')}>
        {icon}
      </TouchableOpacity>
    </View>
  );
};
