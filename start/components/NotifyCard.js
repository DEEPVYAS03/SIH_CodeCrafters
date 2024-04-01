import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";

const NotifyCard = ({ bank, title, validity_period, logo, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={tw`bg-white flex-row p-3 mb-2 rounded-lg shadow-md`}
    >
      <View style={tw`pr-3 justify-center `}>
        <Image
          source={{ uri: logo }}
          style={tw`w-16 h-16`}
          resizeMode="cover"
        />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-sm text-gray-500`}>{bank}</Text>
        <Text style={tw`text-black text-[16px]  font-bold`}>{title}</Text>
        <Text style={tw`text-gray-500 text-sm`}>
          Valid till {validity_period}
        </Text>
      </View>
      <View style={tw`justify-center pl-1`}>
        <Icon name="angle-right" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default NotifyCard;
