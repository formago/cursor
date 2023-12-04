import { Rate } from './models/Rate'; // Путь к файлу может отличаться в зависимости от вашей структуры проекта
import { styles } from './styles/styles';
import resources from './resources/resources.json';

/**
 * Modifies the currency name based on the code.
 * @param code - Currency code (e.g., 'USD', 'EUR').
 * @param name - Original currency name.
 * @returns Modified currency name.
 */
export const getModifiedName = (code: string, name: string): string => {
  switch (code) {
    case 'USD':
      return 'Dollar';
    // Добавьте дополнительные случаи для других кодов валют, если необходимо.
    default:
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
};
/**
 * Formats the trend value for display, handling edge cases for zero values.
 * @param trend - The trend value.
 * @returns Formatted trend value.
 */
export const getTrendValue = (trend: number | null) => {
  // Если тренд равен null или его округленное значение равно '0.00',
  // вернем символ тире, чтобы указать на отсутствие тренда.
  if (
    trend === null ||
    parseFloat(trend.toFixed(resources.decimalRounding)) === 0
  ) {
    return '—';
  }
  // Используем условие для определения, следует ли добавлять плюс к положительному тренду.
  return trend > 0
    ? `+${trend.toFixed(resources.decimalRounding)}`
    : trend.toFixed(resources.decimalRounding);
};

/**
 * Determines the trend style based on the trend value, handling edge cases for zero values.
 * @param trend - The trend value.
 * @returns Appropriate style for the trend.
 */
export const getTrendStyle = (trend: number | null) => {
  // Если тренд равен null или его округленное значение равно '0.00',
  // используем стиль для имени валюты, так как это не является ни положительным, ни отрицательным трендом.
  if (
    trend === null ||
    parseFloat(trend.toFixed(resources.decimalRounding)) === 0
  ) {
    return styles.currencyName;
  }
  return trend > 0 ? styles.positiveTrend : styles.negativeTrend;
};
