export interface DataPoint {
    feature: string;
    value: number;
    timeData?: { day: string; value: number }[];
  }
  
  export interface Filters {
    startDate: string;
    endDate: string;
    ageFilter: string;
    genderFilter: string;
  }
  
  export interface UrlParams {
    startDate?: string;
    endDate?: string;
    age?: string;
    gender?: string;
  }