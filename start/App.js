import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import { DrawerNavigation } from './navigation/appNavigation'
import { NavigationContainer } from '@react-navigation/native';
import MarketPlace from './screens/MarketPlace';
import IncomePage from './screens/incomepage';
import { IdProvider, LocationProvider, PhoneProvider } from './context/allContext';


export default function App() {
  return (
    //  <DrawerNavigation />
    <PhoneProvider>
      <IdProvider>
        <LocationProvider>
          <AppNavigation />
        </LocationProvider>
      </IdProvider>
    </PhoneProvider>
    // <IncomePage/>


    // <MarketPlace/>

  );
}
