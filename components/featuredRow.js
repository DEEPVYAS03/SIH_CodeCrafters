import React,{useEffect} from 'react';
import { featured } from '../constants'
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from 'twrnc'
import RestaurantCard from '../screens/restaurantCard';
import { useState } from 'react'
import {useId} from '../context/allContext'
import axios from 'axios';


const FeaturedRow = ({ title, description, restaurants ,image}) => {
    const [mandis,setMandis] = useState([])
    const mandisfetch = async () => {
        const state = 'Maharashtra';
        const response = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bstate%5D=' + state);
        setMandis(response.data.data);
        console.log('Mandusssss',response.data)
        console.log('Mandis:',mandis)
    }
    useEffect(() => {

        mandisfetch();  

    }, [])

    return (
        <View>
            <View style={tw`flex-row justify-between items-center px-4`}>
                <View>
                    <Text style={tw`font-bold text-lg`}>{title}</Text>
                    <Text style={tw`text-gray-500 text-xs`}>{description}</Text>
                </View>
                {/* <TouchableOpacity>
                    <Text style={tw`font-semibold text-yellow-800`}>See All</Text>
                </TouchableOpacity> */}
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
                        image={image}
                        title={title}

                        />
                    ))
                }
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;
