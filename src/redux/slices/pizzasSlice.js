import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
   'pizza/fetchPizzasStatus',
   async ({ order, sortBy, category, search, currentPage }, thunkApi) => {
      const { data } = await axios.get(`https://6395ce1490ac47c680740c45.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

      if (data.length === 0) {
         thunkApi.rejectWithValue('Пиццы пустые');
      }

      return thunkApi.fulfillWithValue(data);
   }
)

const initialState = {
   items: [],
   status: 'loading', //loading sucsses error
}

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action) {
         state.items = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading';
            state.items = [];
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'succses';
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error';
            state.items = [];
         })
   }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;