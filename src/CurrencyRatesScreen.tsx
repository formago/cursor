import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {fetchTodayRates, fetchYesterdayRates} from './CurrencyService';
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
    try {
      const todayRates = await fetchTodayRates();
      const yesterdayRates = await fetchYesterdayRates();

      const todayData = todayRates.filter(rate =>
        ['USD', 'EUR', 'GBP', 'CZK', 'UAH', 'CHF', 'NOK', 'CNY'].includes(
          rate.code,
        ),
      );

      const dataWithTrend = todayData.map(todayRate => {
        const yesterdayRate = yesterdayRates.find(
          yRate => yRate.code === todayRate.code,
        );
        const trend = yesterdayRate ? todayRate.mid - yesterdayRate.mid : null;
        return {...todayRate, trend};
      });

      setCurrencyData(dataWithTrend);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Walutomierz</Text>
          <Text style={styles.headerSubtitle}>
            Dane są automatycznie aktualizowane co minutę
          </Text>
          <FlatList
            data={currencyData}
            keyExtractor={item => item.code}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.currencyCard}>
                <Text style={styles.currencyName}>
                  {getModifiedName(item.code, item.currency)}
                </Text>
                <Text style={styles.currencyRate}>{`${item.mid.toFixed(
                  2,
                )}`}</Text>
                {item.trend !== null && (
                  <Text
                    style={
                      item.trend >= 0
                        ? styles.positiveTrend
                        : styles.negativeTrend
                    }>
                    {item.trend >= 0
                      ? `+${item.trend.toFixed(2)}`
                      : item.trend.toFixed(2)}
                  </Text>
                )}
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
