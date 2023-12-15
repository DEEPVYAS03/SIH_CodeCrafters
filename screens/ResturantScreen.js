import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
import * as Icon from 'react-native-feather';
import { themeColors } from '../theme';
import DishRow from '../components/dishRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function RestaurantScreen() {
    const { params } = useRoute();
    const navigation = useNavigation();
    let item = params;
    let category =params.category
    // const final= await AsyncStorage.getItem('userid');
    // console.log(restaurant)
    // const {dishes} = restaurant

    console.log('item:',item)

    return (
        <View>
            <ScrollView>
                <View style={tw`relative`}>
                    <Image style={tw`w-full h-72`} source={item.image} />
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={tw`absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow`}>
                        <Icon.ArrowLeft strokeWidth={3} stroke='orange' />
                    </TouchableOpacity>
                </View>
                <View
                    style={tw`rounded-tl-lg rounded-tr-lg bg-white -mt-12 pt-6`}
                >
                    <View style={tw`px-5`}>
                        <Text style={tw`text-3xl font-bold`}>{item.name}</Text>
                        {/* <View style={tw`flex-row space-x-2 my-1`}>
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
                        </View> */}

                        <Text style={tw`text-gray-500 mt-2`}>{item.description}</Text>

                    </View>
                </View>
                <View style={tw`pb-36 bg-white`} >
                    <Text style={tw`px-4 py-4 text-2xl font-bold`}>Menu</Text>
                    {/*dishes */}

                    {
                        item.dishes.map((dish, index) => <DishRow item={{ ...dish }} key={index} />)
                    }

                </View>

            </ScrollView>
        </View>
    );
};