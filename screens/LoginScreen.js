import React from 'react';
import { createContext, useContext,useState , useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { TouchableHighlight } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage,{showMessage} from 'react-native-flash-message';

import { usePhone } from '../context/allContext';

export default function LoginScreen() {
  const { phone, setPhone } = usePhone();
  const [otp, setOtp] = useState('');
  const [sendOtpClicked, setSendOtpClicked] = useState(false); // Flag to track whether "Send OTP" button is clicked
  const navigation = useNavigation();
  useEffect(() => {
    // This will be called when the component mounts or when "Send OTP" button is clicked
    if (sendOtpClicked) {
      sendOTP();
      setSendOtpClicked(false); // Reset the flag
    }
  }, [sendOtpClicked]); // Dependency includes the flag to run effect when the flag changes

  const sendOTP = async () => {
    try {
      const response = await axios.post('https://sih-backend.vercel.app/api/getOTP', {
        number: phone,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendOTPClick = () => {
    if (!sendOtpClicked) {
      setSendOtpClicked(true);
    } // Set the flag when "Send OTP" button is clicked
  };


  const verifyOTP = async () => {
    try{
    const data = {
      number:phone ,
      otp: otp,
    }
      const response = await axios.post('https://sih-backend.vercel.app/api/verifyOTP', data);
      

      if (response.data.status === 'success') {
        if (response.data.isUser) {
          // User is verified, navigate to Home
          navigation.navigate('Home');
          console.log(response.data);
          console.log('User is verified');
          await AsyncStorage.setItem('userid',response.data.data._id);

          const final= await AsyncStorage.getItem('userid');
          showMessage({
            message:"Login Successful",
            type:"success",

          }



          )
         
        } else {
          // User is not verified, navigate to Signup
          navigation.navigate('SignUp');

        }
      } else {
        console.log('Error: OTP verification failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
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
              placeholder="Enter your phone number"
              keyboardType='numeric'
              value={phone}
              onChangeText={setPhone}
            />
            <TouchableOpacity
              style={tw`bg-yellow-400 p-4 rounded-2xl ml-3`}
              onPress={handleSendOTPClick}
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
            keyboardType='numeric'
          />
         
          <TouchableOpacity 
        onPress={verifyOTP}
          style={tw`py-3 bg-yellow-400 rounded-xl mt-4 `}>
            <Text style={tw`text-xl font-bold text-center text-gray-700`}>Login</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
    
  );
}
