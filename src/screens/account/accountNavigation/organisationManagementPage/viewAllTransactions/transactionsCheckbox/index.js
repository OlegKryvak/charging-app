import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {
  deleteHistorySelectedTypesNotSaved,
  setHistorySelectedTypesNotSaved,
} from '../../../../../../redux/slices/serviceHistorySlice';
import {
  deleteSelectedTypesNotSaved,
  deleteSelectedUsersNotSaved,
  setSelectedTypesNotSaved,
  setSelectedUsersNotSaved,
} from '../../../../../../redux/slices/transactionsSlice';

export const TransactionsCheckbox = ({
  type,
  id,
  name,
  isSelected = false,
  userType = null,
}) => {
  const [isChecked, setChecked] = useState(isSelected);
  const dispatch = useDispatch();
  const checkHandler = () => {
    if (type === 'users') {
      //if checkBox is for user list
      !isChecked
        ? dispatch(
            setSelectedUsersNotSaved({
              //set selected user localy
              id: id,
              name: name,
            }),
          )
        : dispatch(
            deleteSelectedUsersNotSaved({
              //reset user localy
              id: id,
              name: name,
            }),
          );
    } else {
      //if checkbox is for type list
      !isChecked
        ? userType === 'admin'
          ? dispatch(
              setSelectedTypesNotSaved({
                //set checked type localy
                id: id,
                name: name,
              }),
            )
          : dispatch(
              setHistorySelectedTypesNotSaved({
                //set checked type localy
                id: id,
                name: name,
              }),
            )
        : userType === 'admin'
        ? dispatch(
            deleteSelectedTypesNotSaved({
              //reset checked type localy
              id: id,
              name: name,
            }),
          )
        : dispatch(
            deleteHistorySelectedTypesNotSaved({
              //reset checked type localy
              id: id,
              name: name,
            }),
          );
    }
    setChecked(prev => !prev);
  };
  return (
    <CheckBox
      onPress={() => checkHandler()}
      left
      title={name}
      iconLeft
      iconType="material-community"
      checkedIcon="checkbox-marked"
      uncheckedIcon="checkbox-blank-outline"
      checkedColor="#0091FF"
      checked={isChecked}
      containerStyle={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        paddingLeft: 0,
        height: 30,
        justifyContent: 'center',
        padding: 0,
        margin: 0,
      }}
      textStyle={{
        margin: 0,
        lineHeight: 18,
        fontWeight: '300',
        color: '#19181A',
        fontSize: 16,
      }}
      fontFamily="Poppins Regular"
    />
  );
};
