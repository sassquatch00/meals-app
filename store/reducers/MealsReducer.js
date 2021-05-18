import { MEALS } from "../../data/dummy-data"
import { SET_FILTERS, TOGGLE_FAVOURITE } from "../actions/MealsAction"

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: [],
}

const MealsReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.favouriteMeals.findIndex(meal => meal.id === action.mealId)
      if (existingIndex >= 0) {
        const updatedFavouriteMeals = [...state.favouriteMeals]
        updatedFavouriteMeals.splice(existingIndex, 1)
        return { ...state, favouriteMeals: updatedFavouriteMeals}
      } else {
        const newFavouriteMeal = state.meals.find(meal => meal.id === action.mealId)
        return {...state, favouriteMeals: state.favouriteMeals.concat(newFavouriteMeal)}
      }
    case SET_FILTERS:
      const appliedFilters = action.filters
      console.log(appliedFilters)
      const updatedFilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false
        } else if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false
        } else if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false
        } else if (appliedFilters.vegan && !meal.isVegan) {
          return false
        }
        return true
      })
      return { ...state, filteredMeals: updatedFilteredMeals}
    default: 
      return state
  }
}

export default MealsReducer