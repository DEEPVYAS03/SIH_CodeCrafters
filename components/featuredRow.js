import React from 'react';
import { featured } from '../constants'
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from 'twrnc'
import RestaurantCard from '../screens/restaurantCard';
import { useState } from 'react'


const FeaturedRow = ({ title, description, restaurants }) => {

 const [recommend,setrecommend]= useState([]);


// const recommendprojects= async() =>
// {
//   const uid = AsyncStorage.getItem('userid');
//   const response= await axios.get('https://sih-backend.vercel.app/api/user/{uid}/recommend/projets/10000');
//   setrecommend(response.data.data);
// console.log(response.data.data);
   

// }
// recommendprojects();


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
                     restaurants.map((project, index) => (
                        <RestaurantCard
                        item={project}
                        key={index}

                        />
                    ))
                }
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;
