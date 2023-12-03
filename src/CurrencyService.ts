import axios from 'axios';

export interface Rate {
  currency: string;
  code: string;
  mid: number;
}

export interface RatesResponse {
  rates: Rate[];
  effectiveDate: string;
}

export const fetchRates = async (date?: string): Promise<RatesResponse[]> => {
  const url = date
    ? `https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`
    : 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';

  const response = await axios.get<RatesResponse[]>(url);
  return response.data;
};
