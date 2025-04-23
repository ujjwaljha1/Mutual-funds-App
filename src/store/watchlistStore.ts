// src/store/watchlistStore.ts
import { create } from 'zustand';
import { MutualFund } from '../types';
import { storeData, getData } from '../utils/storage';

interface WatchlistState {
  watchlist: MutualFund[];
  isLoading: boolean;
  addToWatchlist: (fund: MutualFund) => Promise<void>;
  removeFromWatchlist: (schemeCode: number) => Promise<void>;
  isInWatchlist: (schemeCode: number) => boolean;
  loadWatchlist: () => Promise<void>;
}

const WATCHLIST_STORAGE_KEY = 'mutual_fund_watchlist';

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlist: [],
  isLoading: false,
  
  addToWatchlist: async (fund: MutualFund) => {
    const currentWatchlist = get().watchlist;
    
    // Check if fund already exists in watchlist
    if (currentWatchlist.some(item => item.schemeCode === fund.schemeCode)) {
      return;
    }
    
    const newWatchlist = [...currentWatchlist, fund];
    set({ watchlist: newWatchlist });
    
    // Persist to storage
    await storeData(WATCHLIST_STORAGE_KEY, newWatchlist);
  },
  
  removeFromWatchlist: async (schemeCode: number) => {
    const newWatchlist = get().watchlist.filter(
      fund => fund.schemeCode !== schemeCode
    );
    set({ watchlist: newWatchlist });
    
    // Persist to storage
    await storeData(WATCHLIST_STORAGE_KEY, newWatchlist);
  },
  
  isInWatchlist: (schemeCode: number) => {
    return get().watchlist.some(fund => fund.schemeCode === schemeCode);
  },
  
  loadWatchlist: async () => {
    set({ isLoading: true });
    try {
      const storedWatchlist = await getData<MutualFund[]>(WATCHLIST_STORAGE_KEY);
      if (storedWatchlist) {
        set({ watchlist: storedWatchlist });
      }
    } catch (error) {
      console.error('Error loading watchlist:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));