import React from 'react'

type CategoriesProps = {
   value: number;
   onClickCategoty: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategoty }) => {

   const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые'
   ]

   const items = categories.map((item, i) => (
      <li key={i}
         onClick={() => onClickCategoty(i)}
         className={value === i ? "active" : ''}>{item}</li>
   ));

   return (
      <div className="categories">
         <ul>
            {items}
         </ul>
      </div>
   )
}

export default Categories;