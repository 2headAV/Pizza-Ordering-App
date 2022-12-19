import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
   RATING_DESC = 'rating',
   RATING_ASC = '-rating',
   NAME_DESC = 'name',
   NAME_ASC = '-name',
   PRICE_DESC = 'price',
   PRICE_ASC = '-price',

}

export type Sort = {
   name: string;
   sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
   categoryId: number;
   currentPage: number;
   searchValue: string;
   sort: Sort;
}

const initialState: FilterSliceState = {
   categoryId: 0,
   currentPage: 1,
   sort: {
      name: 'популярности (DESC)',
      sortProperty: SortPropertyEnum.RATING_DESC
   },
   searchValue: '',
};

const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload;
      },
      setSort(state, action: PayloadAction<Sort>) {
         state.sort = action.payload;
         console.log(action.payload);
      },
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload;
      },
      setFilters(state, action: PayloadAction<FilterSliceState>) {
         state.currentPage = Number(action.payload.currentPage);
         state.categoryId = Number(action.payload.categoryId);
         state.sort = action.payload.sort;

      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      }
   }
});

export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue, } = filterSlice.actions;

export default filterSlice.reducer;