import { ImageSourcePropType } from 'react-native';

export interface EventBannerProps {
  number: string;
  title: string;
  monthView?: boolean;
}

export interface PlanDataType {
  allplans: Plan[];
  quickPlans: QuickPlan[];
  monthData: MonthData;
}

export interface Plan {
  _id: string;
  date: string;
  isMyelin: boolean;
  myelin?: Myelin | null;
  originalPost: string;
  place?: Place | null;
  plan: string;
  slug: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Myelin {
  _id: string;
  amountPaid: number;
  currency: string;
  description: string;
  file: MediaFile;
  mainTag: string;
  people: number;
  placeName: PlaceName;
  subTags: string[];
  likes: any[]; //to be replaced
  comments: any[]; // to be replaced
  views: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface MediaFile {
  path: string;
  url: string;
  _id: string;
}

export interface PlaceName {
  address: string;
  title: string;
  _id: string;
}

export interface Place {
  _id: string;
  placeName: PlaceName;
  description: string;
  mainTag: string;
  subTags: string[];
  people: number;
  amountPaid: number;
  currency: string;
  photos: MediaFile[];
  __v: number;
}

export interface User {
  _id: string;
  email: string;
  avatarUrl: string;
  biography: string;
  fullName: string;
  username: string;
}

export interface QuickPlan extends Plan {}

export interface MonthData {
  [month: string]: {
    [date: string]: {
      [planType: string]: Plan[];
    };
  };
}

interface MonthDataPlan {
  id: string;
  month: string;
  day: string;
  description: string;
}

export interface MonthSectionType {
  month: string;
  data: MonthDataPlan[];
}

export interface DaysLimitProps {
  title: string;
  people: number;
  amount: number;
  image: ImageSourcePropType | undefined;
}
