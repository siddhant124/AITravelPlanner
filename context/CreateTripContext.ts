import {createContext} from 'react';

interface TripContextType {
  tripData: any;
  setTripData: React.Dispatch<React.SetStateAction<any>>;
}

// Update the context initialization to be undefined, not null
export const CreateTripContext = createContext<TripContextType | undefined>(
  undefined,
);
