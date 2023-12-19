import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'react-native';
import * as Icon from "react-native-feather";
import tw from 'twrnc'
import {useNavigation} from '@react-navigation/native'

const RestaurantCard = ({ item,image }) => {
    const navigation = useNavigation();
    // console.log('WDC item',item)
    // console.log('WDC image:',item.image)
    return (
        <View style={tw`mb-2`}>
        <TouchableWithoutFeedback>
            <View style={tw`mr-6 bg-white rounded-2xl shadow-lg`}>
                <Image style={{...tw`h-40 w-64 `,resizeMode:'contain'}} source={image} />
                <View style={tw`px-3 pb-4 space-y-2`}>
                    <Text style={tw`text-lg font-bold pt-2`}>{item.project_name}</Text>
                    <View style={tw`flex-row items-center space-x-1`}>
                        {/* <Image source={require('../assets/images/fullStar.png')} style={tw`h-4 w-4`} /> */}
                        {/* <Text style={tw`text-green-700`}>{item.stars}</Text>
                        <Text style={tw`text-gray-700`}>
                            ({item.reviews} review).<Text style={tw`font-semibold`}>{item.category}</Text>
                        </Text> */}
                    </View>

                <View style={tw`flex-row items-center space-x-1`}>
                    <Icon.MapPin color='gray' width='15' height='15' />
                    <Text style={tw`text-gray-700 text-xs`}>Nearby {item.village}</Text>
                </View>
                    <Text style={tw`text-gray-700 text-xs`}>Start year: {item.project_start}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </View>
    );
};

export default RestaurantCard;

