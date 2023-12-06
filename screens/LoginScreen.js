import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { TouchableHighlight } from 'react-native';
import axios from 'axios';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [otp,setOtp] = useState('')
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1`}>
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
      <View style={tw`flex-1 bg-white px-8 pt-8`}>
        <View style={tw`form space-y-2`}>
          <Text style={tw`text-gray-700 ml-4`}>Phone Number</Text>
          <View style={tw`flex-row items-center`}>
            <TextInput
              style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 flex-1`}
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
            />
            <TouchableOpacity
              style={tw`bg-yellow-400 p-4 rounded-2xl ml-3`}
            >
              <Text style={tw`text-gray-700`}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          <Text style={tw`text-gray-700 ml-4`}>Otp</Text>
          <TextInput
            style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl`}
            secureTextEntry
            placeholder="password"
            value={otp}
            onChangeText={setOtp}
          />
         
          <TouchableOpacity 
         onPress={() => navigation.navigate('SignUp')}
          style={tw`py-3 bg-yellow-400 rounded-xl mt-4 `}>
            <Text style={tw`text-xl font-bold text-center text-gray-700`}>Login</Text>
          </TouchableOpacity>
        </View>
        
        
      </View>
    </View>
  );
}
