// src/screens/FundDetailsScreen.tsx
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, Divider } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchFundDetails } from '../api/mutualFundsApi';
import { useWatchlistStore } from '../store/watchlistStore';
import LoadingIndicator from '../components/LoadingIndicator';

type FundDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'FundDetails'>;

const FundDetailsScreen: React.FC<FundDetailsScreenProps> = ({ route }) => {
  const { fund } = route.params;
  const theme = useTheme();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  
  const isWatchlisted = isInWatchlist(fund.schemeCode);

  const { data: fundDetails, isLoading } = useQuery({
    queryKey: ['fundDetails', fund.schemeCode],
    queryFn: () => fetchFundDetails(fund.schemeCode),
  });

  const toggleWatchlist = async () => {
    try {
      if (isWatchlisted) {
        await removeFromWatchlist(fund.schemeCode);
        Toast.show({
          type: 'success',
          text1: 'Removed from watchlist',
          text2: fund.schemeName,
        });
      } else {
        await addToWatchlist(fund);
        Toast.show({
          type: 'success',
          text1: 'Added to watchlist',
          text2: fund.schemeName,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update watchlist',
      });
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={fundDetails?.schemeName || fund.schemeName}
          subtitle={fundDetails?.fundHouse || 'Loading fund details...'}
        />
        <Card.Content>
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.label}>Latest NAV:</Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
              ₹{fundDetails?.nav || 'N/A'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.label}>NAV Date:</Text>
            <Text variant="bodyMedium">{fundDetails?.date || 'N/A'}</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.label}>Fund Type:</Text>
            <Text variant="bodyMedium">{fundDetails?.schemeType || fund.schemeType || 'N/A'}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.label}>Category:</Text>
            <Text variant="bodyMedium">{fundDetails?.schemeCategory || fund.category || 'N/A'}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text variant="bodyMedium" style={styles.label}>Scheme Code:</Text>
            <Text variant="bodyMedium">{fundDetails?.schemeCode || fund.schemeCode}</Text>
          </View>
        </Card.Content>
        
        <Card.Actions style={styles.cardActions}>
          <Button
            mode={isWatchlisted ? "outlined" : "contained"}
            onPress={toggleWatchlist}
            icon={isWatchlisted ? "star-off" : "star"}
          >
            {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    marginVertical: 10,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    opacity: 0.7,
  },
  divider: {
    marginVertical: 10,
  },
  cardActions: {
    justifyContent: 'center',
    paddingTop: 16,
  },
});

export default FundDetailsScreen;