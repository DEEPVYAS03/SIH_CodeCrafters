import React, { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



const hardcodedData = {
  states: [
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'CAN' },
    // Add more states as needed
  ],
  districts: {
    USA: [
      { label: 'New York', value: 'NY' },
      { label: 'California', value: 'CA' },
      // Add more districts for the USA as needed
    ],
    CAN: [
      { label: 'Ontario', value: 'ON' },
      { label: 'Quebec', value: 'QC' },
      // Add more districts for Canada as needed
    ],
  },
  villages: {
    NY: [
      { label: 'New York City', value: 'NYC' },
      { label: 'Buffalo', value: 'BUF' },
      // Add more villages for New York as needed
    ],
    CA: [
      { label: 'Los Angeles', value: 'LA' },
      { label: 'San Francisco', value: 'SF' },
      // Add more villages for California as needed
    ],
    ON: [
      { label: 'Toronto', value: 'TOR' },
      { label: 'Ottawa', value: 'OTT' },
      // Add more villages for Ontario as needed
    ],
    QC: [
      { label: 'Montreal', value: 'MTL' },
     
      { label: 'Quebec City', value: 'QCC' },
      // Add more villages for Quebec as needed
    ],
  },
};

const Signdropdown = () => {
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [village, setVillage] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [districtName, setDistrictName] = useState(null);
  const [villageName, setVillageName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleDistrict = (stateValue) => {
    setState(stateValue);
    setDistrict(null);
    setVillage(null);
    setStateName(hardcodedData.states.find((s) => s.value === stateValue)?.label || null);
    setDistrictData(hardcodedData.districts[stateValue] || []);
  };

  const handleVillage = (districtValue) => {
    setDistrict(districtValue);
    setVillage(null);
    setDistrictName(hardcodedData.districts[state][districtValue]?.label || null);
    setVillageData(hardcodedData.villages[districtValue] || []);
  };

  const handleVillageSelection = (villageValue) => {
    setVillage(villageValue);
    setVillageName(hardcodedData.villages[district][villageValue]?.label || null);
  };

  const [stateData, setStateData] = useState(hardcodedData.states);
  const [districtData, setDistrictData] = useState([]);
  const [villageData, setVillageData] = useState([]);

  return (
    <View style={tw`w-77 mt-1 ml-3`}>
      <StatusBar barStyle="light-content" />
      <View style={{borderRadius: 15 }}>
        <View >
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={stateData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select state' : '...'}
          searchPlaceholder="Search..."
          value={state}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => handleDistrict(item.value)}
          renderLeftIcon={() => (
            <FontAwesome
              style={styles.icon}
              name="globe"
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
          data={districtData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select district' : '...'}
          searchPlaceholder="Search..."
          value={district}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => handleVillage(item.value)}
          renderLeftIcon={() => (
            <FontAwesome
              style={styles.icon}
              name="map"
              size={20}
            />
          )}
        />
        <Dropdown
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
              name="map"
              size={20}
            />
          )}
        />

        {/* <TouchableOpacity
          style={{
            backgroundColor: '#0F3460',
            padding: 20,
            borderRadius: 15,
            alignItems: 'center',
          }}
          onPress={() =>
            Alert.alert(`
              You have selected\nCountry: ${countryName}\nState: ${stateName}\nCity: ${cityName}`
            )
          }>
          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}>
            Submit
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Signdropdown;

const styles = StyleSheet.create({
  dropdown: {
    
    height: 45,
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