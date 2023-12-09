import { View, Text, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icon from 'react-native-feather'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import Categories from '../components/categories'
import FeaturedRow from '../components/featuredRow'
import { featured } from '../constants'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function HomeScreen() {
  const navigation = useNavigation();
  // const isFocused = useIsFocused();
  return (
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
          <TextInput placeholder='Restaurants' style={tw`ml-2 flex-1`} keyboardType='default' />
          <View style={tw`flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300`}>
            <Icon.MapPin height='20' width='20' stroke='gray' />
            <Text style={tw`text-gray-600`}>New York</Text>
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
        <Categories />

        {/* featured */}

        <View style={tw`mt-5`}>
          {
            [featured, featured, featured].map((item, index) => {
              return (
                <FeaturedRow
                  key={index}
                  title={item.title}
                  restaurants={item.restaurants}
                  description={item.description}
                />
              )
            })
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}