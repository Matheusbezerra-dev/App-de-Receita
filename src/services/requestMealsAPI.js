// export const getCategoryThemealdb = () => {
//   const url = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
//   const data = url.json();
//   return data;
// };

// export const getNationalityThemealdb = () => {
//   const url = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
//   const data = url.json();
//   return data;
// };

// export const getIngredientsThemealdb = () => {
//   const url = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
//   const data = url.json();
//   return data;
// };

const requestMealsAPI = async (filterOption, valueSearch) => {
  if (filterOption === 'ingredient-search') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueSearch}`);
      const results = await response.json();
      return results;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  if (filterOption === 'name-search') {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueSearch}`);
      const results = await response.json();
      return results;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  if (filterOption === 'first-letter-search') {
    if (valueSearch.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${valueSearch}`);
      const results = await response.json();
      return results;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default requestMealsAPI;
