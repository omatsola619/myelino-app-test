import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlanDataType, PlansContextType } from '@/types';
import { fetchPlans } from '@/config/fetchPlans';

export const PlansContext = createContext<PlansContextType | undefined>(
  undefined,
);

export const PlansProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [plans, setPlans] = useState<PlanDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch plans and set them in context
  const refreshPlans = async () => {
    setLoading(true);
    try {
      const data = await fetchPlans();
      setPlans(data);
    } catch (error) {
      console.error('Failed to refresh plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPlans();
  }, []);

  return (
    <PlansContext.Provider value={{ plans, loading, setPlans, refreshPlans }}>
      {children}
    </PlansContext.Provider>
  );
};
