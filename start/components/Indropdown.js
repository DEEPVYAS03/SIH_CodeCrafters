import React, { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



const hardcodedData = {
  projects: [
    { label: 'WHS1', value: 'WHS1' },
    { label: 'WHS2', value: 'WHS2' },

  ],
  occupations: {
    WHS1: [
      { label: 'Fisheries', value: 'FY' },
      { label: 'Agriculture', value: 'AG' },
      // Add more districts for the USA as needed
    ],
    WHS2: [
      { label: 'Goatery', value: 'GY' },
      { label: 'Bee keeping', value: 'BK' },
      // Add more districts for Canada as needed
    ],
  },
};

const Indropdown = () => {
  const [project, setProject] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [projectName, setProjectName] = useState(null);
  const [occupationName, setOccupationName] = useState(null);
const [isFocus, setIsFocus] = useState(false);

  const handleOccupation = (projectValue) => {
    setProject(projectValue);
    setOccupation(null);
    setProjectName(hardcodedData.projects.find((p) => p.value === projectValue)?.label || null);
    setOccupationData(hardcodedData.occupations[projectValue] || []);
  };

//   const handleVillage = (occupationValue) => {
//     setDistrict(districtValue);
//     setVillage(null);
//     setDistrictName(hardcodedData.districts[state][districtValue]?.label || null);
//     setVillageData(hardcodedData.villages[districtValue] || []);
//   };

//   const handleVillageSelection = (villageValue) => {
//     setVillage(villageValue);
//     setVillageName(hardcodedData.villages[district][villageValue]?.label || null);
//   };

  const [projectData, setProjectData] = useState(hardcodedData.projects);
  const [occupationData, setOccupationData] = useState([]);
//   const [villageData, setVillageData] = useState([]);

  return (
    <View style={tw`w-69 mt-3`}>
      <StatusBar barStyle="light-content" />
      <View style={{borderRadius: 15 }}>
        <View >
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={projectData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Project Name' : '...'}
          searchPlaceholder="Search..."
          value={project}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => handleOccupation(item.value)}
          renderLeftIcon={() => (
            <FontAwesome
              style={styles.icon}
              name="bar-chart-o"
              size={20}
            />
          )}
        />
        </View>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={occupationData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Occupation' : '...'}
          searchPlaceholder="Search..."
          value={occupation}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => setOccupation(item.value)}
          renderLeftIcon={() => (
            <FontAwesome
              style={styles.icon}
              name="briefcase"
              size={20}
            />
          )}
        />
        {/* <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={villageData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select village' : '...'}
          searchPlaceholder="Search..."
          value={village}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => handleVillageSelection(item.value)}
           renderLeftIcon={() => (
            <FontAwesome
              style={styles.icon}
              name="map-pin"
              size={20}
            />
          )}
        /> */}
      </View>
    </View>
  );
};

export default Indropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor:'gray',
    borderBottomWidth: 0.5,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    marginLeft: 15,
    color: 'gray',
  },
  selectedTextStyle: {
    // fontSize: 16,
    marginLeft: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    // height: 40,
    // fontSize: 16,
  },
});