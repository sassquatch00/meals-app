import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CategoryGridTile from '../components/CategoryGridTile'
import CustomHeaderButton from '../components/CustomHeaderButton'
import { CATEGORIES } from '../data/dummy-data'

const CategoriesScreen = props => {
  
  const renderGridItem = itemData => {
    return(
      <CategoryGridTile 
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals', 
            params: {
              categoryId: itemData.item.id
          }})
        }}
      />
    )
  }

  return(
    <FlatList data={CATEGORIES} keyExtractor={(item, index) => item.id} renderItem={renderGridItem} numColumns={2}/>
  )
}

CategoriesScreen['navigationOptions']= navigationData => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => {navigationData.navigation.toggleDrawer()}}/>
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
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150
  }
})

export default CategoriesScreen