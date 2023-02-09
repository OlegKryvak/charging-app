import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveHistorySelectedTypes,
  setHistoryDefaultTypesNotSaved,
} from '../redux/slices/serviceHistorySlice';
import {
  saveSelectedTypes,
  saveSelectedUsers,
  setDefaultTypesNotSaved,
  setDefaultUsersNotSaved,
} from '../redux/slices/transactionsSlice';

export const useServiceFilter = (service, route, selectedTypesSaved) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [blockApiRequest, setBlockApiRequest] = useState(false);
  const [users, setUsers] = useState([]);
  const [types, setTypes] = useState([]);
  const [typesError, setTypesError] = useState('');
  const [usersError, setUsersError] = useState('');
  const [loader, setLoader] = useState(true);
  const organisationId = useSelector(({auth}) => auth.user.userOrgId);
  const {resetValuesHandler, userType} = route.params;

  useEffect(() => {
    //got localy check status from saved changes
    if (userType === 'admin') {
      dispatch(setDefaultTypesNotSaved());
    } else {
      dispatch(setHistoryDefaultTypesNotSaved());
    }
    service
      .getServicesType()
      .then(res => {
        const serviceTypes = res.data.data.map(type => {
          //check if types were selected previously
          const isSelected = selectedTypesSaved.some(
            selectedType =>
              selectedType.name.toLowerCase() === type.name.toLowerCase(),
          );
          return {
            name:
              type.name.split('')[0] +
              type.name.slice(1, type.name.length).toLowerCase(),
            checked: isSelected,
            id: type.name,
          };
        });
        //set types to render
        setTypes(serviceTypes);
      })
      .catch(error => {
        if (error.response.status === 500) {
          setTypesError('Failed to load data. Please try again later');
        } else {
          setTypesError(
            error.response.data?.message
              ? error.response.data?.message
              : error.response.data?.detail,
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    //got localy check status from saved changes
    dispatch(setDefaultUsersNotSaved());
    service
      .getUsers(organisationId, pageNumber, 20)
      .then(res => {
        if (res.data.length === 0) {
          setBlockApiRequest(true);
        } else {
          const serviceTransactions = res.data.map(user => {
            return {
              name: user.identifier,
              id: user.id,
            };
          });
          setUsers(prev => [...prev, ...serviceTransactions]);
        }
      })
      .catch(error => {
        if (error.response.status === 500) {
          setUsersError('Failed to load data. Please try again later');
        } else {
          setUsersError(
            error.response.data?.message
              ? error.response.data?.message
              : error.response.data?.detail,
          );
        }
      })
      .finally(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);
  const doneHandler = () => {
    //saving of selected service types
    resetValuesHandler();
    if (userType === 'admin') {
      //if user is admin then we can access to org management and set user list
      dispatch(saveSelectedUsers());
      dispatch(saveSelectedTypes());
    } else {
      //if this is self transaction then we need only types
      dispatch(saveHistorySelectedTypes());
    }
    navigation.goBack();
  };
  const resetSelected = () => {
    navigation.goBack();
  };
  return [
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
  ];
};
