import axios, { AxiosError } from 'axios';
import { Rate } from './Rate'; // Путь к файлу может отличаться в зависимости от вашей структуры проекта

export interface RatesResponse {
  rates: Rate[];
  effectiveDate: string;
}

const MAX_RECURSIVE_CALLS = 7;

export async function fetchRates(
  date?: string,
  attempts: number = 0,
): Promise<RatesResponse> {
  try {
    const url = date
      ? `https://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`
      : 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';
    const response = await axios.get<RatesResponse[]>(url);
    return response.data[0];
  } catch (error) {
    const axiosError = error as AxiosError;
    if (
      axiosError.response &&
      axiosError.response.status === 404 &&
      date &&
      attempts < MAX_RECURSIVE_CALLS
    ) {
      const previousDate = getPreviousDate(date);
      return fetchRates(previousDate, attempts + 1); // Рекурсивный вызов с новой датой и увеличением счетчика
    } else {
      throw axiosError;
    }
  }
}

function getPreviousDate(dateString: string): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}
