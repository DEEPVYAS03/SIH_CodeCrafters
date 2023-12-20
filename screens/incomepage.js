import { View, Text ,TextInput,ScrollView,StyleSheet, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import CheckBox from "react-native-check-box";
import MultiSelectComponent from "../components/MultiSelectComponent";
import Signdropdown from "../components/Signdropdown";
import Editdropdown from "../components/Editdropdown";
import Indropdown from "../components/Indropdown";
import SingleDropdown from "../components/SingleDropdown";
import tw from 'twrnc'
import Ionicons from "react-native-vector-icons/Ionicons";
import {Image} from 'react-native'
import {usePhone} from '../context/allContext'
import { useNavigation } from "@react-navigation/native";
import NotificationModal from "../components/NotificationModal";
import Message from "../components/Message";



export default function IncomePage() {
  const {fname} = usePhone();
  const navigation = useNavigation()
  const [iconClicked, setIconClicked] = useState(false);

  const handleIconClick = () => {
    setIconClicked(true);
  };

  const handleModalClose = () => {
    setIconClicked(false);
  };
  const [isChecked, setIsChecked] = useState({
    fisheries: false,
    agriculture: false,
    livestock: false,
    poultry: false,
    beekeeping: false,
    other: false,
    dairyfarming: false,
    tailoring: false,
  });

  const [selectedFields, setSelectedFields] = useState([]);

  const handleCheckboxClick = (field) => {
    const updatedCheckedState = { ...isChecked, [field]: !isChecked[field] };
    setIsChecked(updatedCheckedState);

    const selectedFieldsList = Object.keys(updatedCheckedState).filter(
      (key) => updatedCheckedState[key]
    );
    setSelectedFields(selectedFieldsList);
  };

  const chunkArray = (arr, chunkSize) => {
    let index = 0;
    let arrayLength = arr.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      let myChunk = arr.slice(index, index + chunkSize);
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  const checkboxesInRows = chunkArray(Object.keys(isChecked), 2);

  return (
    <>
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
            <Text style={tw`font-bold`}>Hi {fname}</Text>
            <Text>,2021</Text>
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
      <View style={{ padding: 30 }}>
        {/* Assuming SingleDropdown is a component rendering something */}
        {/* <SingleDropdown /> */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "black", marginBottom: 20 }}>
            Select your activity
          </Text>
        </View>

        {checkboxesInRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.checkboxRow}>
            {row.map((field, colIndex) => (
              <CheckBox
                key={field}
                style={styles.checkbox}
                isChecked={isChecked[field]}
                onClick={() => handleCheckboxClick(field)}
                rightText={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalize the first letter
                rightTextStyles={{
                  fontSize: 19,
                  color: isChecked[field] ? "green" : "black",
                  fontWeight: "bold",
                }}
                checkedCheckBoxColor="green"
                uncheckedCheckBoxColor="black"
              />
            ))}
          </View>
        ))}

        {selectedFields.map((field) => (
          <View key={field}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{field}</Text>
            <TextInput
              style={{
                borderRadius: 10,
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 16,
                paddingHorizontal: 10,
                keyboardType: "numeric",
              }}
              placeholder={`Enter income earned`}
            />

            {field === "agriculture" && (
              <TextInput
                style={{
                  borderRadius: 10,
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  marginBottom: 16,
                  paddingHorizontal: 10,
                }}
                placeholder={`Enter land used`}
              />
            )}

            <TextInput
              style={{
                borderRadius: 10,
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 16,
                paddingHorizontal: 10,
              }}
              placeholder={`Enter project`}
            />
          </View>
        ))}
      </View>
      <View style={tw`h-full w-full flex items-center pb-6`}>
      <TouchableOpacity style={tw`w-40 h-13 bg-green-700 flex justify-center items-center border rounded-3xl `}>
              <Text style={tw`text-xl text-white font-semibold`}>Submit</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  checkbox: {
    flexBasis: "48%", 
  },
});



