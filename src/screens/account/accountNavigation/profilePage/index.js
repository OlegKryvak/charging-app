import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {styles} from './style';
import {GoBackBtn} from '../../../../components/goBackBtn';
import {useIsFocused} from '@react-navigation/native';
// Add Services
import {
  getProfileInfo,
  updateProfileInfo,
} from '../../../../services/chargingService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

// Icon Button
const EditIcon = () => <Icon name="edit" size={20} color="blue" />;
const SaveIcon = () => <AntIcon name="checkcircle" size={20} color="green" />;

export const ProfilePage = ({navigation}) => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState(null);
  const [editName, setEditName] = useState(false);
  const [info, setInfo] = useState();
  const isFocused = useIsFocused();

  // Load Profile data
  useEffect(() => {
    getProfileInfo().then(data => {
      console.log(data);
      data.individuals &&
        data.individuals.length &&
        setProfile(data.individuals[0]);
    });
  }, [editName, isFocused]);

  const handleEdit = editItem => {
    if (editItem === 'mobile' || editItem === 'email') {
      const value =
        editItem === 'mobile' ? profile.phonenumber : profile.emailid;
      navigation.navigate('Add Profile Info', {
        editItem,
        value,
      });
    } else {
      setEditName(true);
    }
  };

  const handleSave = async () => {
    const updateInfo = {displayName: name};
    try {
      await auth().currentUser.updateProfile(updateInfo);
      await updateProfileInfo();
      setEditName(false);
    } catch (err) {
      console.log(err);
      setInfo('Failed to update Name');
      setTimeout(() => {
        setInfo('');
      }, 5000);
      setEditName(false);
    }
  };

  if (!profile) {
    return;
  }

  return (
    <View style={styles.wrapper}>
      <GoBackBtn title="Profile" />
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.data}>Name:</Text>
          <View style={styles.editContainer}>
            {editName ? (
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Type your name here"
              />
            ) : (
              <Text>{profile.displayname}</Text>
            )}

            {editName ? (
              <TouchableOpacity onPress={handleSave} style={styles.editBtn}>
                <SaveIcon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleEdit('name')}
                style={styles.editBtn}>
                <EditIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.data}>Mobile:</Text>
          <View style={styles.editContainer}>
            <Text>{profile.phonenumber}</Text>
            <TouchableOpacity
              onPress={() => handleEdit('mobile')}
              style={styles.editBtn}>
              <EditIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.data}>Email ID:</Text>
          <View style={styles.editContainer}>
            <Text>{profile.emailid}</Text>
            <TouchableOpacity
              onPress={() => handleEdit('email')}
              style={styles.editBtn}>
              <EditIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.data}>Signup Method:</Text>
          <Text>{profile.signupmethod}</Text>
        </View>
      </View>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};
