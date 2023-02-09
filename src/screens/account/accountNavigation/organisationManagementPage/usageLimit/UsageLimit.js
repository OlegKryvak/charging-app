import React, {useState, useEffect} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {GoBackBtn} from '../../../../../components/goBackBtn';
// import styles
import {styles} from './style';
// services
import {
  getUsageLimit,
  updateUsageLimit,
} from '../../../../../services/organisationService';
import orgManagementService from '../../../../../services/orgManagementService';

export const UsageLimit = () => {
  const [limit, setLimit] = useState();
  const [editMode, setEditMode] = useState(false);
  const [amt, setAmt] = useState(null);
  const [msg, setMsg] = useState('');
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

  // get data from api
  useEffect(() => {
    if (orgId) {
      getUsageLimit(orgId)
        .then(res => {
          if (res) {
            setLimit(res.usagelimit);
          }
        })
        .catch(err => {
          Alert.alert('Failed to fetch usage limit');
        });
    }
  });

  const handleLimit = () => {
    setEditMode(true);
  };

  const handleAmt = val => {
    setAmt(val);
  };

  const handleSetLimit = () => {
    updateUsageLimit(orgId, amt)
      .then(res => setEditMode(false))
      .catch(error => {
        let msg = 'Failed to set usage limit - ';
        if (error.response) {
          msg += error.response.data?.message;
        }
        setMsg(msg);
        setTimeout(() => setMsg(''), 9000);
      });
  };

  return (
    <View style={styles.wrapper}>
      <GoBackBtn title={editMode ? 'Set Limit' : 'Usage Limit'} />
      <ScrollView style={styles.content}>
        <View style={styles.container}>
          {editMode && (
            <View style={styles.headingContainer}>
              <Text>Enter the limit for each user</Text>
            </View>
          )}
          <View style={styles.amtContainer}>
            <Text style={styles.amount}>Rs. {editMode ? '' : limit}</Text>
            {!editMode && <Text style={styles.credits}>credits / user</Text>}
            {editMode && (
              <TextInput
                style={styles.input}
                onChangeText={handleAmt}
                value={amt}
                placeholder="0000"
                keyboardType="numeric"
              />
            )}
          </View>
          {!editMode && (
            <View style={styles.changeLimit}>
              <TouchableOpacity onPress={handleLimit}>
                <Text style={styles.changeLimitText}>Change Limit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!editMode && (
          <View style={styles.textContainer}>
            <Text style={styles.limitText}>
              The limit set is for each and every user under the organisation
            </Text>
          </View>
        )}

        {msg && <Text style={styles.msg}>{msg}</Text>}
        {amt !== null && editMode && (
          <View>
            <TouchableOpacity onPress={handleSetLimit} style={styles.setBtn}>
              <Text style={styles.setBtnText}>Save changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {/* End of content */}
    </View>
  );
};
