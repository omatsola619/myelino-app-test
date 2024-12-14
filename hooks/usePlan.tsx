import { useContext } from 'react';
import { PlansContextType } from '@/types';
import { PlansContext } from '@/context/PlansContext';

export const usePlans = (): PlansContextType => {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
};
