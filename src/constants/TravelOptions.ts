import {TravelPlans} from '../screens/home/myTrips/model/SelectTravellerDataClass';

export const SelectTravelersList: TravelPlans[] = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole travel exploration',
    icon: '✈️',
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travels in tandem',
    icon: '🥂',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving advanture',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People',
  },
  {
    id: 5,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '🫂',
    people: '6 to 10 People',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay concious of costs',
    icon: '🪙',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep costs at average side',
    icon: '💵',
  },
  {
    id: 3,
    title: 'Luxuary',
    desc: "Don't worry about costs",
    icon: '💸',
  },
];

export const AI_PROMPT =
  'Generate Travel Plan for Location: {location}, for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format';
