export const calculateRating = (rating: number): string => `${(rating / 5) * 100}%`;

export const getHumanDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const dateTime = date.toISOString().split('T')[0];

  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const monthYear = `${month} ${year}`;

  return {
    dateTime,
    monthYear
  };
};


