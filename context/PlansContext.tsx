import React, { createContext, useState, useEffect } from 'react';
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
  const [error, setError] = useState<Error | null>(null);

  // Fetch plans and set them in context
  const refreshPlans = async () => {
    setLoading(true);
    try {
      const data = await fetchPlans();
      setPlans(data);
    } catch (error) {
      console.error('Failed to refresh plans:', error);
      // @ts-ignore
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPlans();
  }, []);

  return (
    <PlansContext.Provider
      // @ts-ignore
      value={{ plans, loading, setPlans, refreshPlans, error }}
    >
      {children}
    </PlansContext.Provider>
  );
};
