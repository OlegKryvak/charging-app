import React from 'react';
import Account from '../../../screens/account';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LandingPage from '../../../screens/landingPage';
import Help from '../../../screens/help';
import HomeIcon from 'react-native-vector-icons/Foundation';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HelpIcon from 'react-native-vector-icons/MaterialIcons';

const accountIconFocused = (
  <AccountIcon name="account" size={25} color="#000000" />
);
const accountIcon = <AccountIcon name="account" size={25} color="#7B7B7D" />;
const homeIconFocused = <HomeIcon name="home" size={25} color="#000000" />;
const homeIcon = <HomeIcon name="home" size={25} color="#7B7B7D" />;
const helpIconFocused = (
  <HelpIcon name="help-center" size={25} color="#000000" />
);
const helpIcon = <HelpIcon name="help-center" size={25} color="#7B7B7D" />;

export const Navigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderRadius: 70,
          height: 62,
          left: 36,
          right: 36,
          bottom: 25,
          paddingBottom: 8,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#323232',
        tabBarInactiveTintColor: '#7B7B7D',
      }}>
      <Tab.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => (focused ? homeIconFocused : homeIcon),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? accountIconFocused : accountIcon,
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarIcon: ({focused}) => (focused ? helpIconFocused : helpIcon),
        }}
      />
    </Tab.Navigator>
  );
};
