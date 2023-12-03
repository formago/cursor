import axios from 'axios';

interface Rate {
  currency: string;
  code: string;
  mid: number;
}

interface RatesResponse {
  rates: Rate[];
  effectiveDate: string;
}

const getPreviousDate = (dateString: string): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
};

export const fetchRates = async (date?: string): Promise<RatesResponse> => {
  const url = date
    ? `https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`
    : `https://api.nbp.pl/api/exchangerates/tables/A/?format=json`;

  try {
    const response = await axios.get(url);
    return {
      rates: response.data[0].rates,
      effectiveDate: response.data[0].effectiveDate,
    };
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw new Error('Failed to fetch rates');
  }
};

export const fetchTodayAndYesterdayRates = async (): Promise<{
  todayRates: Rate[];
  yesterdayRates: Rate[];
}> => {
  const todayResponse = await fetchRates();
  const yesterdayResponse = await fetchRates(
    getPreviousDate(todayResponse.effectiveDate),
  );

  return {
    todayRates: todayResponse.rates,
    yesterdayRates: yesterdayResponse.rates,
  };
};
