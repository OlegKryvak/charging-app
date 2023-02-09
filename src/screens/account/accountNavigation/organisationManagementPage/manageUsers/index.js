import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ActiveUsersCard} from '../../../../../components/activeUsersCard';
import {GoBackBtn} from '../../../../../components/goBackBtn';
import {InvitesUsersCard} from '../../../../../components/invitesUsersCard';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import {SearchInput} from '../../../../../components/searchInput';
import organisationService from '../../../../../services/orgManagementService';
import {styles} from './style';
import {useSelector} from 'react-redux';

export const ManageUsers = () => {
  const [selected, setSelect] = useState('Active');
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeUsersError, setActiveUsersError] = useState('');
  const [totalAmountOfActiveUsers, setTotalAmountOfActiveUsers] = useState(0);
  const [activePageNumber, setActivePageNumber] = useState(0);
  const [stopActiveRequest, setStopActiveRequest] = useState(false);

  const [invitesUsers, setInvitesUsers] = useState([]);
  const [invitesUsersError, setInvitesUsersError] = useState('');
  const [totalAmountOfInvitedUsers, setTotalAmountOfInvitedUsers] = useState(0);
  const [stopInviteRequest, setStopInviteRequest] = useState(false);
  const [invitedPageNumber, setInvitedPageNumber] = useState(0);
  const [text, setText] = useState('');

  const organisationId = useSelector(
    ({transactions}) => transactions.organisationId,
  );

  const plusIcon = (
    <PlusIcon
      name="pluscircle"
      size={20}
      color="#000000"
      style={{marginRight: 25}}
    />
  );
  useEffect(() => {
    organisationService.getAllUsersAmount(false, organisationId).then(res => {
      setTotalAmountOfActiveUsers(res.data.Total_users);
    });
    organisationService.getAllUsersAmount(true, organisationId).then(res => {
      setTotalAmountOfInvitedUsers(res.data.Total_users);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    organisationService
      .getAllUsers(false, organisationId, activePageNumber, text)
      .then(res => {
        if (res.data.length === 0) {
          //if there are no more active users we stop to make request on server
          setStopActiveRequest(true);
        }
        setActiveUsers(prev => [
          //if user scroll down to bottom of active user list, pageCounter is increasing on pageSize amount
          ...prev,
          ...res.data.filter(e => e.issuspended === false),
        ]);
      })
      .catch(function (err) {
        if (err.response.status !== 404) {
          setActiveUsersError(
            err.response.data?.message
              ? err.response.data?.message
              : err.response.data?.detail,
          );
        } else {
          setActiveUsersError(' ');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, activePageNumber, text]);
  useEffect(() => {
    if (!stopInviteRequest) {
      organisationService
        .getAllUsers(true, organisationId, invitedPageNumber, text)
        .then(res => {
          if (res.data.length === 0) {
            setStopInviteRequest(true);
          }
          setInvitesUsers(prev => [...prev, ...res.data]);
        })
        .catch(function (err) {
          if (err.response.status !== 404) {
            setInvitesUsersError(
              err.response.data?.message
                ? err.response.data?.message
                : err.response.data?.detail,
            );
          } else {
            setInvitesUsersError(' ');
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, invitedPageNumber, text]);

  const onChangeText = value => {
    setInvitesUsersError('');
    setActiveUsersError('');
    setActiveUsers([]);
    setInvitesUsers([]);
    setActivePageNumber(0);
    setInvitedPageNumber(0);
    setStopActiveRequest(false);
    setStopInviteRequest(false);
    setText(value);
  };

  const deleteItemHandler = id => {
    organisationService
      .deleteUser(id, organisationId, true)
      .then(res => {
        console.log(res.data.message);
        setActiveUsers(activeUsers.filter(elem => elem.user !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    //function checks when user scrolls to bottom
    const paddingToBottom = 5;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <View style={styles.manageUsersWrapper}>
      <GoBackBtn title="Manage users" icon={plusIcon} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            //reset all values when tabs are switched
            setStopActiveRequest(false);
            setActiveUsers([]);
            setActivePageNumber(0);
            setSelect('Active');
          }}>
          <Text
            style={
              selected === 'Active' ? styles.activedBtn : styles.unActivedBtn
            }>
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            //reset all values when tabs are switched
            setStopInviteRequest(false);
            setInvitesUsers([]);
            setInvitedPageNumber(0);
            setSelect('Invites');
          }}>
          <Text
            style={
              selected === 'Invites' ? styles.activedBtn : styles.unActivedBtn
            }>
            Invites
          </Text>
        </TouchableOpacity>
      </View>
      <SearchInput
        text={text}
        setText={onChangeText}
        placeholderText="Search your users"
      />
      <View style={styles.allTextContainer}>
        <Text style={styles.allText}>
          {selected == 'Active'
            ? totalAmountOfActiveUsers && activeUsers.length > 0
              ? `All (${totalAmountOfActiveUsers})`
              : ''
            : totalAmountOfInvitedUsers && invitesUsers.length > 0
            ? `All (${totalAmountOfInvitedUsers})`
            : ''}
        </Text>
      </View>
      <>
        {selected === 'Active' && !activeUsersError && (
          <>
            {activeUsers.length > 0 ? (
              <ScrollView
                onScroll={({nativeEvent}) => {
                  //checking if is a bottom of list
                  if (isCloseToBottom(nativeEvent)) {
                    if (!stopActiveRequest) {
                      //if there are no data we don't need to make request
                      setActivePageNumber(prev => (prev += 1));
                    }
                  }
                }}>
                {activeUsers.map(item => {
                  return (
                    <ActiveUsersCard
                      key={item.user}
                      item={item}
                      deleteItemHandler={deleteItemHandler}
                      onChangeText={setText}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <Text style={styles.noUsers}>There are no active users</Text>
            )}
          </>
        )}
        {activeUsersError && selected === 'Active' && (
          <Text style={styles.error}>{activeUsersError} </Text>
        )}
        {selected === 'Invites' && !invitesUsersError && (
          <>
            {invitesUsers.length > 0 ? (
              <ScrollView
                onScroll={({nativeEvent}) => {
                  if (isCloseToBottom(nativeEvent)) {
                    if (!stopInviteRequest) {
                      setInvitedPageNumber(prev => (prev += 1));
                    }
                  }
                }}
                scrollEventThrottle={400}>
                {invitesUsers.map(item => {
                  return <InvitesUsersCard key={item.user} item={item} />;
                })}
              </ScrollView>
            ) : (
              <Text style={styles.noUsers}>There are no invited users</Text>
            )}
          </>
        )}
        {invitesUsersError && selected === 'Invites' && (
          <Text style={styles.error}>{invitesUsersError}</Text>
        )}
      </>
    </View>
  );
};
