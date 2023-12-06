import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity ,Image } from "react-native";
import tw from "twrnc";
import {categories} from '../constants'
import { useState } from 'react'

export default function Categories() {
    const [activeCategory, setActiveCategory] = useState(null)
    return (
        <View style={tw`mt-4`}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tw`overflow-visible`}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
            >
                {
                    categories.map((category, index) => {
                        let isActive = category.id === activeCategory;
                        let btnClass = isActive ? 'bg-yellow-800' : 'bg-gray-200';
                        let textClass=isActive ?'font-semibold text-gray-800' :'text-gray-500';
                        

                        return (
                            <View key={index} style={tw`flex justify-center items-center mr-3`}>

                                <TouchableOpacity
                                    onPress={() => setActiveCategory(category.id)}
                                    style={tw`p-3 w-30 h-30 rounded-[12px] shadow bg-gray-200 ${btnClass}`}>

                                    <Image 
                                    style={{ width: 65, height: 65 }}
                                    source={category.image} />


                                </TouchableOpacity>
                                    <Text style={tw`text-sm`}>{category.name}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}