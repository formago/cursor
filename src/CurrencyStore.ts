import { makeAutoObservable } from 'mobx';
import { fetchRates } from './CurrencyService';
import resources from './resources.json';
import { Rate } from './Rate';

class CurrencyStore {
  rates: Rate[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setError = (message: string | null) => {
    this.error = message;
  };

  public fetchCurrencyData = async () => {
    this.setLoading(true);
    this.setError(null);
    try {
      const todayResponse = await fetchRates();
      const yesterdayResponse = await fetchRates(
        this.getPreviousDate(todayResponse.effectiveDate),
      );
      const processedRates = this.processRates(
        todayResponse.rates,
        yesterdayResponse.rates,
      );
      this.setRates(processedRates);
    } catch (error) {
      this.setError(resources.errorScreenMessage);
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
