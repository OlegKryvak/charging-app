import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import all screen components
import Login from '../screens/Login';
import Otp from '../screens/Otp';
import {ProfilePage} from '../screens/account/accountNavigation/profilePage';
import {YourPlanPage} from '../screens/account/accountNavigation/yourPlanPage';
import {Navigation} from './routes/tabNavigation';
import {ServiceHistoryPage} from '../screens/account/accountNavigation/serviceHistoryPage';
import {YourWalletPage} from '../screens/account/accountNavigation/yourWalletPage';
import {YourCreditPage} from '../screens/account/accountNavigation/youCreditPage';
import {OrganizationPlan} from '../screens/account/accountNavigation/yourPlanPage/organizationPlan';
import {PersonalPlan} from '../screens/account/accountNavigation/yourPlanPage/personalPlan';
import {OrganisationManagementPage} from '../screens/account/accountNavigation/organisationManagementPage';
import {ManageUsers} from '../screens/account/accountNavigation/organisationManagementPage/manageUsers';
import {AddMoneyToOrgWallet} from '../screens/account/accountNavigation/organisationManagementPage/addMoneyToOrgWallet';
import {AddUsers} from '../screens/account/accountNavigation/organisationManagementPage/manageUsers/addUsersPage';
import AddProfileInfo from '../screens/account/accountNavigation/profilePage/addProfileInfo/AddProfileInfo';
import {ViewAllTransactions} from '../screens/account/accountNavigation/organisationManagementPage/viewAllTransactions';
import {UsageLimit} from '../screens/account/accountNavigation/organisationManagementPage/usageLimit/UsageLimit';
import {ServicesFilter} from '../components/servicesFilter';
import {navigationRef} from './RootNavigation';
import {WalletTransactions} from '../screens/account/accountNavigation/yourWalletPage/walletTransactions';
import {ChargingStations} from '../screens/landingPage/chargingStations';
import {StartCharging} from '../screens/landingPage/startCharging';
import {FInishedCharging} from '../screens/landingPage/startCharging/finishedCharging';
import {ConnectionFailed} from '../screens/ConnectionFailed';
import {SelectSlot} from '../screens/landingPage/selectSlot';
import {StartChargingSelectPlan} from '../screens/landingPage/startChargingSelectPlan';
import {ChargerNotConnected} from '../screens/landingPage/chargerNotConnected';
import {SelectPayment} from '../screens/landingPage/startChargingSelectPlan/selectPayment';

const Stack = new createNativeStackNavigator();
export const AppStackRoutes = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Connection Failed"
          component={ConnectionFailed}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Start Charging Select Plan"
          component={StartChargingSelectPlan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Start Charging"
          component={StartCharging}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Finished Charging"
          component={FInishedCharging}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Select payment"
          component={SelectPayment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Charger Not Connected"
          component={ChargerNotConnected}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Charging Stations"
          component={ChargingStations}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Select the slot"
          component={SelectSlot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="otp"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add Profile Info"
          component={AddProfileInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Your Plan"
          component={YourPlanPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Service history"
          component={ServiceHistoryPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Your Wallet"
          component={YourWalletPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wallet transactions"
          component={WalletTransactions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Your Credit"
          component={YourCreditPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Organisation Management"
          component={OrganisationManagementPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Organisation"
          component={OrganizationPlan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Personal"
          component={PersonalPlan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Manage users"
          component={ManageUsers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add users"
          component={AddUsers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="View all transactions"
          component={ViewAllTransactions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Transaction filter"
          component={ServicesFilter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add money to org wallet"
          component={AddMoneyToOrgWallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add money to wallet"
          component={AddMoneyToOrgWallet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Usage Limit"
          component={UsageLimit}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
