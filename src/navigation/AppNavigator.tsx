// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FundDetailsScreen from '../screens/FundDetailsScreen';
import WatchlistScreen from '../screens/WatchlistStore';
import { MutualFund } from '../types';
import { IconButton, useTheme } from 'react-native-paper';

export type RootStackParamList = {
  Home: undefined;
  FundDetails: { fund: MutualFund };
  Watchlist: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Mutual Fund Explorer',
            headerRight: () => (
              <IconButton
                icon="star"
                iconColor="#fff"
                onPress={() => navigation.navigate('Watchlist')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="FundDetails"
          component={FundDetailsScreen}
          options={({ route }) => ({
            title: route.params.fund.schemeName.length > 20
              ? route.params.fund.schemeName.substring(0, 20) + '...'
              : route.params.fund.schemeName,
          })}
        />
        <Stack.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{ title: 'My Watchlist' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;