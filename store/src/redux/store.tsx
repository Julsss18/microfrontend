import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ChartsModel, ChartsState } from "../interfaces/icharts";
import moment from "moment";
import data from "../mocks/data";

const dummyData: ChartsModel[] = [
  {
    id: 1,
    companyCode: "MSFT",
    companyFullname: "Microsoft Corporation",
    location: "United States",
    category: "Information Technology",
    stockPerformance: data,
    creditPerformance: data,
  },
  {
    id: 2,
    companyCode: "UBI",
    companyFullname: "Ubisoft Corporation",
    location: "Canada",
    category: "Information Technology",
    stockPerformance: data,
    creditPerformance: data,
  },
];

type Props = {
  children: React.ReactNode;
};

const initialState: ChartsState = {
  chart: null,
  stockPerformance: [],
  creditPerformance: [],
};

export const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    getInitialData: (state) => {
      state.chart = dummyData[0];
      state.stockPerformance = dummyData[0].stockPerformance;
      state.creditPerformance = dummyData[0].creditPerformance;
    },
    searchData: (state, action) => {
      const _dta = dummyData.filter((x) =>
        x.companyFullname.toLowerCase().includes(action.payload.toLowerCase())
      )[0];

      state.chart = !!!_dta ? dummyData[0] : _dta;
      state.stockPerformance = data;
      state.creditPerformance = data;
    },
    filterDataByDate: (state, action) => {
      const ago = moment().add(action.payload.date, "months").format();

      if (isNaN(action.payload.date) && action.payload.type === "stock") {
        state.stockPerformance = data;
      }

      if (isNaN(action.payload.date) && action.payload.type === "credit") {
        state.creditPerformance = data;
      }

      if (action.payload.type === "stock" && !isNaN(action.payload.date)) {
        state.stockPerformance = data.filter((x) => {
          return moment(ago) <= moment(x.date);
        });
      }

      if (action.payload.type === "credit" && !isNaN(action.payload.date)) {
        state.creditPerformance = data.filter((x) => {
          return moment(ago) <= moment(x.date);
        });
      }
    },
  },
});

const { getInitialData, searchData, filterDataByDate } = chartsSlice.actions;

const store = configureStore({
  reducer: chartsSlice.reducer,
});

export function useStore() {
  const charts = useSelector((state: ChartsState) => state.chart);
  const stock = useSelector((state: ChartsState) => state.stockPerformance);
  const credit = useSelector((state: ChartsState) => state.creditPerformance);

  const dispatch = useDispatch();

  return {
    charts,
    stock,
    credit,
    getInitialData: () => dispatch(getInitialData()),
    searchData: (e: unknown) => dispatch(searchData(e)),
    filterDataByDate: (e: unknown) => dispatch(filterDataByDate(e)),
  };
}

export function ProviderWrapper({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
