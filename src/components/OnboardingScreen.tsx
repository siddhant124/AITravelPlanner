import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';

export default function OnboardingScreen({navigation}: {navigation: any}) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle={'dark-content'}
      />
      <View style={style.viewStyle}>
        <Image
          style={style.imageStyle}
          source={require('./../assets/images/login_image.png')}
        />

        <View style={style.container}>
          <Text style={style.headerTextStyle}>AI Travel Planner</Text>
          <Text style={style.headerDescTextStyle}>
            Discover your next adventure effortlessly. Personalized itineraries
            at your fingertips. Travel smarter with AI-driven insights.
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('SignInScreen')}
            style={style.buttonStyle}>
            <Text style={style.buttonTextStyle}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    flex: 1,
  },

  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
  },
  imageStyle: {
    height: 450,
  },

  headerTextStyle: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 30,
  },
  headerDescTextStyle: {
    fontSize: 17,
    fontFamily: 'Outfit-Regular',
    color: Colors.Gray,
    textAlign: 'center',
    marginTop: 20,
  },

  buttonStyle: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: '25%',
  },

  buttonTextStyle: {
    color: Colors.WHITE,
    fontFamily: 'Outfit-Regular',
    fontSize: 17,
  },
});
