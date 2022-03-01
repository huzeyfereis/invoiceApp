
export const sortAsc = (arr, field) => {
    return arr.sort(function (a, b) {
      if(field === 'createdBy') {
       if (a[field]['name'] > b[field]['name']) {
         return 1;
       }
       if (b[field]['name']> a[field]['name']) {
           return -1;
       }
       return 0;
      } else {
       if (a[field] > b[field]) {
         return 1;
       }
       if (b[field]> a[field]) {
           return -1;
       }
       return 0;
      }      
    })
 }
 
 export const sortDesc = (arr, field) => {
    return arr.sort(function (a, b) {
     if(field === 'createdBy') {
       if (a[field]['name'] > b[field]['name']) {
         return -1;
       }
       if (b[field]['name']> a[field]['name']) {
           return 1;
       }
       return 0;
      } else {
       if (a[field] > b[field]) {
         return -1;
       }
       if (b[field]> a[field]) {
           return 1;
       }
       return 0;
      }  
    })
 }