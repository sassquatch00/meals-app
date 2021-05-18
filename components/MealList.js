import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import MealItem from './MealItem'

const MealList = props => {
  const favouriteMeals = useSelector(state => state.meals.favouriteMeals)

  const renderMealItem = itemData => {
    return(
      <MealItem 
        title={itemData.item.title} 
        duration={itemData.item.duration} 
        complexity={itemData.item.complexity} 
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'MealDetails', 
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: favouriteMeals.some(meal => meal.id === itemData.item.id)
          }})
        }}
      />)
  }

  return(
    <View style={styles.container}>
      <FlatList style={styles.list} data={props.listData} keyExtractor={(item, index) => item.id} renderItem={renderMealItem}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    width: '100%',
    padding: 20,
  },
})

export default MealList