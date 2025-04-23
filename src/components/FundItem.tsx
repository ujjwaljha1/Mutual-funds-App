// src/components/FundItem.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MutualFund } from '../types';

interface FundItemProps {
  fund: MutualFund;
  onPress: (fund: MutualFund) => void;
  isWatchlisted?: boolean;
}

const FundItem: React.FC<FundItemProps> = ({ fund, onPress, isWatchlisted }) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity onPress={() => onPress(fund)}>
      <Card style={[styles.card, isWatchlisted && { borderLeftColor: theme.colors.primary, borderLeftWidth: 4 }]}>
        <Card.Content>
          <Text variant="titleMedium" numberOfLines={2} style={styles.fundName}>
            {fund.schemeName}
          </Text>
          <View style={styles.detailsContainer}>
            {fund.category && (
              <Text variant="bodyMedium" style={styles.categoryText}>
                {fund.category}
              </Text>
            )}
            {fund.schemeType && (
              <Text variant="bodySmall" style={styles.schemeTypeText}>
                {fund.schemeType}
              </Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 2,
  },
  fundName: {
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  categoryText: {
    opacity: 0.8,
  },
  schemeTypeText: {
    opacity: 0.6,
  },
});

export default FundItem;