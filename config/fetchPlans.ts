import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosClient } from '@/config/axiosClient';
import { PlanDataType } from '@/types';

const PLANS_KEY = 'cachedPlans';

export const fetchPlans = async (): Promise<PlanDataType> => {
  try {
    // check for any cached plans
    const cachedPlans = await AsyncStorage.getItem(PLANS_KEY);
    if (cachedPlans) {
      return JSON.parse(cachedPlans);
    }

    // if there are no plans cached already
    const response = await axiosClient.get('/plan');

    // cache new plans when fetched
    const plansData = response.data;
    await AsyncStorage.setItem(PLANS_KEY, JSON.stringify(plansData));

    return plansData;
  } catch (error) {
    console.error('Error fetching plans', error);
    throw error;
  }
};
