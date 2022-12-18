import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaBlockSkeleton: React.FC = () => {
   return (
      <ContentLoader
         className='pizza-block'
         speed={2}
         width={280}
         height={460}
         viewBox="0 0 280 460"
         backgroundColor="#f3f3f3"
         foregroundColor="#ecebeb"
      >
         <circle cx="134" cy="136" r="120" />
         <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
         <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
         <rect x="0" y="410" rx="10" ry="10" width="95" height="30" />
         <rect x="125" y="410" rx="25" ry="25" width="152" height="45" />
      </ContentLoader>
   )
}

export default PizzaBlockSkeleton;