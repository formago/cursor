import { fetchRates } from '../services/CurrencyService';

describe('fetchRates Integration Tests', () => {
  it('fetches current rates successfully from the API', async () => {
    const data = await fetchRates();
    expect(data.rates).toBeInstanceOf(Array);
    expect(data.rates.length).toBeGreaterThan(0);
    expect(data).toHaveProperty('effectiveDate');
  });

  it('fetches rates for a specific date successfully from the API', async () => {
    const specificDate = '2023-01-01'; // Убедитесь, что эта дата доступна на вашем сервере
    const data = await fetchRates(specificDate);
    expect(data.rates).toBeInstanceOf(Array);
    expect(data.rates.length).toBeGreaterThan(0);
    expect(data.effectiveDate).toEqual(specificDate);
  });

  it('handles 404 errors by fetching rates from the previous available date', async () => {
    const unavailableDate = '2100-01-01'; // Дата, которая заведомо не имеет данных
    const data = await fetchRates(unavailableDate);
    expect(data.rates).toBeInstanceOf(Array);
    expect(data.rates.length).toBeGreaterThan(0);
  });

  // Дополнительные тесты для проверки других сценариев...
});
