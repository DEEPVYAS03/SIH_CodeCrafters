import React, { useState,  createContext, useContext } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



const hardcodedData = {
  states: [
    { label: 'TAMIL NADU', value: 'TAMILNADU' },
    // Add more states as needed
  ],
  districts: {
    TAMILNADU: [
      { label: 'DHARMAPURI', value: 'DHARMAPURI' },
      { label: 'DINDIGUL', value: 'DINDIGUL' },
      { label: 'KRISHNAGIRI', value: 'KRISHNAGIRI' },
      { label: 'PERAMBALUR', value: 'PERAMBALUR' },
      { label: 'RAMANATHAPURAM', value: 'RAMANATHAPURAM' },
      { label: 'TUTICORIN', value: 'TUTICORIN' },
      { label: 'VIRUDHUNAGAR', value: 'VIRUDHUNAGAR' },

    ]
  },
  villages: {
    DHARMAPURI:[
      {label: "Annasagaram", value: "Annasagaram"},
      {label: "Arakasanahalli", value: "Arakasanahalli"},
      {label: "Bathalahalli", value: "Bathalahalli"},
      {label: "Booganahalli", value: "Booganahalli"},
      {label: "Budanahalli", value: "Budanahalli"},
      {label: "Chinnampalli", value: "Chinnampalli"},
      {label: "Echanahalli", value: "Echanahalli"},
      {label: "Guthalahalli", value: "Guthalahalli"},
      {label: "Kadamadai", value: "Kadamadai"},
      {label: "Kalappambadi", value: "Kalappambadi"},
      {label: "Kondagarahalli", value: "Kondagarahalli"},
      {label: "Kukkalmalai", value: "Kukkalmalai"},
      {label: "Laligam", value: "Laligam"},
      {label: "Mittareddihalli", value: "Mittareddihalli"},
      {label: "Naickanahalli", value: "Naickanahalli"},
      {label: "Nallampalli", value: "Nallampalli"},
      {label: "Nekkundhi", value: "Nekkundhi"},
      {label: "P. Gollahalli", value: "P. Gollahalli"},
      {label: "Pagalahalli", value: "Pagalahalli"},
      {label: "Pudupatti", value: "Pudupatti"},
      {label: "Pulikkarai", value: "Pulikkarai"},
      {label: "Sekkodi", value: "Sekkodi"},
      {label: "Selliyampatti", value: "Selliyampatti"},
      {label: "Sivadi", value: "Sivadi"},
      {label: "Ungaranhalli", value: "Ungaranhalli"},
      {label: "Vathalamalai", value: "Vathalamalai"},
      {label: "Vellolai", value: "Vellolai"}
    ]
    ,
    DINDIGUL:[
      {label: "Alambadi", value: "Alambadi"},
      {label: "Ammapatti", value: "Ammapatti"},
      {label: "Appayampatti", value: "Appayampatti"},
      {label: "Chinnaluppai", value: "Chinnaluppai"},
      {label: "Chittur", value: "Chittur"},
      {label: "Kambiliampatti", value: "Kambiliampatti"},
      {label: "Kanapadi", value: "Kanapadi"},
      {label: "Karikali", value: "Karikali"},
      {label: "Kariyampatti", value: "Kariyampatti"},
      {label: "Kollapatti", value: "Kollapatti"},
      {label: "Komberipatti", value: "Komberipatti"},
      {label: "Koombur", value: "Koombur"},
      {label: "Koothampoodi", value: "Koothampoodi"},
      {label: "Mallapuram", value: "Mallapuram"},
      {label: "Malvarpatti", value: "Malvarpatti"},
      {label: "Marambadi", value: "Marambadi"},
      {label: "Morepatti", value: "Morepatti"},
      {label: "Nagayakottai", value: "Nagayakottai"},
      {label: "Nallamanarkottai", value: "Nallamanarkottai"},
      {label: "Padiyur", value: "Padiyur"},
      {label: "Paganatham", value: "Paganatham"},
      {label: "Perumbulli", value: "Perumbulli"},
      {label: "Pilathu", value: "Pilathu"},
      {label: "Pudukottai ", value: "Pudukottai "},
      {label: "Puthur", value: "Puthur"},
      {label: "Ramanathapuram", value: "Ramanathapuram"},
      {label: "Singarakottai", value: "Singarakottai"},
      {label: "Sriramapuram", value: "Sriramapuram"},
      {label: "Ulliyakottai", value: "Ulliyakottai"},
      {label: "Vadugambadi", value: "Vadugambadi"},
      {label: "Vanganmanuthu", value: "Vanganmanuthu"},
      {label: "Velayudampalayam", value: "Velayudampalayam"},
      {label: "Vellampatti", value: "Vellampatti"},
      {label: "Vellodu ", value: "Vellodu "},
      {label: "Velvankottai", value: "Velvankottai"}
    ],

    KRISHNAGIRI:[
      {label: "Batlapalli", value: "Batlapalli"},
      {label: "Bommepalli", value: "Bommepalli"},
      {label: "Ikondamkothapalli.", value: "Ikondamkothapalli."},
      {label: "Jagadevipalayam", value: "Jagadevipalayam"},
      {label: "Jowlagiri", value: "Jowlagiri"},
      {label: "Kadappasandampatti", value: "Kadappasandampatti"},
      {label: "Kannandahalli", value: "Kannandahalli"},
      {label: "Kathiripalli", value: "Kathiripalli"},
      {label: "Kondappanayakempalli", value: "Kondappanayakempalli"},
      {label: "Kottaiyur", value: "Kottaiyur"},
      {label: "Kundarapalli", value: "Kundarapalli"},
      {label: "Madakkal", value: "Madakkal"},
      {label: "Madepalli", value: "Madepalli"},
      {label: "Mahadevagollahalli", value: "Mahadevagollahalli"},
      {label: "Majethgollahalli", value: "Majethgollahalli"},
      {label: "Naduvanapalli", value: "Naduvanapalli"},
      {label: "Nagampatti", value: "Nagampatti"},
      {label: "Pannapalli", value: "Pannapalli"},
      {label: "Pasinayanapalli", value: "Pasinayanapalli"},
      {label: "Puligunta", value: "Puligunta"},
      {label: "Singiripalli", value: "Singiripalli"},
      {label: "Thaggatti", value: "Thaggatti"},
      {label: "Urigam", value: "Urigam"},
      {label: "Veppalampatti", value: "Veppalampatti"},
      {label: "Verupasandiram", value: "Verupasandiram"}
    ]
    
    ,
    PERAMBALUR:[
  {label: "Aduthurai", value: "Aduthurai"},
  {label: "Agaram", value: "Agaram"},
  {label: "Agaram Sigoor", value: "Agaram Sigoor"},
  {label: "Alangali", value: "Alangali"},
  {label: "Aranarai (North)", value: "Aranarai (North)"},
  {label: "Asur", value: "Asur"},
  {label: "Athiyur ", value: "Athiyur "},
  {label: "Elambalur", value: "Elambalur"},
  {label: "Eraiyur", value: "Eraiyur"},
  {label: "Esanai", value: "Esanai"},
  {label: "Keelakkarai", value: "Keelakkarai"},
  {label: "Keelaperambalur", value: "Keelaperambalur"},
  {label: "Keelapuliyur", value: "Keelapuliyur"},
  {label: "Kilamathur ", value: "Kilamathur "},
  {label: "Mettupalayam", value: "Mettupalayam"},
  {label: "Nannai ", value: "Nannai "},
  {label: "Ogalur (East)", value: "Ogalur (East)"},
  {label: "Ogalur (West)", value: "Ogalur (West)"},
  {label: "Olaippady (East)", value: "Olaippady (East)"},
  {label: "Olaippady (West)", value: "Olaippady (West)"},
  {label: "Pasumbalur ", value: "Pasumbalur "},
  {label: "Pennakonam (North)", value: "Pennakonam (North)"},
  {label: "Pennakonam (South)", value: "Pennakonam (South)"},
  {label: "Peraiyur", value: "Peraiyur"},
  {label: "Perali (North)", value: "Perali (North)"},
  {label: "Perambalur", value: "Perambalur"},
  {label: "Pimbalur", value: "Pimbalur"},
  {label: "Sengunam", value: "Sengunam"},
  {label: "Sithali (East)", value: "Sithali (East)"},
  {label: "Sithali West", value: "Sithali West"},
  {label: "Thevaiyur", value: "Thevaiyur"},
  {label: "Thiruvalandurai", value: "Thiruvalandurai"},
  {label: "Thungapuram ", value: "Thungapuram "},
  {label: "V.Kalathur", value: "V.Kalathur"},
  {label: "Vasistapuram", value: "Vasistapuram"}
]
,
    RAMANATHAPURAM: [
      {label: "A.Tharaikkudi", value: "A.Tharaikkudi"},
      {label: "Annaviyendal Nedunkulam", value: "Annaviyendal Nedunkulam"},
      {label: "K.Nedungulam", value: "K.Nedungulam"},
      {label: "Kadamangalam", value: "Kadamangalam"},
      {label: "Kakkudi", value: "Kakkudi"},
      {label: "Kaliyanagari", value: "Kaliyanagari"},
      {label: "Koodakkulam", value: "Koodakkulam"},
      {label: "Mandalamanickam", value: "Mandalamanickam"},
      {label: "Maraikkulam", value: "Maraikkulam"},
      {label: "Marungur ", value: "Marungur "},
      {label: "Mudalnadu", value: "Mudalnadu"},
      {label: "Nagarathakurichi", value: "Nagarathakurichi"},
      {label: "Orur", value: "Orur"},
      {label: "P.Muthuramalingapuram", value: "P.Muthuramalingapuram"},
      {label: "Paganur", value: "Paganur"},
      {label: "Pakkuvetti", value: "Pakkuvetti"},
      {label: "Panichagudi", value: "Panichagudi"},
      {label: "Perunali", value: "Perunali"},
      {label: "Pullur", value: "Pullur"},
      {label: "Sirugambaiyur", value: "Sirugambaiyur"},
      {label: "Sundarapandianpattinam ", value: "Sundarapandianpattinam "},
      {label: "T.Karisalkulam", value: "T.Karisalkulam"},
      {label: "T.Valasubramaniapuram", value: "T.Valasubramaniapuram"},
      {label: "Thavasikurichi", value: "Thavasikurichi"},
      {label: "Thimmanathapuram", value: "Thimmanathapuram"},
      {label: "Tirumalugandankottai", value: "Tirumalugandankottai"},
      {label: "Vallandai", value: "Vallandai"}
    ]
    ,
    TUTICORIN: [
      {label: "Arungulam", value: "Arungulam"},
      {label: "Asoor", value: "Asoor"},
      {label: "Ayan Vadamalaipuram", value: "Ayan Vadamalaipuram"},
      {label: "Ayansengalpadai", value: "Ayansengalpadai"},
      {label: "Chettikurichi", value: "Chettikurichi"},
      {label: "Chidambarampatti", value: "Chidambarampatti"},
      {label: "Inam Arunachalapuram", value: "Inam Arunachalapuram"},
      {label: "Jagaveerapandiapuram", value: "Jagaveerapandiapuram"},
      {label: "K.Chidambarapuram", value: "K.Chidambarapuram"},
      {label: "K.Dalavaipuram", value: "K.Dalavaipuram"},
      {label: "Kalampatti", value: "Kalampatti"},
      {label: "Kalangaraipatti", value: "Kalangaraipatti"},
      {label: "Kallurani", value: "Kallurani"},
      {label: "Karuppur", value: "Karuppur"},
      {label: "Kattarankulam", value: "Kattarankulam"},
      {label: "Keelakarandai", value: "Keelakarandai"},
      {label: "Kila Mudiman", value: "Kila Mudiman"},
      {label: "Kulathur ", value: "Kulathur "},
      {label: "Kulathur (East)", value: "Kulathur (East)"},
      {label: "Kulathur (North)", value: "Kulathur (North)"},
      {label: "Kulathur (South)", value: "Kulathur (South)"},
      {label: "Kumara Ettayapuram", value: "Kumara Ettayapuram"},
      {label: "Marthandampatti", value: "Marthandampatti"},
      {label: "Masarpatti", value: "Masarpatti"},
      {label: "Mela Arasadi", value: "Mela Arasadi"},
      {label: "Mela Maruthur", value: "Mela Maruthur"},
      {label: "Melakarandai", value: "Melakarandai"},
      {label: "Melapandiyapuram", value: "Melapandiyapuram"},
      {label: "Mudukkumeendanpatti", value: "Mudukkumeendanpatti"},
      {label: "Mullur Muthukumarapuram", value: "Mullur Muthukumarapuram"},
      {label: "Muthulapuram", value: "Muthulapuram"},
      {label: "Namasivayapuram", value: "Namasivayapuram"},
      {label: "Nedungulam", value: "Nedungulam"},
      {label: "Ottappidaram", value: "Ottappidaram"},
      {label: "Pallakulam", value: "Pallakulam"},
      {label: "Panchalamkurich", value: "Panchalamkurich"},
      {label: "Panneerkulam", value: "Panneerkulam"},
      {label: "Poosanoor", value: "Poosanoor"},
      {label: "Pudur pandiyapuram", value: "Pudur pandiyapuram"},
      {label: "Puliangulam", value: "Puliangulam"},
      {label: "S.Kumarapuram", value: "S.Kumarapuram"},
      {label: "Saravanapuram", value: "Saravanapuram"},
      {label: "Sevalapperi", value: "Sevalapperi"},
      {label: "Sillanatham", value: "Sillanatham"},
      {label: "Sindalakottai", value: "Sindalakottai"},
      {label: "Swaminatham", value: "Swaminatham"},
      {label: "T.Subbiahpuram", value: "T.Subbiahpuram"},
      {label: "Thappathi", value: "Thappathi"},
      {label: "Therkuveerapandiyapuram", value: "Therkuveerapandiyapuram"},
      {label: "Thirumangalakuruchi", value: "Thirumangalakuruchi"},
      {label: "Tholmalaipatti", value: "Tholmalaipatti"},
      {label: "Vadakku Ilandaikulam", value: "Vadakku Ilandaikulam"},
      {label: "Vaippar - I", value: "Vaippar - I"},
      {label: "Vaippar - II", value: "Vaippar - II"},
      {label: "Valasamuthram", value: "Valasamuthram"},
      {label: "Vanaramutti", value: "Vanaramutti"},
      {label: "Vedapatti ", value: "Vedapatti "},
      {label: "Veerapandiapuram", value: "Veerapandiapuram"},
      {label: "Vellalankottai", value: "Vellalankottai"},
      {label: "Vellaram", value: "Vellaram"},
      {label: "Veppalodai", value: "Veppalodai"}
    ]
    ,
    VIRUDHUNAGAR: [
      {label: "Aladipatti", value: "Aladipatti"},
      {label: "Chettikulam", value: "Chettikulam"},
      {label: "Eluvani", value: "Eluvani"},
      {label: "Erasinnampatti", value: "Erasinnampatti"},
      {label: "Erumaikkulam", value: "Erumaikkulam"},
      {label: "Kalayarkarisalkulam", value: "Kalayarkarisalkulam"},
      {label: "Kallakkari", value: "Kallakkari"},
      {label: "Kallattur", value: "Kallattur"},
      {label: "Kallorani", value: "Kallorani"},
      {label: "Kallumadaipulangulam", value: "Kallumadaipulangulam"},
      {label: "Kallumadam", value: "Kallumadam"},
      {label: "Kalyanasundarapuram", value: "Kalyanasundarapuram"},
      {label: "Karungulamnedungulam", value: "Karungulamnedungulam"},
      {label: "Karuppukkattiyendal", value: "Karuppukkattiyendal"},
      {label: "Keelkudi", value: "Keelkudi"},
      {label: "Konganakurichi", value: "Konganakurichi"},
      {label: "Kulasekaranallur", value: "Kulasekaranallur"},
      {label: "Kullampatti", value: "Kullampatti"},
      {label: "Kundukkulam", value: "Kundukkulam"},
      {label: "Kurunaikulam", value: "Kurunaikulam"},
      {label: "M.Pudukkulam", value: "M.Pudukkulam"},
      {label: "Mangulam", value: "Mangulam"},
      {label: "Melaiyur", value: "Melaiyur"},
      {label: "Melakandamangalam", value: "Melakandamangalam"},
      {label: "Muthuramalingapuram", value: "Muthuramalingapuram"},
      {label: "Narthampatti", value: "Narthampatti"},
      {label: "Paralachi", value: "Paralachi"},
      {label: "Parattanatham", value: "Parattanatham"},
      {label: "Pillaiyarkulam", value: "Pillaiyarkulam"},
      {label: "Poolangal", value: "Poolangal"},
      {label: "Poombidagai", value: "Poombidagai"},
      {label: "Pulavaikkarai", value: "Pulavaikkarai"},
      {label: "Pullanaickenpatti", value: "Pullanaickenpatti"},
      {label: "Purasaloor", value: "Purasaloor"},
      {label: "Rajagopalapuram", value: "Rajagopalapuram"},
      {label: "Savaspuram", value: "Savaspuram"},
      {label: "Sengulam", value: "Sengulam"},
      {label: "Sundakottai", value: "Sundakottai"},
      {label: "Thimmapuram", value: "Thimmapuram"},
      {label: "Thoppalakarai", value: "Thoppalakarai"},
      {label: "Thulukkanedungulam", value: "Thulukkanedungulam"},
      {label: "Tiruvidanallur", value: "Tiruvidanallur"},
      {label: "Undurnikidakulam", value: "Undurnikidakulam"},
      {label: "V.Karisalkulam", value: "V.Karisalkulam"}
    ]    
  },
};

const Signdropdown = ({ onSelectState, onSelectDistrict, onSelectVillage }) => {
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [village, setVillage] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [districtName, setDistrictName] = useState(null);
  const [villageName, setVillageName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleDistrict = (stateValue) => {
    onSelectState(stateValue);
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
    onSelectDistrict(districtValue);
  };

  const handleVillageSelection = (villageValue) => {
    setVillage(villageValue);
    setVillageName(hardcodedData.villages[district][villageValue]?.label || null);
    onSelectVillage(villageValue);
    
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
              name="map"
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
              name="compass"
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
              name="map-pin"
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