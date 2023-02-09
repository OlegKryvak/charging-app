import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {styles} from './style';
import {GoBackBtn} from '../../../../../../components/goBackBtn';
// Add services
import {inviteUser} from '../../../../../../services/organisationService';
import orgManagementService from '../../../../../../services/orgManagementService';

// Add icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const checkMarkIcon = (
  <Ionicons name="checkmark-done" size={25} color="#2FFEBA" />
);
const closeOutlineIcon = (
  <MaterialIcons name="close-box-outline" size={25} color="#EB6A6A" />
);
const closeIcon = <MaterialIcons name="close" size={25} color="#323232" />;

const plusIcon = (
  <AntDesign
    name="pluscircle"
    size={25}
    color="#323232"
    style={{marginRight: 4}}
  />
);

export const AddUsers = () => {
  // State variables
  const [info, setInfo] = useState('');
  const [failed, setFailed] = useState([]);
  const [success, setSuccess] = useState([]);
  const [users, setUsers] = useState([]);

  const [orgId, setOrgId] = useState();

  orgManagementService
    .getOrganisationInfo()
    .then(res => {
      if (res && res.data) {
        let orgId = res.data[0].id;
        setOrgId(orgId);
      }
    })
    .catch(err => Alert.alert(err.message));

  orgManagementService
    .getOrganisationInfo()
    .then(res => {
      if (res && res.data) {
        let orgId = res.data[0].id;
        setOrgId(orgId);
      }
    })
    .catch(err => Alert.alert(err.message));

  const addNewInput = identifier => {
    setUsers(prev => {
      const temp = prev.slice();
      temp.push({value: '', identifier});
      return temp;
    });
  };

  const handleChange = (index, value) => {
    const slice = users.slice();
    for (let i = 0; i < slice.length; i++) {
      if (i === index) {
        slice[i].value = value;
        break;
      }
    }
    setUsers(slice);
  };

  const getUserList = () => {
    const len = users.length;
    return users.map((_user, idx) => {
      return (
        <View style={styles.inputContainer} key={idx}>
          <TextInput
            style={styles.input}
            defaultValue={_user.value}
            autoFocus={idx === len - 1 ? true : false}
            onChangeText={val => {
              handleChange(idx, val);
            }}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleChange(idx, '')}>
            {closeIcon}
          </TouchableOpacity>
        </View>
      );
    });
  };

  const handleInvite = () => {
    for (let idx = 0; idx < users.length; idx++) {
      const each = users[idx];
      if (each.value) {
        const isEmail = each.value.includes('@');
        const identifierValue = isEmail ? each.value : '+91' + each.value;
        inviteUser(orgId, each.identifier, identifierValue)
          .then(res => {
            setSuccess(prev => [...prev, each.value]);
          })
          .catch(error => {
            setFailed(prev => [...prev, each.value]);
            let msg = 'Failed to get data from Service';
            if (error.response) {
              msg = error.response.data?.message;
            }
            msg += ` - ${each.value}`;
          });
      }
    }
  };

  const getResult = () => {
    const _users = [...success, ...failed];
    return (
      <View style={styles.resultWrapper}>
        <View style={styles.msgContainer}>
          <View style={styles.iconResult}>{checkMarkIcon}</View>
          <Text style={styles.msg}>
            You have added {success.length} users successfully
          </Text>
        </View>
        {failed.length ? (
          <View style={styles.msgContainer}>
            <View style={styles.iconResult}>{closeOutlineIcon}</View>
            <Text style={styles.msg}>
              Failed to invite {failed.length} users
            </Text>
          </View>
        ) : null}
        <ScrollView style={styles.users}>
          <Text style={styles.summary}>Summary</Text>
          {_users.map((user, idx) => {
            const isSucess = success.includes(user);
            return (
              <View style={styles.user} key={idx}>
                <Text style={styles.username}>{user}</Text>
                <Text
                  style={[
                    styles.status,
                    isSucess ? styles.success : styles.failed,
                  ]}>
                  {isSucess ? 'Added' : 'Failed'}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.addUsersWrapper}>
      <GoBackBtn title="Add users" />

      <View style={styles.content}>
        {!(success.length || failed.length) ? (
          <View style={styles.inviteContent}>
            <ScrollView style={styles.inputList}>{getUserList()}</ScrollView>
            <View style={styles.row}>
              {plusIcon}
              <TextInput
                style={[styles.input, styles.input2]}
                placeholder="Phone"
                onFocus={() => addNewInput('phonenumber')}
              />
              <Text style={styles.text}> or </Text>
              <TextInput
                style={[styles.input, styles.input2]}
                placeholder="Email ID"
                onFocus={() => addNewInput('privateemailid')}
              />
            </View>

            <TouchableOpacity onPress={handleInvite}>
              <View style={styles.inviteBtn}>
                <Text style={styles.inviteBtnText}>Invite User</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContent}>{getResult()}</View>
        )}
      </View>
    </View>
  );
};
