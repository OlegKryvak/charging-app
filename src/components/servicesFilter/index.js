import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseBtn from 'react-native-vector-icons/AntDesign';
import {GoBackBtn} from '../goBackBtn';
import transactionService from '../../services/orgManagementService';
import {useSelector} from 'react-redux';
import {SearchInput} from '../searchInput';
import styles from './style';
import {TransactionsCheckbox} from '../../screens/account/accountNavigation/organisationManagementPage/viewAllTransactions/transactionsCheckbox';
import {useServiceFilter} from '../../hooks/useServiceFilter';
const close = <CloseBtn name="close" color={'#323232'} size={22} />;

export const ServicesFilter = ({route}) => {
  const selectedTypesSaved = useSelector(
    ({transactions}) => transactions.selectedTypesSaved,
  );
  const selectedHistoryTypesSaved = useSelector(
    ({serviceHistory}) => serviceHistory.selectedHistoryTypesSaved,
  );

  const selectedUsersSaved = useSelector(
    ({transactions}) => transactions.selectedTransactionsSaved,
  );
  const [
    text,
    setText,
    setPageNumber,
    blockApiRequest,
    users,
    types,
    typesError,
    usersError,
    loader,
    doneHandler,
    resetSelected,
    userType,
  ] = useServiceFilter(transactionService, route, selectedTypesSaved);
  const done = (
    <TouchableOpacity onPress={() => doneHandler()}>
      <Text style={styles.iconDone}>Done</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={styles.wrapper}>
        <GoBackBtn
          title="Filters"
          icon={!typesError || !usersError ? done : null}
          backCross={!typesError || !usersError ? close : null}
          resetSelected={resetSelected}
        />
        {loader ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {typesError ? (
              <Text style={styles.error}>{typesError}</Text>
            ) : (
              <>
                {types.length && !loader > 0 ? (
                  <View style={styles.services}>
                    <Text style={styles.servicesText}>Services</Text>
                    {types.map(type => {
                      const isSelected = (
                        userType === 'admin'
                          ? selectedTypesSaved
                          : selectedHistoryTypesSaved
                      ).some(selectedType => selectedType.name === type.name);
                      return (
                        <TransactionsCheckbox
                          userType={userType}
                          name={type.name}
                          id={type.id}
                          key={type.id}
                          isSelected={isSelected}
                          type="services"
                        />
                      );
                    })}
                  </View>
                ) : (
                  <Text style={styles.noData}>No types</Text>
                )}
              </>
            )}
            {userType === 'admin' && (
              <>
                {usersError ? (
                  <Text style={styles.error}>{usersError}</Text>
                ) : (
                  <>
                    {users.length > 0 ? (
                      <View style={styles.users}>
                        <Text style={styles.servicesText}>Users</Text>
                        <SearchInput
                          text={text}
                          setText={setText}
                          placeholderText="Search"
                        />
                        <ScrollView
                          style={{
                            height: Dimensions.get('window').height - 420,
                          }}>
                          {users.map(user => {
                            const isSelected = selectedUsersSaved.some(
                              selectedUser => selectedUser.id === user.id,
                            );
                            //if users were selected previously, set and filter
                            if (user.name.includes(text)) {
                              return (
                                <TransactionsCheckbox
                                  name={user.name}
                                  id={user.id}
                                  key={user.id}
                                  isSelected={isSelected}
                                  type="users"
                                />
                              );
                            }
                          })}
                          {!blockApiRequest && (
                            <TouchableOpacity
                              onPress={() => setPageNumber(prev => prev + 1)}>
                              <Text style={styles.showMoreBtn}>Show more</Text>
                            </TouchableOpacity>
                          )}
                        </ScrollView>
                      </View>
                    ) : (
                      <Text style={styles.noData}>No users</Text>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </View>
    </>
  );
};
