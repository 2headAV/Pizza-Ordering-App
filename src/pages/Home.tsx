import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';


import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Pagination from '../components/Pagination/Pagination';

import { list } from '../components/Sort/Sort';

const Home: React.FC = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isSearch = useRef(false);
   const isMounted = useRef(false);

   const { categoryId, sort, currentPage, searchValue } = useSelector((state: any) => state.filter);
   const { items, status } = useSelector((state: any) => state.pizza);

   const sortType = sort.sortProperty;


   const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
   }

   const getPizzas = async () => {

      const order = sortType.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
         // @ts-ignore
         fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage
         }));
   }

   // Если изменили параметры и был первый рендер
   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage
         });
         navigate(`?${queryString}`);
      }
      isMounted.current = true;
   }, [categoryId, sortType, searchValue, currentPage]);

   // если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));

         const sort = list.find(obj => obj.sortProperty === params.sortProperty);
         dispatch(setFilters({
            ...params,
            sort
         }));
         isSearch.current = true;
      }
   }, []);

   // Если был певый рендер, то запрашиваем пиццы
   useEffect(() => {
      window.scrollTo(0, 0);
      if (!isSearch.current) {
         getPizzas();
      }

      isSearch.current = false;
   }, [categoryId, sortType, searchValue, currentPage]);

   const pizzas = items.map((item: any) =>
      <PizzaBlock
         key={item.id}
         id={item.id}
         title={item.name}
         price={item.price}
         imageUrl={item.imageUrl}
         sizes={item.sizes}
         types={item.types} />)

   const skeletons = [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />);

   return (
      <div className="container">
         <div className="content__top">
            <Categories value={categoryId} onClickCategoty={(id: number) => dispatch(setCategoryId(id))} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {
            status === 'error' ? <div className='content__error-info'>
               <h2>Произошла ошибка</h2>
               <p>Не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
            </div> : <div className="content__items">{status === 'loading' ? skeletons : pizzas}
            </div>
         }

         <Pagination currentPage={currentPage} onChangePage={(number: number) => onChangePage(number)} />
      </div>
   )
}

export default Home;