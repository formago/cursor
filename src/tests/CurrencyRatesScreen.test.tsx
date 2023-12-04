import React from 'react';
import { render } from '@testing-library/react';
import CurrencyRatesScreen from '../screens/CurrencyRatesScreen';
import { currencyStore } from '../stores/CurrencyStore';

jest.mock('./CurrencyStore', () => ({
  currencyStore: {
    rates: [],
    loading: false,
    fetchCurrencyData: jest.fn(),
  },
}));

describe('CurrencyRatesScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CurrencyRatesScreen />);
    expect(getByText('Walutomierz')).toBeTruthy();
  });
});
