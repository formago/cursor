import {makeAutoObservable} from 'mobx';
import {fetchRates} from './CurrencyService';
import resources from './resources.json';

interface Rate {
  currency: string;
  code: string;
  mid: number;
  trend?: number | null;
}

class CurrencyStore {
  rates: Rate[] = [];
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCurrencyData() {
    this.setLoading(true);
    try {
      const todayResponse = await fetchRates();
      const yesterdayResponse = await fetchRates(
        this.getPreviousDate(todayResponse[0].effectiveDate),
      );

      const dataWithTrend = todayResponse[0].rates
        .filter(rate => resources.currencyCodes.includes(rate.code))
        .map(todayRate => {
          const yesterdayRate = yesterdayResponse[0].rates.find(
            yRate => yRate.code === todayRate.code,
          );
          const trend = yesterdayRate
            ? todayRate.mid - yesterdayRate.mid
            : null;
          return {...todayRate, trend};
        });

      this.setRates(dataWithTrend);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    } finally {
      this.setLoading(false);
    }
  }

  setRates(rates: Rate[]) {
    this.rates = rates;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  private getPreviousDate(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  }
}

export const currencyStore = new CurrencyStore();
