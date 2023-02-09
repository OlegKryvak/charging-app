import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {GoBackBtn} from '../../../../components/goBackBtn';
import planService from '../../../../services/planService';
import {useDispatch} from 'react-redux';
import {setStateTypes} from '../../../../redux/slices/plansSlice';

export const YourPlanPage = () => {
  const navigation = useNavigation(); //throw plan and other param to child components
  const handleNavigate = (
    link,
    planName,
    organisationName,
    planId = null,
    organisationId = null,
  ) => {
    //sending props to child components
    navigation.navigate(link, {
      planId: planId,
      organisationId: organisationId,
      navHeadline:
        link === 'Organisation'
          ? `${planName} - ${organisationName}`
          : planName,
    });
  };
  const [allOrganisationPlans, setAllOrganisationPlans] = useState([]);
  const [orgError, setOrgError] = useState('');
  const [allPersonalPlans, setAllPersonalPlans] = useState([]);
  const [perError, setPerError] = useState('');
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    //getting state types and setting them to Redux
    planService.getStateTypes().then(res => {
      const items = res.data.data.map(e => {
        return {title: e.name};
      });
      dispatch(setStateTypes({stateTypes: items}));
    });
    //getting all Organization Plans
    planService
      .getAllOrganizationPlan()
      .then(res => {
        setAllOrganisationPlans(res.data);
      })
      .catch(error => {
        setOrgError(
          error.response.data?.message
            ? error.response.data?.message
            : error.response.data?.detail,
        );
      });
    //getting all personal plans
    planService
      .getAllPersonalPlan()
      .then(res => {
        setAllPersonalPlans(res.data);
      })
      .catch(error => {
        setPerError(
          error.response.data?.message
            ? error.response.data?.message
            : error.response.data?.detail,
        );
      })
      .finally(() => {
        setLoader(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Item = ({organisationName, planName, link, planId, organisationId}) => {
    return (
      <View style={styles.organisationWrapper}>
        <Text style={styles.organisationText}>{organisationName}</Text>
        <View style={styles.organisationContainer}>
          <Text style={styles.superPlanText}>{planName}</Text>
          <TouchableOpacity
            onPress={() =>
              handleNavigate(
                link,
                planName,
                organisationName,
                planId,
                organisationId,
              )
            }>
            <Text style={styles.viewBtn}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.yourPlanPageWrapper}>
        <View style={styles.goBackBtnContainer}>
          <GoBackBtn title="Your Plan" />
        </View>

        {!loader ? (
          <ScrollView
            contentContainerStyle={{alignItems: 'center'}}
            style={styles.yourPlanContainer}>
            {!orgError && (
              <>
                {allOrganisationPlans?.length > 0 &&
                  allOrganisationPlans.map(organisation => {
                    return organisation.userplans.map((plan, index) => {
                      return (
                        <React.Fragment key={`${organisation.id}${plan.id}`}>
                          <Item
                            key={plan.id}
                            planId={plan.id}
                            organisationId={organisation.id}
                            organisationName={organisation.displayname}
                            planName={plan.displayname}
                            link={'Organisation'}
                          />
                          {index < allOrganisationPlans.length - 1 && (
                            <View
                              style={{
                                width: '100%',
                                borderWidth: 0.2,
                                borderColor: '#D1D1D1',
                              }}
                            />
                          )}
                        </React.Fragment>
                      );
                    });
                  })}
              </>
            )}
            {allOrganisationPlans.length > 0 && allPersonalPlans.length > 0 && (
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.2,
                  borderColor: '#D1D1D1',
                }}
              />
            )}
            {!perError && (
              <>
                {
                  //rendering of all personal plans
                  allPersonalPlans?.length > 0 &&
                    allPersonalPlans?.map((plan, index) => {
                      return (
                        <React.Fragment key={plan.id ? plan.id : Math.random()}>
                          <Item
                            planId={plan.id}
                            organisationName={'Personal'}
                            planName={plan.displayname}
                            link={'Personal'}
                          />
                          {index < allPersonalPlans.length - 1 && (
                            <View
                              style={{
                                width: '100%',
                                borderWidth: 0.2,
                                borderColor: '#D1D1D1',
                              }}
                            />
                          )}
                        </React.Fragment>
                      );
                    })
                }
              </>
            )}
          </ScrollView>
        ) : (
          <Text style={styles.loader}>Loading...</Text>
        )}
        {orgError && <Text style={styles.error}>{orgError}</Text>}
        {perError && <Text style={styles.error}>{perError}</Text>}
      </View>
    </View>
  );
};
