import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "./filterSlice";

type FetchPizzasArgs = {
   sortBy: string;
   order: string;
   category: string;
   search: string;
   currentPage: number;
}
//? Комментарий выше, равен тому, что написано ниже если бы все значения были string
// type FetchPizzasArgs = Record<string, string>;
//! Можно не создавать новый тип, а сразу передать значение в параметр аргумента

type PizzaItem = {
   id: string;
   title: string;
   imageUrl: string;
   price: number;
   sizes: number[];
   types: number[];
   rating: number;
}

export enum Status {
   LOADING = 'loading',
   SUCCSESS = 'success',
   ERROR = 'error',
}

interface PizzaSliceState {
   items: PizzaItem[];
   status: Status;
}

export type SearchPizzaParams = {
   sortBy: string;
   order: string;
   category: string;
   search: string;
   currentPage: string;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
   'pizza/fetchPizzasStatus',
   async (params) => {
      const { order, sortBy, category, search, currentPage } = params;
      const { data } = await axios.get<PizzaItem[]>(`https://6395ce1490ac47c680740c45.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

      return data as PizzaItem[];
   }
)

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING, //loading sucsses error
}

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<PizzaItem[]>) {
         state.items = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCSESS;
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
         })
   }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;