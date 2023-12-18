import { View, Text ,TextInput,ScrollView,StyleSheet} from "react-native";
import React, { useState } from "react";
import CheckBox from "react-native-check-box";
import MultiSelectComponent from "../components/MultiSelectComponent";
import Signdropdown from "../components/Signdropdown";
import Editdropdown from "../components/Editdropdown";
import Indropdown from "../components/Indropdown";
import SingleDropdown from "../components/SingleDropdown";

// export default function App() {
  
//   const [isChecked, setIsChecked] = useState({
//     fisheries: false,
//     agriculture: false,
//     livestock: false,
//     poultry: false,
//     beekeeping: false,
//     other: false,
//   });
//   return (
//     <View style={{ padding: 30 }}>
      
  
//       <SingleDropdown/>
//       <Text
//         style={{
//           fontSize: 22,
//           fontWeight: "bold",
//           color: "black",
//           marginBottom: 20,
//         }}
//       >
//         Select your activity
//       </Text>
//       <>
//       <CheckBox
//         style={{ marginBottom: 16 }}
//         isChecked={isChecked.fisheries}
//         onClick={() =>
//           setIsChecked({ ...isChecked, fisheries: !isChecked.fisheries })
//         }
//         rightText="Fisheries"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.agriculture}
//         onClick={() =>
//           setIsChecked({ ...isChecked, agriculture: !isChecked.agriculture })
//         }
//         rightText="agriculture"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked.fisheries ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.livestock}
//         onClick={() =>
//           setIsChecked({ ...isChecked, livestock: !isChecked.livestock })
//         }
//         rightText=" livestock"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.poultry}
//         onClick={() =>
//           setIsChecked({ ...isChecked, poultry: !isChecked.poultry })
//         }
//         rightText="poultry"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.beekeeping}
//         onClick={() =>
//           setIsChecked({ ...isChecked, beekeeping: !isChecked.beekeeping })
//         }
//         rightText="beekeeping"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.other}
//         onClick={() =>
//           setIsChecked({ ...isChecked,other: !isChecked.other })
//         }
//         rightText="other"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.other}
//         onClick={() =>
//           setIsChecked({ ...isChecked,other: !isChecked.other })
//         }
//         rightText="other"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.other}
//         onClick={() =>
//           setIsChecked({ ...isChecked,other: !isChecked.other })
//         }
//         rightText="other"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.other}
//         onClick={() =>
//           setIsChecked({ ...isChecked,other: !isChecked.other })
//         }
//         rightText="other"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.dairyfarming}
//         onClick={() =>
//           setIsChecked({ ...isChecked,dairyfarming: !isChecked.dairyfarming })
//         }
//         rightText="dairy farming"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       <CheckBox
//        style={{ marginBottom: 16 }}
//         isChecked={isChecked.tailoring}
//         onClick={() =>
//           setIsChecked({ ...isChecked,tailoring: !isChecked.other })
//         }
//         rightText="tailoring"
//         rightTextStyles={{
//           fontSize: 19,
//           color: isChecked ? "green" : "black",
//           fontWeight: "bold",
//         }}
//         //checkBoxColor="black"
//         checkedCheckBoxColor="green"
//         uncheckedCheckBoxColor="black"
//       />
//       </>
//     </View>
//   );
// }



export default function IncomePage() {
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
    <ScrollView>
      <View style={{ padding: 30 }}>
        {/* Assuming SingleDropdown is a component rendering something */}
        <SingleDropdown />
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
    </ScrollView>
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



