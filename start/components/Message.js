import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Message = () => {
  const notifications = ["Notification 1", "Notification 2", "Notification 3"];

  return (
    <View style={tw`h-110 w-80`}>
      <View>
        <Text style={tw`text-3xl font-bold`}>Notifications:</Text>
      </View>

      {notifications.length === 0 ? (
        <Text style={tw`text-red-700`}>No notifications for now!</Text>
      ) : (
        <View>
          {/* Render a new View for each notification */}
          {notifications.map((notification, index) => (
            <View key={index} style={tw`mt-5 p-2 h-25 min-w-full border border-gray-200 rounded-lg`}>
              <View style={tw`mb-2`}>
                <Text>{notification}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Message;
