// src/types/index.ts
export interface MutualFund {
    schemeCode: number;
    schemeName: string;
    category?: string;
    schemeType?: string;
    fund?: string;
    fundHouse?: string;
  }
  
  export interface MutualFundDetail extends MutualFund {
    nav: string;
    date: string;
    schemeType: string;
    fundHouse: string;
    schemeCategory: string;
    schemeCode: number;
    schemeName: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    data: T;
  }
  
  export interface NavHistory {
    date: string;
    nav: string;
  }
  
  export interface MutualFundDetailResponse {
    meta: {
      fund_house: string;
      scheme_type: string;
      scheme_category: string;
      scheme_code: number;
      scheme_name: string;
    };
    data: NavHistory[];
  }