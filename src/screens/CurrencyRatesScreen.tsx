import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { currencyStore } from '../stores/CurrencyStore';
import { styles } from '../styles/styles';
import resources from '../resources/resources.json';
import CurrencyCard from '../components/CurrencyCard';
import ErrorScreen from '../components/ErrorScreen';

const CurrencyRatesScreen: React.FC = observer(() => {
  useEffect(() => {
    currencyStore.fetchCurrencyData();
    const interval = setInterval(
      currencyStore.fetchCurrencyData,
      resources.updateFrequency,
    );
    return () => clearInterval(interval);
  }, []);

  if (currencyStore.error) {
    return <ErrorScreen />;
  }

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
            keyExtractor={item => item.code}
            numColumns={2}
            renderItem={({ item }) => <CurrencyCard rate={item} />}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}
    </SafeAreaView>
  );
});

export default CurrencyRatesScreen;
