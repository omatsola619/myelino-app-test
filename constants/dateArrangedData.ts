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

export const formattedDate = () => {
  const date = new Date();

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  }).format(date);
};

export const myGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good Morning';
  } else if (hour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};
