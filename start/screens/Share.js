import React from 'react';
import { View, Text } from 'react-native';



const Share = () => {
  
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey, I am using Finzen App. It is a great app to manage your finances. Download it now from https://finzen.in/",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // sha
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  onShare()
  return (
    <></>
  );
};

export default Share;
