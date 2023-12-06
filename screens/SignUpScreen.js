import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon , MapPinIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import MultiSelectComponent from '../components/MultiSelectComponent';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [presentIncome, setPresentIncome] = useState('');
    const [location, setLocation] = useState('');


    return (

        <View style={tw`flex-1 bg-white`} >

            <SafeAreaView style={tw`flex `}>
                <View style={tw`flex-row justify-start`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={tw`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4`}
                    >
                        <ArrowLeftIcon size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row justify-center`}>
                    <Image source={require('../assets/images/login.png')} style={{ width: 200, height: 200 }} />
                </View>
            </SafeAreaView>
            <View
                style={[tw`flex-1 bg-white px-8 pt-8`, { borderTopLeftRadius: 50, borderTopRightRadius: 50 }]}
            >
                <View style={tw`form space-y-2`}>
                   
                    <MultiSelectComponent />


                    <Text style={tw`text-gray-700 ml-4`}>Present Income</Text>
                    <TextInput
                        style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
                        placeholder="Enter present income"
                        value={presentIncome}
                        onChangeText={setPresentIncome}
                    />
                    <Text style={tw`text-gray-700 ml-4`}>Location</Text>
                <View >
                    {/* <MapPinIcon size={40} color="gray" /> */}
                    <TextInput
                        style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
                        placeholder="Enter location"
                        value={location}
                        onChangeText={setLocation}
                    />
                    
                </View>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                     style={tw`py-3 bg-yellow-400 rounded-xl`} >
                        <Text style={tw`text-xl font-bold text-center text-gray-700`}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    );
}
