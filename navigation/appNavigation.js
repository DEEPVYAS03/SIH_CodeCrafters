import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RestaurantScreen from '../screens/ResturantScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Dashboard from '../screens/Dashboard';
import Share from '../screens/Share';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import IncomePage from '../screens/incomepage';
import tw from 'twrnc'
import EditProfile from '../screens/EditProfile';

// drawer navigation options
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  return (
    
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="Restaurant" options={{ headerShown: false }} component={RestaurantScreen} />
      </Stack.Navigator>
      
    
  )
}



//Drawer Navigation



export function DrawerNavigation() {
  return (
    <NavigationContainer>
    <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: 0,
        fontSize: 15,
      },
    }}>
        <Drawer.Screen name="Home" component={AppNavigation} options={{
          drawerIcon:({color})=>(
            <Ionicons name="home-outline" size={22} color={color} />
          )
        }}/>
        <Drawer.Screen name="Edit Profile" component={EditProfile} 
        options={{
          drawerIcon:({color})=>(
            <Ionicons name="pencil-outline" size={24} color={color} />
          )
        }}/>
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{
          drawerIcon:({color})=>(
            <Ionicons name="stats-chart-outline" size={24} color={color} />
          )
        }}/>
        <Drawer.Screen name="Share" component={Share}  options={{
          drawerIcon:({color})=>(
            <Ionicons name="share-social-outline" size={24} color={color} />
          )
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}