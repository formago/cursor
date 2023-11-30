import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    padding: 5,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginTop: 10,
    padding: 10,
    paddingBottom: 0,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8e8e8e',
    textAlign: 'left',
    marginTop: 10,
    padding: 10,
  },
  listContent: {
    alignItems: 'center',
    width: '100%',
  },
  currencyCard: {
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    width: 160,
    height: 150,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: 'normal',
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
