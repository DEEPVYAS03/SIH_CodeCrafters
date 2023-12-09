// import React from 'react';
// import { View, SafeAreaView, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import login from '../assets/login.png';
// import tw from 'twrnc';
// const IncomePage = () => {
//     return (
//         <SafeAreaView style={{ flex: 1, justifyContent: 'center', paddingTop: 20 }}>
//             <View style={{ paddingHorizontal: 25 }}>
//                 <View style={{ alignItems: 'center' }}>
//                     <Image style={{ resizeMode: 'contain', width: '100%', height: '50%', marginTop: '10', transform: [{ rotate: '-5deg' }] }} source={require('../assets/login.png')} />
//                 </View>
//                 <Text style={{ fontSize: 28, fontWeight: '500', color: '#333', marginBottom: 30 }}>Income Page</Text>
//                 <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>

//                     <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
//                     <TextInput placeholder='Email ID' style={{ flex: 1, paddingVertical: 0 }} keyboardType="email-address" />
//                 </View>

//                 <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>


//                     <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />
//                     <TextInput placeholder='Password' style={{ flex: 1, paddingVertical: 0 }} secureTextEntry={true} />
//                     <TouchableOpacity onPress={() => { }}>
//                         <Text style={{ color: '#AD40AF', fontWeight: '700' }}>forgot?</Text>
//                     </TouchableOpacity>
//                 </View>


//                 <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>

//                     <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
//                     <TextInput placeholder='Email ID' style={{ flex: 1, paddingVertical: 0 }} keyboardType="email-address" />
//                 </View>
//                 <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>

//                     <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
//                     <TextInput placeholder='Email ID' style={{ flex: 1, paddingVertical: 0 }} keyboardType="email-address" />
//                 </View>
//                 <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>


//                     <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />
//                     <TextInput placeholder='Password' style={{ flex: 1, paddingVertical: 0 }} secureTextEntry={true} />
//                     <TouchableOpacity onPress={() => { }}>
//                         <Text style={{ color: '#AD40AF', fontWeight: '700' }}>forgot?</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#AD40AF', padding: 20, borderRadius: 10, marginBottom: 30, }}>
//                     <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 16, color: '#fff' }}>Register</Text>
//                 </TouchableOpacity>

//                 {/* copypaste */}


//             </View>
//         </SafeAreaView>
//     );
// };

// export default IncomePage;

import React from 'react';
import { View, SafeAreaView, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import login from '../assets/login.png';

const IncomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        
        <View style={{ paddingHorizontal: 25, paddingTop: 20, paddingBottom: 50, alignItems: 'center' }}>
          <Image
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: '50%',
              marginTop: 10,
              marginBottom: 20,
              transform: [{ rotate: '-5deg' }],
            }}
            source={require('../assets/login.png')}
          />
          <Text style={{ fontSize: 28, fontWeight: '500', color: '#333', marginBottom: 20}}>Income Page</Text>

          <View style={{ marginBottom: 20, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8 }}>
              <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
              <TextInput placeholder='Email ID' style={{ flex: 1, paddingVertical: 0 }} keyboardType="email-address" />
            </View>
          </View>
          {/* {copypaste} */}
          

          {/* {copypaste} */}

          <View style={{ marginBottom: 20, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8 }}>
              <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />
              <TextInput placeholder='Password' style={{ flex: 1, paddingVertical: 0 }} secureTextEntry={true} />
              <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: '#AD40AF', fontWeight: '700' }}>forgot?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional form fields */}
          <View style={{ marginBottom: 20, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8 }}>
              <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
              <TextInput placeholder='Email ID' style={{ flex: 1, paddingVertical: 0 }} keyboardType="email-address" />
            </View>
          </View>

          <View style={{ marginBottom: 20, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8 }}>
              <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
              <TextInput placeholder='Email ID' style={{ flex: 1, paddingVertical: 0 }} keyboardType="email-address" />
            </View>
          </View>

          <View style={{ marginBottom: 20, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8 }}>
              <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />
              <TextInput placeholder='Password' style={{ flex: 1, paddingVertical: 0 }} secureTextEntry={true} />
              <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: '#AD40AF', fontWeight: '700' }}>forgot?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#AD40AF', padding: 20, borderRadius: 10, marginBottom: 30, width: '100%' }}>
            <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 16, color: '#fff' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IncomePage;
