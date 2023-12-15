import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text, Image } from 'react-native';
import * as Icon from "react-native-feather";
import tw from 'twrnc'
import {useNavigation} from '@react-navigation/native'

const RestaurantCard = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback >
            <View style={tw`mr-6 bg-white rounded-3xl shadow-lg`}>
                <Image style={tw`h-36 w-64 rounded-t-3xl`} source={item.image} />
                <View style={tw`px-3 pb-4 space-y-2`}>
                    <Text style={tw`text-lg font-bold pt-2`}>{item.name}</Text>
                    <View style={tw`flex-row items-center space-x-1`}>
                        <Image source={require('../assets/images/fullStar.png')} style={tw`h-4 w-4`} />
                        <Text style={tw`text-green-700`}>{item.stars}</Text>
                        <Text style={tw`text-gray-700`}>
                            ({item.reviews} review).<Text style={tw`font-semibold`}>{item.category}</Text>
                        </Text>
                    </View>

                <View style={tw`flex-row items-center space-x-1`}>
                    <Icon.MapPin color='gray' width='15' height='15' />
                    <Text style={tw`text-gray-700 text-xs`}>Nearby {item.address}</Text>
                </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default RestaurantCard;

