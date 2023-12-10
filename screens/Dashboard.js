

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import tw from "twrnc";
import Ionicons from "react-native-vector-icons/Ionicons";

import { MyBezierLineChart, MyBarGraph } from "../components/charts";
import { useNavigation } from "@react-navigation/native";
import NotificationModal from "../components/NotificationModal";
import Message from "../components/Message";
import {Box1} from '../components/charts'
import {Box2} from '../components/charts'
import {ProgressRing} from '../components/charts'


const Dashboard = () => {
  const navigation = useNavigation();

  const [iconClicked, setIconClicked] = useState(false);

  const handleIconClick = () => {
    setIconClicked(true);
  };

  const handleModalClose = () => {
    setIconClicked(false);
  };

  return (

    <>
      {/* Header */}
      <View style={tw`flex mt-7 flex-row mt-10 h-18`}>
        <View style={tw`flex-1 flex-row `}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons
              style={tw`mt-3 mr-2`}
              name="arrow-back"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../assets/user-profile.jpg")}
              style={tw`w-15 h-15 rounded-full ml-1`}
            />
          </TouchableOpacity>
          <View style={tw`ml-3 mt-2`}>
            <Text style={tw`font-bold`}>Hi Jane</Text>
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
        message=<Message/>
        onClose={handleModalClose}
      />
      </View>

      <ScrollView>
        <View
          style={tw`mt-1 bg-[#2E335A] h-40 m-1 overflow-hidden  rounded-lg`}
        >
          {/* My dashboard */}
          <View style={tw`flex-row rounded-lg`}>
            <View>
              <Text style={tw`text-white mt-5 ml-5 text-2xl`}>My</Text>
              <Text style={tw`text-white ml-5 text-2xl`}>Dashboard</Text>
            </View>
            <View style={tw`mt-2 h-38 ml-21`}>
            <ProgressRing/>
            </View>
          </View>

          {/* <View style={tw`flex flex-row`}>
          <Text style={tw`text-white text-2xl font-bold mb-5 ml-2`}>
            Weather Updates
          </Text>
          <Ionicons
            style={tw`ml-1`}
            name="arrow-forward"
            size={30}
            color="white"
          />
        </View>
        <View style={tw`flex-row h-40 justify-between`}>
          <View>
            <View>
              <Text style={tw`m-7 text-white text-2xl font-bold`}>
                28 degree cel
              </Text>
            </View>
            <View></View>
          </View>
          <View style={tw`h-25 w-25 overflow-hidden`}>
            <Image
              style={tw`h-full w-full`}
              source={require("../assets/Sun_loud_rain.png")}
              resizeMode="contain"
            ></Image>
          </View>
        </View>

       

        <View style={tw`h-50 p-3 flex flex-row rounded-t-[40px] bg-white mx-1 z-10 justify-between`}>
          <View
            style={tw`bg-gray-200  h-[95%] ml-2 w-[46.5%] rounded-3xl`}
          ></View>
          <View
            style={tw`bg-gray-200  h-[95%] ml-2 w-[46.5%] rounded-3xl`}
          ></View>
          <View></View>
        </View> */}
        </View>
        {/* weather updates */}
        <View style={tw`rounded-t-lg mx-1 flex flex-row bg-[#2E335A]`}>
          <Text style={tw`text-white text-2xl font-bold mb-5 ml-2`}>
            Weather Updates
          </Text>
        </View>

        {/*  degress*/}
        <View style={tw`flex-row rounded-b-lg h-35 mx-1 justify-between bg-[#2E335A]`}>
          <View>
            <View>
              <Text style={tw`m-7 text-white text-2xl font-bold`}>
                28 degree cel
              </Text>
            </View>
            <View></View>
          </View>
          <View style={tw`h-25 w-25 overflow-hidden`}>
            <Image
              style={tw`h-full w-full`}
              source={require("../assets/Sun_loud_rain.png")}
              resizeMode="contain"
            ></Image>
          </View>
        </View>
        <View>
        <View style={tw`mx-1 pb-5 rounded-b-3xl bg-white  `}>
            <Text></Text>
          <MyBezierLineChart />
          </View>
          </View>
        {/* dabbe */}
        <View style={tw`h-55 py-3 flex flex-row rounded-lg bg-white mx-1 justify-between`}>
          <View
            style={tw`bg-gray-200  h-[95%] ml-1 w-[46.5%] rounded-3xl`}
          >
            <Box1/>
            
          </View>
          <View
            style={tw`bg-gray-200  h-[95%] mr-1 w-[46.5%] rounded-3xl`}
          >
            <Box2/>
          </View>

        </View>
        {/* </ImageBackground> */}

        <View style={tw`mx-1 pb-5 rounded-b-3xl bg-white  `}>
          {/* <View>
            <Text></Text>
          <MyBezierLineChart />
          </View> */}


          <View>
          <MyBarGraph />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
