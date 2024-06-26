import React, { useState ,useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from 'twrnc';

const data = [
  { label: 'Fisheries', value: 'Fisheries' },
  { label: 'Agriculture', value: 'Agriculture' },
]

const MultiSelectComponent = ({onSelectedValuesChange}) => {
  const [selected, setSelected] = useState([]);


  // Use useEffect to update selectedValues whenever selected changes
  useEffect(() => {
    onSelectedValuesChange(selected);
  }, [selected]);


  return (
    <View style={tw`px-2 mx-1`}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select occupation"
        searchPlaceholder="Search..."
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({

  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});