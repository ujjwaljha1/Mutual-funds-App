// src/screens/WatchlistScreen.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MutualFund } from '../types';
import FundList from '../components/FundList';
import LoadingIndicator from '../components/LoadingIndicator';
import { useWatchlistStore } from '../store/watchlistStore';

type WatchlistScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Watchlist'>;

interface WatchlistScreenProps {
  navigation: WatchlistScreenNavigationProp;
}

const WatchlistScreen: React.FC<WatchlistScreenProps> = ({ navigation }) => {
  const { watchlist, isLoading, loadWatchlist } = useWatchlistStore();

  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  const handleFundPress = (fund: MutualFund) => {
    navigation.navigate('FundDetails', { fund });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (watchlist.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="titleMedium">Your watchlist is empty</Text>
        <Text variant="bodyMedium" style={styles.emptySubtitle}>
          Add mutual funds to your watchlist to track them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FundList
        funds={watchlist}
        onFundPress={handleFundPress}
        refreshing={isLoading}
        onRefresh={loadWatchlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptySubtitle: {
    marginTop: 8,
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default WatchlistScreen;