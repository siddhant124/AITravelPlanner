/* eslint-disable react-native/no-inline-styles */
import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PlusCircleIcon} from 'react-native-heroicons/solid';
import {Colors} from '../../../../constants/Colors';
import StartNewTripCard from '../component/StartNewTripCard';
import {auth, db} from '../../../../configs/FirebaseConfing';
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import UserTripsList from '../component/UserTripsList';
import {onAuthStateChanged} from 'firebase/auth';

export default function MyTrip({navigation}: {navigation: any}) {
  const [userTrips, setUserTrips] = useState<DocumentData[]>([]);
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  const getMyTripsData = async (email: string | null) => {
    if (!email) {return;}
    setIsLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, 'UserTrips'),
      where('userEmailId', '==', email),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data());
      setUserTrips(prev => [...prev, doc.data()]);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser?.email) {
        getMyTripsData(currentUser.email);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center bg-white">
        <ActivityIndicator size={'large'} color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        paddingTop: 24,
        paddingHorizontal: 24,
        flex: 1,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Outfit-Bold',
            fontSize: 30,
            color: Colors.PRIMARY,
          }}>
          {'My Trip' + user?.email}
        </Text>
        <PlusCircleIcon
          onPress={() => navigation.navigate('SearchPlacesScreen')}
          color={Colors.PRIMARY}
          size={30}
        />
      </View>
      {userTrips.length === 0 ? (
        <StartNewTripCard navigation={navigation} />
      ) : (
        <UserTripsList userTrips={userTrips.reverse()} />
      )}
    </View>
  );
}
