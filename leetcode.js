const mergeTwoLists = (list1, list2) => {

   const arr = [...list1, ...list2];
   let resArr = [];

   for (let i = 0; i < arr.length; i++) {
      resArr.push(arr.filter((number, index) => {
         number === arr[i];
         arr.slice(index, index + 1);
         return arr
      }));
   }
   return resArr[0].sort((a, b) => a - b);
};

console.log(mergeTwoLists([1, 2, 4], [1, 3, 4]));