import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Rate } from './CurrencyService';
import { getModifiedName, getTrendStyle, getTrendValue } from './utils';
import resources from './resources.json';

interface CurrencyCardProps {
  rate: Rate;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ rate }) => {
  return (
    <View style={styles.currencyCard}>
      <Text style={styles.currencyName}>
        {getModifiedName(rate.code, rate.currency)}
      </Text>
      <Text style={styles.currencyRate}>
        {rate.mid.toFixed(resources.decimalRounding)}
      </Text>
      <Text style={getTrendStyle(rate.trend)}>{getTrendValue(rate.trend)}</Text>
    </View>
  );
};

export default CurrencyCard;
