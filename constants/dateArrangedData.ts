import { MonthData, MonthSectionType } from '@/types';

export const dateArrangedData = (monthData: MonthData) => {
  const result = [];
  for (const month in monthData) {
    const dates = monthData[month];
    const monthSection: MonthSectionType = { month, data: [] };

    for (const date in dates) {
      const planTypes = dates[date];
      const day = date.split('/')[1];
      for (const planType in planTypes) {
        const plans = planTypes[planType];
        plans.forEach((plan, index) => {
          monthSection.data.push({
            id: `${month}-${date}-${planType}-${index}`,
            month,
            day,
            description: plan.place!.mainTag,
          });
        });
      }
    }

    if (monthSection.data.length > 0) {
      result.push(monthSection);
    }
  }
  return result;
};
