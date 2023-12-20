// import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
// import React, { useState } from "react";
// import CheckBox from "react-native-check-box";
// import tw from 'twrnc'
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { Image } from 'react-native'
// import { usePhone } from '../context/allContext'
// import { useNavigation } from "@react-navigation/native";
// import NotificationModal from "../components/NotificationModal";
// import Message from "../components/Message";

// export default function IncomePage() {
//   const { fname } = usePhone();
//   const navigation = useNavigation();
//   const [iconClicked, setIconClicked] = useState(false);

//   const handleIconClick = () => {
//     setIconClicked(true);
//   };

//   const handleModalClose = () => {
//     setIconClicked(false);
//   };

//   const [isChecked, setIsChecked] = useState({
//     fisheries: false,
//     agriculture: false,
//     livestock: false,
//     poultry: false,
//     beekeeping: false,
//     other: false,
//     dairyfarming: false,
//     tailoring: false,
//   });

//   const [selectedData, setSelectedData] = useState([]);

//   const handleCheckboxClick = (field) => {
//     const updatedCheckedState = { ...isChecked, [field]: !isChecked[field] };
//     setIsChecked(updatedCheckedState);

//     const selectedFieldsList = Object.keys(updatedCheckedState).filter(
//       (key) => updatedCheckedState[key]
//     );

//     const newData = selectedFieldsList.map((selectedField) => {
//       if (selectedField === "agriculture") {
//         return {
//           selectedActivity: selectedField,
//           incomeEarned: "",
//           landUsed: "",
//           projectName: "",
//         };
//       } else {
//         return {
//           selectedActivity: selectedField,
//           incomeEarned: "",
//           projectName: "",
//         };
//       }
//     });

//     setSelectedData(newData);
//   };

//   const handleFieldChange = (field, value, index) => {
//     setSelectedData((prevData) => {
//       const newData = [...prevData];
//       newData[index][field] = value;
//       return newData;
//     });
//   };

//   const handleSubmit = () => {
//     // Handle the submission of selectedData
//     console.log(selectedData);
//   };

//   return (
//     <>
//       <View style={tw`flex mt-7 flex-row mt-10 h-18`}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Ionicons
//             style={tw`mt-3 mr-2`}
//             name="arrow-back"
//             size={30}
//             color="black"
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Image
//             source={require("../assets/user-profile.jpg")}
//             style={tw`w-15 h-15 rounded-full ml-1`}
//           />
//         </TouchableOpacity>
//         <View style={tw`ml-3 mt-2`}>
//           <Text style={tw`font-bold`}>Hi {fname}</Text>
//           <Text>Aug 12,2021</Text>
//         </View>
//         <View style={tw`mt-2 mr-3`}>
//           <TouchableOpacity onPress={handleIconClick}>
//             <Ionicons name="notifications" size={28} color="black" />
//           </TouchableOpacity>
//         </View>
//         <NotificationModal
//           isVisible={iconClicked}
//           message=<Message/>
//           onClose={handleModalClose}
//         />
//       </View>
//       <ScrollView>
//         <View style={{ padding: 30 }}>
//           {Object.keys(isChecked).map((field) => (
//             <CheckBox
//               key={field}
//               style={styles.checkbox}
//               isChecked={isChecked[field]}
//               onClick={() => handleCheckboxClick(field)}
//               rightText={field.charAt(0).toUpperCase() + field.slice(1)}
//               rightTextStyles={{
//                 fontSize: 19,
//                 color: isChecked[field] ? "green" : "black",
//                 fontWeight: "bold",
//               }}
//               checkedCheckBoxColor="green"
//               uncheckedCheckBoxColor="black"
//             />
//           ))}
//           {selectedData.map((data, index) => (
//             <View key={index}>
//               <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{data.selectedActivity}</Text>
//               <TextInput
//                 style={{
//                   borderRadius: 10,
//                   height: 40,
//                   borderColor: "gray",
//                   borderWidth: 1,
//                   marginBottom: 16,
//                   paddingHorizontal: 10,
//                   keyboardType: "numeric",
//                 }}
//                 placeholder={`Enter income earned`}
//                 onChangeText={(value) => handleFieldChange("incomeEarned", value, index)}
//               />

//               {data.selectedActivity === "agriculture" && (
//                 <TextInput
//                   style={{
//                     borderRadius: 10,
//                     height: 40,
//                     borderColor: "gray",
//                     borderWidth: 1,
//                     marginBottom: 16,
//                     paddingHorizontal: 10,
//                   }}
//                   placeholder={`Enter land used`}
//                   onChangeText={(value) => handleFieldChange("landUsed", value, index)}
//                 />
//               )}

//               <TextInput
//                 style={{
//                   borderRadius: 10,
//                   height: 40,
//                   borderColor: "gray",
//                   borderWidth: 1,
//                   marginBottom: 16,
//                   paddingHorizontal: 10,
//                 }}
//                 placeholder={`Enter project`}
//                 onChangeText={(value) => handleFieldChange("projectName", value, index)}
//               />
//             </View>
//           ))}
//         </View>
//         <View style={tw`h-full w-full flex items-center pb-6`}>
//           <TouchableOpacity
//             style={tw`w-40 h-13 bg-green-700 flex justify-center items-center border rounded-3xl `}
//             onPress={handleSubmit}
//           >
//             <Text style={tw`text-xl text-white font-semibold`}>Submit</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   checkboxRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   checkbox: {
//     flexBasis: "48%",
//   },
// });


import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import CheckBox from "react-native-check-box";
import tw from 'twrnc';
import Ionicons from "react-native-vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useId,usePhone } from "../context/allContext";
import { useNavigation } from "@react-navigation/native";
import NotificationModal from './../components/NotificationModal';
import Message from "../components/Message";
import { showMessage } from "react-native-flash-message";


export default function IncomePage() {
  const { userId } = useId();
  const navigation = useNavigation();
  const {fname} = usePhone();
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
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    // Load offline data when the component mounts
    loadOfflineData();
  }, []);

  const loadOfflineData = async () => {
    try {
      const offlineData = await AsyncStorage.getItem('offlineData');
      if (offlineData) {
        const parsedData = JSON.parse(offlineData);
        setSelectedData(parsedData);
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const storeDataOffline = async () => {
    try {
      await AsyncStorage.setItem('offlineData', JSON.stringify(selectedData));
      Alert.alert('Data stored offline', 'Data will be sent when the network is available.');
    } catch (error) {
      console.error('Error storing data offline:', error);
    }
  };

  const checkNetworkStatus = async () => {
    const netInfo = await NetInfo.fetch();

    if (netInfo.isConnected) {
      console.log('Network is available');
      // Network is available, submit the data
      console.log('User ID:', userId);
      const apiUrl = `https://sih-backend.vercel.app/api/user/${userId}/income/form`;
      console.log(selectedData)
      const data = {
        "data": selectedData
      }
      console.log(data)
      axios.post(apiUrl, data)
        .then(response => {
          console.log('API Response:', response.data);
        })
        .catch(error => {
          console.error('API Error:', error);
        });

      // Clear offline data if successfully submitted
      AsyncStorage.removeItem('offlineData');
    } else {
      console.log('Network is not available');
      // Network is not available, store data offline
      storeDataOffline();
    }
  };

  const handleCheckboxClick = (field) => {
    const updatedCheckedState = { ...isChecked, [field]: !isChecked[field] };
    setIsChecked(updatedCheckedState);

    const selectedFieldsList = Object.keys(updatedCheckedState).filter(
      (key) => updatedCheckedState[key]
    );

    const newData = selectedFieldsList.map((selectedField) => ({
      selectedActivity: selectedField,
      incomeEarned: "",
      projectName: "",
    }));
 
    setSelectedData(newData);
  };

  const handleFieldChange = (field, value, index) => {
    if (
      (field === 'incomeEarned' && !isNaN(value)) ||
      (field === 'projectName' && /^[a-zA-Z0-9\s-]+$/.test(value)) ||
      value === ''
    ) {
      setSelectedData((prevData) => {
        const newData = [...prevData];
        newData[index][field] = value;
        return newData;
      });
    } else {
      alert(
        field === 'incomeEarned'
          ? 'Please enter a valid number for income'
          : 'Please enter only alphanumeric characters for the project name'
      );
    }
  };

  const handleSubmit = () => {
    checkNetworkStatus();
    navigation.navigate('Home')
    Alert.alert('Income Details filled successfully')
  };

  return (
    <>
      <View style={tw`flex mt-7 flex-row mt-10 h-18`}>
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
          <Text>Aug 12,2021</Text>
        </View>
        <View style={tw`mt-2 ml-42 mr-3`}>
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
          {chunkArray(Object.keys(isChecked), 2).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.checkboxRow}>
              {row.map((field) => (
                <CheckBox
                  key={field}
                  style={styles.checkbox}
                  isChecked={isChecked[field]}
                  onClick={() => handleCheckboxClick(field)}
                  rightText={field.charAt(0).toUpperCase() + field.slice(1)}
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
          {selectedData.map((data, index) => (
            <View key={index}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{data.selectedActivity}</Text>
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
                onChangeText={(value) => handleFieldChange("incomeEarned", value, index)}
              />
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
                onChangeText={(value) => handleFieldChange("projectName", value, index)}
              />
            </View>
          ))}
        </View>
        <View style={tw`h-full w-full flex items-center pb-6`}>
          <TouchableOpacity
            style={tw`w-40 h-13 bg-green-700 flex justify-center items-center border rounded-3xl `}
            onPress={handleSubmit}
          >
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

function chunkArray(arr, chunkSize) {
  let index = 0;
  let arrayLength = arr.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    let myChunk = arr.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
}