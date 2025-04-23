// src/api/mutualFundsApi.ts
import { MutualFund, MutualFundDetail, MutualFundDetailResponse } from '../types';

const BASE_URL = 'https://api.mfapi.in';

export const fetchAllMutualFunds = async (): Promise<MutualFund[]> => {
  try {
    const response = await fetch(`${BASE_URL}/mf`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch mutual funds');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching mutual funds:', error);
    throw error;
  }
};

export const fetchFundDetails = async (schemeCode: number): Promise<MutualFundDetail> => {
  try {
    const response = await fetch(`${BASE_URL}/mf/${schemeCode}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch fund details');
    }
    
    const data: MutualFundDetailResponse = await response.json();
    
    // Format the response data into our MutualFundDetail type
    return {
      schemeCode: data.meta.scheme_code,
      schemeName: data.meta.scheme_name,
      fundHouse: data.meta.fund_house,
      schemeType: data.meta.scheme_type,
      schemeCategory: data.meta.scheme_category,
      nav: data.data[0]?.nav || 'N/A',
      date: data.data[0]?.date || 'N/A',
      category: data.meta.scheme_category,
    };
  } catch (error) {
    console.error(`Error fetching details for fund ${schemeCode}:`, error);
    throw error;
  }
};

export const searchMutualFunds = async (query: string): Promise<MutualFund[]> => {
  try {
    const response = await fetch(`${BASE_URL}/mf/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to search mutual funds');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching mutual funds:', error);
    throw error;
  }
};