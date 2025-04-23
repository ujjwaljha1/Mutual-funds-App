// src/components/FundList.tsx
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { MutualFund } from '../types';
import FundItem from './FundItem';
import { useWatchlistStore } from '../store/watchlistStore';

interface FundListProps {
  funds: MutualFund[];
  onFundPress: (fund: MutualFund) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const FundList: React.FC<FundListProps> = ({ 
  funds, 
  onFundPress,
  refreshing = false,
  onRefresh
}) => {
  const { isInWatchlist } = useWatchlistStore();

  if (funds.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No mutual funds found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={funds}
      renderItem={({ item }) => (
        <FundItem 
          fund={item}
          onPress={onFundPress}
          isWatchlisted={isInWatchlist(item.schemeCode)}
        />
      )}
      keyExtractor={(item) => item.schemeCode.toString()}
      contentContainerStyle={styles.listContainer}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
});

export default FundList;