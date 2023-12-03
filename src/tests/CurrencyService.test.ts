import {fetchRates} from '../CurrencyService';

describe('fetchRates', () => {
  it('fetches rates successfully from an API', async () => {
    const data = await fetchRates();
    expect(data).toBeDefined();
    expect(data[0].rates).toBeInstanceOf(Array);
  });

  it('fetches rates for a specific date when provided', async () => {
    const data = await fetchRates('2021-01-01');
    expect(data).toBeDefined();
    expect(data[0].effectiveDate).toEqual('2021-01-01');
  });
});
