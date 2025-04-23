// src/components/SearchBar.tsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  // First try with standard Searchbar, but with explicit rendering of icon components
  try {
    return (
      <Searchbar
        placeholder="Search mutual funds..."
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#666"
      />
    );
  } catch (error) {
    // Fallback to a custom search bar implementation
    return (
      <View style={styles.customSearchContainer}>
        <IconButton icon="magnify" size={20} />
        <TextInput
          placeholder="Search mutual funds..."
          value={searchQuery}
          onChangeText={onSearchChange}
          style={styles.textInput}
        />
        {searchQuery.length > 0 && (
          <IconButton 
            icon="close-circle" 
            size={20} 
            onPress={() => onSearchChange('')}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
    elevation: 2,
  },
  customSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 10,
    paddingHorizontal: 5,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
});

export default SearchBar;