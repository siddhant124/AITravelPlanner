/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  SafeAreaView,
  Image,
  View,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {CreateTripContext} from '../../../../../context/CreateTripContext';
import {AI_PROMPT} from '../../../../constants/TravelOptions';
import {chatSession} from '../../../../configs/AIModel';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from '../../../../configs/FirebaseConfing';

export default function GenerateTripScreen({navigation}: {navigation: any}) {
  const [_isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;

  const tripContext = useContext(CreateTripContext);

  if (!tripContext) {
    throw new Error('useTripContext must be used within a CreateTripProvider');
  }

  const {tripData} = tripContext;

  const GenerateAITrip = async () => {
    try {
      setIsLoading(true);
      const FINAL_PROMPT = AI_PROMPT.replace(
        '{location}',
        tripData?.locationInfo?.name,
      )
        .replaceAll('{totalDays}', tripData?.tripDuration?.totalNumOfDays)
        .replaceAll(
          '{totalNight}',
          (tripData?.tripDuration?.totalNumOfDays - 1).toString(),
        )
        .replace('{traveler}', tripData?.travellerInfo?.people)
        .replace('{budget}', tripData?.budgetInfo?.title);

      console.log('Final prompt', FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResponse = JSON.parse(result.response.text());
      console.log(tripResponse);

      const documentId = Date.now();

      await setDoc(doc(db, 'UserTrips', documentId.toString()), {
        userEmailId: user?.email ?? '',
        tripRequestData: tripData,
        tripResponseDetails: tripResponse,
        docId: documentId,
      });
      ToastAndroid.show('Trip Generated Successfully', ToastAndroid.LONG);
      navigation.navigate('MyTripScreen');
    } catch (error) {
      console.error('Error generating AI trip:', error);
      ToastAndroid.show(
        'Error While generating Trip...\n Pleaase Generate again',
        ToastAndroid.LONG,
      );
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GenerateAITrip();
  }, []);

  return (
    <SafeAreaView className="pt-14 bg-[#78B3D4] flex-1 px-6">
      <StatusBar backgroundColor={'#78B3D4'} />
      <Text
        className="text-4xl text-black mt-5 text-center"
        style={{
          fontFamily: 'Outfit-Bold',
        }}>
        Please Wait...
      </Text>

      <Text
        className="text-xl text-black mt-5 text-center"
        style={{
          fontFamily: 'Outfit-Medium',
        }}>
        We are working to generate your trip
      </Text>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Progress.Circle
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 23,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          }}
          size={300}
          indeterminateAnimationDuration={1500}
          indeterminate={true}
        />

        <Image
          source={require('./../../../../assets/images/plane-animation.gif')}
          style={{
            width: '80%',
            aspectRatio: 1,
            maxWidth: 300,
          }}
          resizeMode="contain"
        />
        <Text
          className="text-black text-xl text-center"
          style={{
            fontFamily: 'Outfit-Bold',
          }}>
          DO NOT GO BACK
        </Text>
      </View>
    </SafeAreaView>
  );
}
