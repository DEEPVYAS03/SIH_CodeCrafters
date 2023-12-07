import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icon from 'react-native-feather'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import Categories from '../components/categories'
import FeaturedRow from '../components/featuredRow'
import { featured } from '../constants'
import { TouchableOpacity } from 'react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar barStyle="dark-content" />
      {/* search bar */}
      <View style={tw`flex-row items-center space-x-2 px-4 pb-2`}>
        <View style={tw`flex-row flex-1 items-center p-3 rounded-full border border-gray-300 mr-1`}>
          <Icon.Search height='25' width='25' stroke='gray' />
          <TextInput placeholder='Restaurants' style={tw`ml-2 flex-1`} keyboardType='default' />
          <View style={tw`flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300`}>
            <Icon.MapPin height='20' width='20' stroke='gray' />
            <Text style={tw`text-gray-600`}>New York,NYC</Text>
          </View>
        </View>
        <View style={tw`p-3 rounded-full bg-[#fb923c]`}>
          <TouchableOpacity>
            <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="white" />
          </TouchableOpacity>
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