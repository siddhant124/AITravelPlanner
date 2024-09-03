import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const HomeScreen = () => {
  return (
    <View>
      <Text style={style.textStyle}>Hello World</Text>
    </View>
  );
};

const style = StyleSheet.create({
  textStyle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
