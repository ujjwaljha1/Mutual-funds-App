// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchAllMutualFunds } from '../api/mutualFundsApi';
import { MutualFund } from '../types';
import SearchBar from '../components/SearchBar';
import FundList from '../components/FundList';
import LoadingIndicator from '../components/LoadingIndicator';
import { useWatchlistStore } from '../store/watchlistStore';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFunds, setFilteredFunds] = useState<MutualFund[]>([]);
  const { loadWatchlist } = useWatchlistStore();
  
  const { data: funds, isLoading, refetch } = useQuery({
    queryKey: ['mutualFunds'],
    queryFn: fetchAllMutualFunds,
  });

  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  useEffect(() => {
    if (funds) {
      if (searchQuery.trim() === '') {
        setFilteredFunds(funds);
      } else {
        const query = searchQuery.toLowerCase();
        const filtered = funds.filter(fund => 
          fund.schemeName.toLowerCase().includes(query) ||
          (fund.category && fund.category.toLowerCase().includes(query)) ||
          (fund.schemeType && fund.schemeType.toLowerCase().includes(query))
        );
        setFilteredFunds(filtered);
      }
    }
  }, [funds, searchQuery]);

  const handleFundPress = (fund: MutualFund) => {
    navigation.navigate('FundDetails', { fund });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <FundList 
        funds={filteredFunds}
        onFundPress={handleFundPress}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;