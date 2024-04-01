import React, { useState } from 'react';
import { View, TouchableOpacity , Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import {WDCS} from '../constants/newConstants'

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [latitude, setLatitude] = useState(item.location.coordinates[1]);
  const [longitude, setLongitude] = useState(item.location.coordinates[0]);

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  // console.log(WDCS[0].majorActivities[0])

  return (
    <>
      <View style={tw`relative`}>
        <View style={tw`w-full h-72 border drop-shadow-md rounded-3xl overflow-hidden`}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: markerCoordinate.latitude,
              longitude: markerCoordinate.longitude,
              latitudeDelta: 0.02, // Adjust the delta values for zoom
              longitudeDelta: 0.02,
            }}
            zoomEnabled={false} // Disable zoom
            onPanDrag={false}
          >
            <Marker
              coordinate={markerCoordinate}
              title="Marker Title"
              description="Marker Description"
            />
          </MapView>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow`}>
          <Icon.ArrowLeft strokeWidth={3} stroke='green' />
        </TouchableOpacity>
      </View>

        <View>
          <Text style={tw`m-4 font-bold text-2xl`}>Major Activities Included are:</Text>
          <View  style={tw`ml-4 font-bold`}>
             <Text style={tw`text-lg font-bold`}>
            
          {WDCS[0].majorActivities[0]}
          </Text>
          <Text style={tw`text-lg font-bold`}>
          {WDCS[0].majorActivities[1]}
        
          </Text>

          </View>

          <View>
            <Text style={tw`mt-5 ml-5 font-bold text-3xl`}>
            {WDCS[0].majorActivities[0]}:
            </Text>
            <Text style={tw`ml-5 mr-2`}>
            This project focuses on empowering local farmers through sustainable animal husbandry. The component boosts this activity by providing training and resources for livestock rearing, including improved breeds and community-managed care centers.
            </Text>
            <Text style={tw`mt-5 ml-5 font-bold text-3xl`}>
            {WDCS[0].majorActivities[1]}:
            </Text>
            <Text style={tw`ml-5 mr-2`}>
            This project focuses on empowering local farmers through sustainable animal husbandry. The component boosts this activity by providing training and resources for livestock rearing, including improved breeds and community-managed care centers.
            </Text>
          </View>
        </View>
      {/* Other components or views can be added here */}
    </>
  );
};

export default MapScreen;
