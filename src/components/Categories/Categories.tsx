import React from 'react'

const categories = [
   'Все',
   'Мясные',
   'Вегетарианская',
   'Гриль',
   'Острые',
   'Закрытые'
]

type CategoriesProps = {
   value: number;
   onClickCategoty: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategoty }) => {

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