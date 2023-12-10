import React, { useState ,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput , ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon , MapPinIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import SingleDropdown from '../components/SingleDropdown'
import MultiSelectComponent from '../components/MultiSelectComponent';
import Signdropdown from '../components/Signdropdown';


export default function SignUpScreen() {
    const navigation = useNavigation();
    const [presentIncome, setPresentIncome] = useState('');
    const [fullName, setFullName] = useState('');
  //   const [selectedState, setSelectedState] = useState(null);
  //   const [selectedDistrict, setSelectedDistrict] = useState(null);
  //    const [selectedVillage, setSelectedVillage] = useState(null);

  // const states = [
  //   { label: 'Tamil Nadu', value: 'TN' },
  //   // Add more states as needed
  // ];

  // const districts = {
  //   TN: [
  //     { label: 'Dharmapuri', value: 'Dharmapuri' },
  //     { label: 'Salem', value: 'Salem' },
  //     { label: 'Karur', value: 'Karur' },
  //     // Add more districts for other states
  //   ],
  // };

  // const villages = {
  //   Dharmapuri: [
  //     { label: 'Kuppur', value: 'Kuppur' },
  //     { label: 'Mookanur', value: 'Mookanur' },
  //     // Add more villages for other districts
  //   ],
  //   Salem: [
  //     // Villages for Salem
  //   ],
  //   Karur: [
  //     // Villages for Karur
  //   ],
  //   // Add more districts and villages as needed
  // };

  // useEffect(() => {
  //   // Your logic for handling state updates goes here
  //   // For example, you can perform actions based on selectedState, selectedDistrict, etc.
  // }, [selectedState, selectedDistrict, selectedVillage]);
  

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
                    <Signdropdown/>
                    <Text style={tw`text-gray-700 ml-2 mt-1`}>Occupation:</Text>
                    <MultiSelectComponent />

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
                    onPress={() => navigation.navigate('Login')}
                     style={tw`py-3 bg-yellow-400 rounded-xl mb-7 mt-2`} >
                        <Text style={tw`text-xl font-bold text-center text-gray-700`}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
                </ScrollView>
        </View>
    );
}