import React from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';
import {Alert} from '../alert';
import {styles} from './style';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ActiveUsersCard = ({item, deleteItemHandler, onChangeText}) => {
  const [showAlert, setShowAlert] = useState(false);
  const confirmDelete = () => {
    // console.log(item.user);
    deleteItemHandler(item.user);
    onChangeText('');
    setShowAlert(false);
  };

  const deleteIcon = (
    <DeleteIcon
      name="delete"
      size={20}
      color="#000000"
      onPress={() => setShowAlert(true)}
    />
  );
  return (
    <View style={styles.cardsContainer}>
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.name}>{item.identifier}</Text>
          {item.identifier && ( //it should be email
            <Text style={styles.additionalInfo}>{item.identifier}</Text>
          )}
          {item.phone && ( //it should be phone
            <Text style={styles.additionalInfo}>{item?.phone}</Text>
          )}
        </View>
        <View>
          <View>{deleteIcon}</View>
        </View>
      </View>
      <Alert
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        confirm={confirmDelete}
        title={`Are you sure  you want to remove  ${item.identifier} ?`}
        confirmText="Yes"
      />
    </View>
  );
};
