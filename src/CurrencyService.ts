import axios from 'axios';

interface Rate {
  currency: string;
  code: string;
  mid: number;
}

export const fetchRates = async (date: string): Promise<Rate[]> => {
  try {
    const response = await axios.get(
      `https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`,
    );
    return response.data[0].rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    return [];
  }
};

export const fetchTodayRates = (): Promise<Rate[]> => fetchRates('today');

export const fetchYesterdayRates = (): Promise<Rate[]> => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateString = yesterday.toISOString().split('T')[0];
  return fetchRates(dateString);
};
