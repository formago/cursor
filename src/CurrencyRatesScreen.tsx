import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {currencyStore} from './CurrencyStore';
import {getModifiedName} from './utils';
import {styles} from './styles';
import resources from './resources.json';
import {Rate} from './CurrencyService';

const CurrencyRatesScreen: React.FC = observer(() => {
  useEffect(() => {
    currencyStore.fetchCurrencyData();
    const interval = setInterval(
      currencyStore.fetchCurrencyData,
      resources.updateFrequency,
    );
    return () => clearInterval(interval);
  }, []);

  const getTrendStyle = (trend: number | null) => {
    return trend === null || trend.toFixed(resources.decimalRounding) === '0.00'
      ? styles.currencyName
      : trend >= 0
      ? styles.positiveTrend
      : styles.negativeTrend;
  };

  const getTrendValue = (trend: number | null) => {
    return trend === null || trend.toFixed(resources.decimalRounding) === '0.00'
      ? '—'
      : trend >= 0
      ? `+${trend.toFixed(resources.decimalRounding)}`
      : trend.toFixed(resources.decimalRounding);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {currencyStore.loading ? (
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
            data={currencyStore.rates}
            horizontal={false}
            keyExtractor={(item: Rate) => item.code}
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
});

export default CurrencyRatesScreen;
