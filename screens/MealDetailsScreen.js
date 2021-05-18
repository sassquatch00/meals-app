import React, { useCallback, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import CustomHeaderButton from '../components/CustomHeaderButton'
import DefaultText from '../components/DefaultText'

import { MEALS } from '../data/dummy-data'
import { toggleFavourite } from '../store/actions/MealsAction'

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  )
}

const MealDetailsScreen = props => {

  const availableMeals = useSelector(state => state.meals.meals)

  const mealId = props.navigation.getParam('mealId')

  const isInFavourites = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mealId))

  const meal = availableMeals.find(m => m.id === mealId )

  const dispatch = useDispatch()

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavouriteHandler})
  }, [toggleFavouriteHandler])

  useEffect(() => {
    props.navigation.setParams({isFavourite : isInFavourites})
  }, [isInFavourites])

  return(
    <ScrollView>
      <Image source={{uri: meal.imageUrl}} style={styles.image}/>
      <View style={styles.details}>
        <DefaultText>{meal.duration}m</DefaultText>
        <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {meal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
      <Text style={styles.title}>Steps</Text>
      {meal.steps.map(step=> <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>
  )
}

MealDetailsScreen['navigationOptions'] = navigationData => {
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  const toggleFavourite = navigationData.navigation.getParam('toggleFav')
  const isFavourite = navigationData.navigation.getParam('isFavourite')
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="favourite" iconName={isFavourite ? "ios-star" : "ios-star-outline"} onPress={toggleFavourite} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
})

export default MealDetailsScreen