import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'
import CustomHeaderButton from '../components/CustomHeaderButton'
import DefaultText from '../components/DefaultText'
import MealList from '../components/MealList'

const FavouritesScreen = props => {

  const favMeals = useSelector(state => state.meals.favouriteMeals)

  if (favMeals.length === 0) {
    return(
      <View style={styles.container}>
        <DefaultText>No favourite meals found, start adding some!</DefaultText>
      </View>
    )
  }
  return(
    <MealList listData={favMeals} navigation={props.navigation}/>
  )
}

FavouritesScreen['navigationOptions'] = navigationData => {
  return {
    headerTitle: 'Your Favourites',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => {
        navigationData.navigation.toggleDrawer()}}/>
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavouritesScreen