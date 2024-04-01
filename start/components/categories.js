import React, { useState,useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity ,Image } from "react-native";
import tw from "twrnc";
// import { categories } from '../constants';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import { categories } from './../constants/index';
import '../assets/images/states/tamilnadu.jpg'
import '../assets/images/states/gujarat.jpg'
import '../assets/images/states/nagaland.jpg'
import '../assets/images/states/himachal.jpg'
import '../assets/images/states/mp.jpg'
import { statepic } from "../constants/newConstants";

export default function Categories({ item }) { 
    const { restaurants } = item;
    const [image,setImage]=useState('')
    const [activeCategory, setActiveCategory] = useState(null);
    const [categories,setCategories] = useState([])
    const [stateprojects,setStateprojects] =useState([])
    const navigation = useNavigation();

    console.log(statepic)
    // console.log('State Projects:',stateprojects)
    const projectcat = async () => {
        try {
          const response = await axios.get('https://sih-backend.vercel.app/api/user/stateWiseProjects');
        //   console.log('GET Response:', response.data);
          setImage('Image:',response.data.states.image)
          setCategories(response.data.states)
          setStateprojects(response.data.projects)
        } catch (error) {
        //   console.error('GET Error:', error);
        }
      };
     
      useEffect(() => {
        projectcat();
      }, [])    
     
      console.log('Categories:',categories)
    //   console.log('Image:',image)
    //   console.log('Statename:',categories[0].state)
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
                {categories.map((category, index) => {
                    let isActive = category.id === activeCategory;
                    let btnClass = isActive ? 'bg-yellow-800' : 'bg-gray-200';
                    let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500';
                    // console.log('State:',category.state)
                    // console.log('Image:',category.image) 
                    // const imageSource = { uri: category.image };
                    return (
                        <View key={index} style={tw`flex justify-center items-center mr-3`}>
                            <TouchableOpacity
                                onPress={() => {
                                    setActiveCategory(category.id);
                                    navigation.navigate('Restaurant', {... stateprojects[index] , ...categories[index] ,index});
                                }}
                                style={tw`w-30 h-30 rounded-[12px] shadow bg-gray-200 ${btnClass}`}
                            >
                                <Image
                                    style={{ width: '100%', height: '100%' , resizeMode:'cover' }}
                                    source={statepic[index]}
                                />
                            </TouchableOpacity>
                            <Text style={tw`text-sm ${textClass}`}>{category.state}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}


