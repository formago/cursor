import { makeAutoObservable } from 'mobx';
import { fetchRates, Rate, RatesResponse } from './CurrencyService';
import resources from './resources.json';

class CurrencyStore {
  rates: Rate[] = [];
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  public fetchCurrencyData = async () => {
    this.setLoading(true);
    try {
      const todayResponse: RatesResponse[] = await fetchRates();
      const yesterdayResponse: RatesResponse[] = await fetchRates(
        this.getPreviousDate(todayResponse[0].effectiveDate),
      );
      const processedRates: Rate[] = this.processRates(
        todayResponse[0].rates,
        yesterdayResponse[0].rates,
      );
      this.setRates(processedRates);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    } finally {
      this.setLoading(false);
    }
  };

  private processRates = (
    todayRates: Rate[],
    yesterdayRates: Rate[],
  ): Rate[] => {
    return todayRates
      .filter(rate => resources.currencyCodes.includes(rate.code))
      .map(todayRate => {
        const yesterdayRate = yesterdayRates.find(
          yRate => yRate.code === todayRate.code,
        );
        const trend = yesterdayRate ? todayRate.mid - yesterdayRate.mid : null;
        return { ...todayRate, trend };
      });
  };

  private getPreviousDate = (dateString: string): string => {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };

  public setRates = (rates: Rate[]) => {
    this.rates = rates;
  };

  public setLoading = (loading: boolean) => {
    this.loading = loading;
  };
}

export const currencyStore = new CurrencyStore();
