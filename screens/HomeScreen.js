import { View, Text, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icon from 'react-native-feather'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import Categories from '../components/categories'
import FeaturedRow from '../components/featuredRow'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer'
import EditProfile from './EditProfile'
import Dashboard from './Dashboard'
import Share from './Share'
import CustomDrawer from '../components/CustomDrawer'
import MarketPlace from './MarketPlace'
import { featured, featured1, featured2, featured3 } from '../constants'
import { useId, useLocation } from '../context/allContext'
import IncomePage from './incomepage'
import { ActivityIndicator } from 'react-native';
// import { IdProvider } from './../context/allContext';
// import { PhoneProvider } from './../context/allContext';

const Drawer = createDrawerNavigator();

const HomeStack = () => {



  return (
    <>

      <Drawer.Navigator
        initialRouteName='MarketPlace'
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
        <Drawer.Screen name="Home" component={HomeScreen} options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          )
        }} />
        <Drawer.Screen name="Edit Profile" component={EditProfile}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="pencil-outline" size={24} color={color} />
            )
          }} />
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={24} color={color} />
          )
        }} />
        {/* <DrawerItem label='Share' onPress={onShare}/> */}
        {/* <Drawer.Screen name="Marketplace" component={MarketPlace} options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={24} color={color} />
          )
        }} /> */}
        <Drawer.Screen name="Income" component={IncomePage} options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cash" size={24} color={color} />
          )
        }} />
      </Drawer.Navigator>


    </>
  )
}

export default HomeStack




function HomeScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const {userId} = useId()

  const [project, setprojects] = useState();
  const [recommend, setrecommend] = useState([]);
  const [mandis, setmandis] = useState([]);
  
  const projects = async () => {

    const response = await axios.get('https://sih-backend.vercel.app/api/user/allProjects');

    setprojects(response.data.data);


  }


   const recommendprojects = async () => {
        console.log('featured user id ', userId)
        const range=10000
        const response = await axios.get(`https://sih-backend.vercel.app/api/user/657151e98507dda11904d869/recommend/projets/${range}`);
        setrecommend(response.data.data);
        console.log('Recommend:', response.data.data);
    }

    useEffect(() => {
        recommendprojects();
    }, [userId])


    

  const navigation = useNavigation();
  // const isFocused = useIsFocused();
  const { district } = useLocation();
  return (

    <>

      {isLoading ? (
        // Display an activity indicator while waiting
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#aa18ea" />
        </View>) : (

        <SafeAreaView style={tw`bg-white`}>
          <StatusBar barStyle="dark-content" />
          {/* search bar */}
          <View style={tw`flex-row items-center space-x-2 px-4 pb-2`}>
            {/* <Ionicons name='arrow-back' size={25} onPress={() => navigation.navigate('Dashboard')} /> */}
            <View style={tw`p-[1px] rounded-full mt-1`}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image source={require('../assets/user-profile.jpg')} style={tw`h-12 w-12 rounded-full`} />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row flex-1 items-center p-3 rounded-[40px] border border-gray-300 ml-2`}>
              <Icon.Search height='25' width='25' stroke='gray' />
              <TextInput placeholder='Projects' style={tw`ml-2 flex-1`} keyboardType='default' />
              <View style={tw`flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300`}>
                <Icon.MapPin height='20' width='20' strok e='gray' />
                <Text style={tw`text-gray-600`}>{district}</Text>
              </View>
            </View>


          </View>

          {/* main */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 50
            }}
          >
            {/* categories */}

            {
              [featured].map((item, index) => <Categories item={item} key={index} />)

            }

            {/* featured */}

            
            <View style={tw`mt-5`}>
              {
                [featured1].map((item, index) => {
                  return (
                    <FeaturedRow
                      key={index}
                      title='Projects Recommended for you'
                      restaurants={recommend}
                      description='Favourable projecrs near your area'
                      image={require('../assets/WDC-image.jpg')}
                    />
                  )
                })
              }


              {
                [featured1].map((item, index) => {
                  return (
                    <FeaturedRow
                      key={index}
                      title='Mandis Beneficial for you'
                      restaurants={recommend}
                      description='Favourable mandis near your area'
                      image={require('../assets/market.jpg')}
                    />
                  )
                })
              }

            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  )
}