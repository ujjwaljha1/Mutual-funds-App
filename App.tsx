// src/App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import AppNavigator from "./src/navigation/AppNavigator"; // Ensure this file exists or adjust the path

// Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Configure theme
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1e50a0',
    secondary: '#4f8fba',
    error: '#ba1a1a',
    background: '#f5f5f7',
  },
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AppNavigator />
          <Toast />
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;