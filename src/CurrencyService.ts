import axios from 'axios';

export const fetchRates = async (date?: string) => {
  const url = date
    ? `https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`
    : `https://api.nbp.pl/api/exchangerates/tables/A/?format=json`;

  const response = await axios.get(url);
  return response.data;
};
