import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import SingleDropdown from '../components/SingleDropdown'
import MultiSelectComponent from '../components/MultiSelectComponent';
import Signdropdown from '../components/Signdropdown';
import axios from 'axios'
import {usePhone} from '../context/allContext'


export default function SignUpScreen() {
    const navigation = useNavigation();
    const {phone} = usePhone();
    const [presentIncome, setPresentIncome] = useState(null);
    const [fullName, setFullName] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [village, setVillage] = useState('');
    const [preference, setPreference] = useState([]);


    const handlePreferenceChange = (values) => {
        // Handle the selected values in the parent component
        setPreference(values);
      };


    const handleSelectState = (state) => {
        setState(state);
    };

    const handleSelectDistrict = (district) => {
        setDistrict(district);
    };

    const handleSelectVillage = (village) => {
        setVillage(village);
    };

    const handleSignUp = async () => {
        function convertToSentenceCase(word) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }

        try {
          // Perform validation or additional checks before making the API call
    
          // Example API endpoint. Replace it with your actual API endpoint.
          console.log("Api calling")
          const apiUrl = 'https://sih-backend.vercel.app/api/user/createProfile';
    
          // Prepare the data to be sent in the POST request
          const requestData = {
            name: fullName,
            number:phone, 
            state: 'Tamil Nadu',
            district:convertToSentenceCase( district),
            village: village,
            preference: preference,
            presentIncome: parseInt(presentIncome),
          };
          console.log("hi")
          console.log(requestData)
          // Make the API call using Axios
          const response = await axios.post(apiUrl, requestData);
        console.log(response)
          // Handle the response as needed (e.g., show success message)
          Alert.alert('Success', 'Sign up successful!');
    
          // Navigate to the login screen or any other screen after successful signup
          navigation.navigate('Home');
        } catch (error) {
          // Handle error (e.g., show error message)
          Alert.alert('Error', 'Failed to sign up. Please try again.');
          console.error('API error:', error);
        }
      };


    return (

        <View style={tw`flex-1 bg-white`} >
            <ScrollView showsVerticalScrollIndicator={false}>
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
                        <Text style={tw`text-gray-700 ml-3`}>Full Name: </Text>
                        <TextInput
                            style={tw`p-3 
                            border-b-[0.5px] text-gray-700 rounded-2xl mb-3`}
                            placeholder="Enter Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                        />

                        <Text style={tw`text-gray-700 ml-2`}>Location:</Text>
                        <Signdropdown onSelectState={handleSelectState}
                            onSelectDistrict={handleSelectDistrict}
                            onSelectVillage={handleSelectVillage} />
                        <Text style={tw`text-gray-700 ml-2 mt-1`}>Occupation:</Text>
                        
                        <MultiSelectComponent onSelectedValuesChange={handlePreferenceChange} />

                        <Text style={tw`text-gray-700 mt-3 ml-2`}>Present Income:</Text>
                        <TextInput
                            style={tw`p-3 
                            border-b-[0.5px] text-gray-700 rounded-2xl mb-3 `}
                            placeholder="Enter present income"
                            value={presentIncome}
                            keyboardType='numeric'
                            onChangeText={setPresentIncome}
                        />



                        <TouchableOpacity
                            onPress={() => {handleSignUp()}}
                            style={tw`py-3 bg-yellow-400 rounded-xl mb-7 mt-2`} >
                            <Text style={tw`text-xl font-bold text-center text-gray-700`}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}