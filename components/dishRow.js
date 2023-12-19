import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import * as Icon from 'react-native-feather'

export default function DishRow({ item }) {
    // console.log(item)
    return (
        <View style={tw`flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2`}>
            <Image style={tw`rounded-3xl h-27 w-27`} source={require("../assets/WDC-image.jpg")} />

            <View style={tw`flex flex-1 space-y-3`}>
                <View style={tw`pl-3`}>
                    <Text style={tw`text-xl`}>{item.project_name}</Text>
                    <Text>{item.village}</Text>
                    <Text style={tw`text-gray-700`}>{item.description}</Text>
                </View>
                <View style={tw`flex-row justify-between pl-3 items-center`}>
                    <Text style={tw`text-gray-700`}>
                       {item.project_start}
                    </Text>
                    <View style={tw`flex-row items-center`}>
                        

                        
                    </View>

                </View>
            </View>
        </View>
    )
}