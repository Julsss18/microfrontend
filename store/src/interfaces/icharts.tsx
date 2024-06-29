export interface CreditStockModel {
  date: string;
  close: number;
}

export interface ChartsModel {
  id: number;
  companyCode: string;
  companyFullname: string;
  location: string;
  category: string;
  stockPerformance: CreditStockModel[];
  creditPerformance: CreditStockModel[];
}

export interface ChartsState {
  chart: ChartsModel | null;
  stockPerformance: CreditStockModel[];
  creditPerformance: CreditStockModel[];
}
