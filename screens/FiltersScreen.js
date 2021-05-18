import React, { useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { Platform, StyleSheet, Switch, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import CustomHeaderButton from '../components/CustomHeaderButton'
import Colors from '../constants/Colors'
import { setFilters } from '../store/actions/MealsAction'

const FilterSwitch = props => {
  return(
    <View style={styles.filterContainer}>
    <Text>{props.label}</Text>
    <Switch 
      trackColor={{true: Colors.primaryColor}}
      thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
      value={props.state} 
      onValueChange={props.onChange}/>
  </View>
  )
}

const FiltersScreen = props => {
  const { navigation } = props
  const[isGlutenFree, setIsGlutenFree] = useState(false)
  const[isLactoseFree, setIsLactoseFree] = useState(false)
  const[isVegan, setIsVegan] = useState(false)
  const[isVegetarian, setIsVegetarian] = useState(false)

  const dispatch = useDispatch()

  // useCallback allows us to call the function when its dependencies without recreating the function itself since saveFilters is a dependency of useEffect
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    }

    dispatch(setFilters(appliedFilters))
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])

  // runs after the component rerenders
  useEffect(() => {
    navigation.setParams({save: saveFilters})
  }, [saveFilters])

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Available Filters and Restrictions</Text>
      <FilterSwitch label='Gluten-Free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)}/>
      <FilterSwitch label='Lactose-Free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)}/>
      <FilterSwitch label='Vegan' state={isVegan} onChange={newValue => setIsVegan(newValue)}/>
      <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)}/>
    </View>
  )
}

FiltersScreen['navigationOptions'] = navigationData => {
  return {
    headerTitle: 'Filters Screen',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => {
        navigationData.navigation.toggleDrawer()}}/>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Save' iconName='ios-save' onPress={navigationData.navigation.getParam('save')}/>
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 22,
    textAlign: 'center',
  }
})

export default FiltersScreen