import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Test = () => {
  let user = auth().currentUser;
  return (
    <View>
      <Text>{user.displayName}</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
