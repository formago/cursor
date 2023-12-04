import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import resources from '../resources/resources.json';
import { currencyStore } from '../stores/CurrencyStore';

const ErrorScreen = () => {
  const handleRetry = () => {
    currencyStore.fetchCurrencyData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{resources.errorScreenMessage}</Text>
      <Button title={resources.retryButtonTitle} onPress={handleRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default ErrorScreen;
