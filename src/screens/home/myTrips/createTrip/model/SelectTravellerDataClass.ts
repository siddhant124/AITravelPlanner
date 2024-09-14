export type SelectTravelProps = {
  options: TravelPlans[];
};

export type TravelPlans = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  people: string;
};
