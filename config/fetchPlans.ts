import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosClient } from '@/config/axiosClient';
import { PlanDataType } from '@/types';

const PLANS_KEY = 'cachedPlans';

export const fetchPlans = async (): Promise<PlanDataType> => {
  try {
    // Fetch fresh data from the server
    const response = await axiosClient.get('/plan');
    const plansData = response.data;

    // Retrieve cached data
    const cachedPlans = await AsyncStorage.getItem(PLANS_KEY);

    if (cachedPlans) {
      const parsedCachedPlans = JSON.parse(cachedPlans);

      // Compare cached and fresh data, update only if different
      if (JSON.stringify(parsedCachedPlans) !== JSON.stringify(plansData)) {
        await AsyncStorage.setItem(PLANS_KEY, JSON.stringify(plansData));
      }
    } else {
      // No cached plans, set the fresh data in the cache
      await AsyncStorage.setItem(PLANS_KEY, JSON.stringify(plansData));
    }

    return plansData;
  } catch (error) {
    console.error('Error fetching plans:', error);

    // Fallback to cached data if available
    const cachedPlans = await AsyncStorage.getItem(PLANS_KEY);
    if (cachedPlans) {
      return JSON.parse(cachedPlans);
    }

    throw error;
  }
};
