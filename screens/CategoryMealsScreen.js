import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import DefaultText from '../components/DefaultText'
import MealList from '../components/MealList'
import { CATEGORIES, MEALS } from '../data/dummy-data'

const CategoryMealsScreen = props => {

  const categoryId = props.navigation.getParam('categoryId')

  const availableMeals = useSelector(state => state.meals.filteredMeals)

  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0)

  if (displayedMeals.length === 0) {
    return(
      <View style={styles.container}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    )
  }

  return(
    <MealList listData={displayedMeals} navigation={props.navigation}/>
  )
}

CategoryMealsScreen['navigationOptions'] = navigationData => {
  const categoryId = navigationData.navigation.getParam('categoryId')
  const category = CATEGORIES.find(cat => cat.id === categoryId)
  const categoryTitle = category.title
  return {
    headerTitle: categoryTitle,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CategoryMealsScreen