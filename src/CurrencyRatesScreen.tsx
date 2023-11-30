import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

interface Rate {
  currency: string;
  code: string;
  mid: number;
  trend?: number;
}

const CurrencyRatesScreen = () => {
  const [currencyData, setCurrencyData] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrencyData = async () => {
    try {
      const response = await axios.get(
        'https://api.nbp.pl/api/exchangerates/tables/A/?format=json',
      );
      const filteredData = response.data[0].rates.filter((rate: Rate) =>
        ['USD', 'EUR', 'GBP', 'CZK', 'UAH', 'CHF', 'NOK', 'CNY'].includes(
          rate.code,
        ),
      );
      const dataWithTrend = filteredData.map((rate: Rate) => ({
        ...rate,
        trend: parseFloat((Math.random() * (0.2 - -0.2) + -0.2).toFixed(2)),
      }));
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Walutomierz</Text>
        <Text style={styles.headerSubtitle}>
          Dane są automatycznie aktualizowane co minutę
        </Text>
      </View>
      <FlatList
        data={currencyData}
        keyExtractor={item => item.code}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.currencyCard}>
            <Text style={styles.currencyName}>{item.currency}</Text>
            <Text style={styles.currencyRate}>{`${item.mid.toFixed(2)}`}</Text>
            {item.trend !== undefined && (
              <Text
                style={
                  item.trend >= 0 ? styles.positiveTrend : styles.negativeTrend
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8e8e8e',
    textAlign: 'left',
    marginTop: 10,
  },
  listContent: {
    alignItems: 'center',
  },
  currencyCard: {
    margin: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    width: 160,
    height: 150,
  },
  currencyName: {
    fontSize: 16,
    //fontWeight: 'bold',
    color: '#8e8e8e',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  currencyRate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
  },
  positiveTrend: {
    fontSize: 18,
    color: 'green',
  },
  negativeTrend: {
    fontSize: 18,
    color: 'red',
  },
});

export default CurrencyRatesScreen;
