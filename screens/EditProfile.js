import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Image, ScrollView, SafeAreaView, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationModal from '../components/NotificationModal';
import Message from '../components/Message';
import { useNavigation } from '@react-navigation/native';
import {useLocation,usePhone} from '../context/allContext';
import DropdownComponent from '../components/Editdropdown';
import Signdropdown from '../components/Signdropdown';


const EditProfile = () => {

    // const {colors} = useTheme();

    const {state,setState,district,setDistrict,village, setVillage} = useLocation();

    const {fname,setFname ,lname, setLname , phone,setPhone, email,setEmail} = usePhone();
    const navigation = useNavigation();
    const [iconClicked, setIconClicked] = useState(false);

    const handleIconClick = () => {
        setIconClicked(true);
    };

    const handleModalClose = () => {
        setIconClicked(false);
    };

    const handleSubmit = () => {
            Alert.alert('Profile editted successfully')
            navigation.navigate('Home')
    }

    const handleSelectState = (state) => {
        setState(state);
    };

    const handleSelectDistrict = (district) => {
        setDistrict(district);
    };

    const handleSelectVillage = (village) => {
        setVillage(village);
    };


    return (
        <View style={tw`bg-white h-full `}>
            <View style={tw`flex mt-7 flex-row mt-10 h-18`}>
                <View style={tw`flex-1 flex-row `}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons
                            style={tw`mt-2 ml-2 mr-2`}
                            name="menu"
                            size={35}
                            color="black"
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../assets/user-profile.jpg")}
              style={tw`w-15 h-15 rounded-full ml-1`}
            />
          </TouchableOpacity> */}
                    <View style={tw`ml-3 mt-2`}>
                        <Text style={tw`font-bold`}>Hi {fname}</Text>
                        <Text>Aug 12,2021</Text>
                    </View>
                </View>
                <View style={tw`mt-2 mr-3`}>
                    <TouchableOpacity onPress={handleIconClick}>
                        <Ionicons name="notifications" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <NotificationModal
                    isVisible={iconClicked}
                    message= {<Message />}
                    onClose={handleModalClose}
                />
            </View>
            <ScrollView style={tw`pb-10`}>
                <View styles={tw`flex-1`}>
                    <View style={tw`mx-15`}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                                <View style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <ImageBackground source={require('../assets/user-profile.jpg')}
                                        style={{ height: 100, width: 100 }}
                                        imageStyle={{ borderRadius: 15 }}>
                                        <View>
                                            <Icon name='camera' size={35}
                                                color='#fff' style={{
                                                    opacity: 0.7,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',

                                                }}>

                                            </Icon>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{fname}{lname}</Text>
                        </View>
                        <View>
                            <Text style={tw`-ml-10 text-xl font-bold mt-10`}>Personal Information :</Text>
                        </View>
                        <View style={tw`flex flex-row border-b-[0.5px] mt-6 border-slate-400 pb-2 w-74`}>
                            <FontAwesome name='user' size={20} />
                            <TextInput
                                value={fname}
                                placeholder='First Name'
                                placeholderTextColor='#666666'
                                autoCorrect={false}
                                style={tw`flex-1 ml-5 -mt-1 `}
                                onChange={(item)=>setFname(item.value)}
                            />
                        </View>
                        <View style={tw`flex flex-row border-b-[0.5px] mt-6 border-slate-400 pb-2 w-74`}>
                            <FontAwesome name='user' size={20} />
                            <TextInput
                                placeholder='Last Name'
                                placeholderTextColor='#666666'
                                autoCorrect={false}
                                style={tw`flex-1 ml-5 -mt-1 `}
                                value={lname}
                                onChange={(item)=>setLname(item.value)}
                            />
                        </View>
                        <View style={tw`flex flex-row border-b-[0.5px] mt-6 border-slate-400 pb-2 w-74`}>
                            <FontAwesome name='phone' size={20} />
                            <TextInput
                                placeholder='Phone Number'
                                placeholderTextColor='#666666'
                                keyboardType='numeric'
                                autoCorrect={false}
                                style={tw`flex-1 ml-5 -mt-1 `}
                                value={phone}
                                onChange={(item)=>setPhone(item.value)}
                            />
                        </View>
                        <View style={tw`flex flex-row border-b-[0.5px] mt-6 border-slate-400 pb-2  w-74`}>
                            <FontAwesome name='envelope' size={20} />
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor='#666666'
                                autoCorrect={false}
                                style={tw`flex-1 ml-5 -mt-1`}
                                value={email}
                                onChange={(item)=>setEmail(item.value)}
                            />
                        </View>

                        {/* <DropdownComponent />
                         */}
                        <View style={tw`-ml-4 mt-1`}>
                         <Signdropdown onSelectState={handleSelectState}
                            onSelectDistrict={handleSelectDistrict}
                            onSelectVillage={handleSelectVillage} />
                         </View>

                        {/* <View>
                            <Text style={tw`-ml-10 text-xl font-bold mt-6`}>Professional Information :</Text>
                        </View>
                        <Indropdown />
                        <View style={tw`flex flex-row border-b-[0.5px] mt-4 border-slate-400 pb-2 mb-10`}>
                            <FontAwesome name='money' size={20} />
                            <TextInput
                                placeholder='Money Earned'
                                placeholderTextColor='#666666'
                                keyboardType='numeric'
                                autoCorrect={false}
                                style={tw`flex-1 ml-5 -mt-1 `}
                            />
                        </View> */}
                        
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#0F3460',
                                padding: 20,
                                borderRadius: 15,
                                alignItems: 'center',
                                marginBottom: 20,
                                marginTop:10
                            }}
                            onPress={() =>{handleSubmit()}}>
                            <Text
                                style={{
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                }}>
                                Submit
                            </Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </ScrollView >
        </View >

    );
};

export default EditProfile;

const styles = StyleSheet.create({
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
      },
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
    })    