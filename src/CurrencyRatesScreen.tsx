// CurrencyRatesScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import resources from './resources.json';
import {fetchTodayAndYesterdayRates} from './CurrencyService';
import {getModifiedName} from './utils';
import {styles} from './styles';

interface Rate {
  currency: string;
  code: string;
  mid: number;
  trend?: number | null;
}

const CurrencyRatesScreen = () => {
  const [currencyData, setCurrencyData] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrencyData = async () => {
    setLoading(true);
    try {
      const {todayRates, yesterdayRates} = await fetchTodayAndYesterdayRates();

      const dataWithTrend = todayRates
        .filter(rate => resources.currencyCodes.includes(rate.code))
        .map(todayRate => {
          const yesterdayRate = yesterdayRates.find(
            yRate => yRate.code === todayRate.code,
          );
          const trend = yesterdayRate
            ? todayRate.mid - yesterdayRate.mid
            : null;
          return {...todayRate, trend};
        });

      setCurrencyData(dataWithTrend);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendStyle = (trend: number | null) => {
    if (trend === null) return styles.currencyName;
    return trend.toFixed(resources.decimalRounding) === '0.00'
      ? styles.currencyName
      : trend >= 0
      ? styles.positiveTrend
      : styles.negativeTrend;
  };

  const getTrendValue = (trend: number | null) => {
    if (trend === null) return '—';
    return trend.toFixed(resources.decimalRounding) === '0.00'
      ? '—'
      : trend >= 0
      ? `+${trend.toFixed(resources.decimalRounding)}`
      : trend.toFixed(resources.decimalRounding);
  };

  useEffect(() => {
    fetchCurrencyData();
    const interval = setInterval(fetchCurrencyData, resources.updateFrequency);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{resources.texts.headerTitle}</Text>
          <Text style={styles.headerSubtitle}>
            {resources.texts.headerSubtitle}
          </Text>
          <FlatList
            data={currencyData}
            horizontal={false}
            keyExtractor={item => item.code}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.currencyCard}>
                <Text style={styles.currencyName}>
                  {getModifiedName(item.code, item.currency)}
                </Text>
                <Text style={styles.currencyRate}>
                  {item.mid.toFixed(resources.decimalRounding)}
                </Text>
                <Text style={getTrendStyle(item.trend)}>
                  {getTrendValue(item.trend)}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CurrencyRatesScreen;
