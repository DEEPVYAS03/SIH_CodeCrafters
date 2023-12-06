import React from 'react';
import { featured } from '../constants'
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from 'twrnc'
import RestaurantCard from './restaurantCard';


const FeaturedRow = ({ title, description, restaurants }) => {
    return (
        <View>
            <View style={tw`flex-row justify-between items-center px-4`}>
                <View>
                    <Text style={tw`font-bold text-lg`}>{title}</Text>
                    <Text style={tw`text-gray-500 text-xs`}>{description}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={tw`font-semibold text-yellow-800`}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                style={tw`overflow-visible py-5`}
            >
                {
                    restaurants.map((restaurant, index) => (
                        <RestaurantCard
                        item={restaurant}
                        key={index}

                        />
                    ))
                }
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;
