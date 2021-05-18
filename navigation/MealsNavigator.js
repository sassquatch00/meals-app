import React from 'react'
import { Platform, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailsScreen'
import Colors from '../constants/Colors'
import FavouritesScreen from '../screens/FavouritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerBackTitle: 'Back',
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
}


const MealsNavigator = createStackNavigator(
  { 
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetails: MealDetailsScreen,
  },
  { defaultNavigationOptions: defaultStackNavOptions }
)

const FavouritesNavigator = createStackNavigator(
  {
    Favourites: FavouritesScreen,
    MealDetails: MealDetailsScreen,
  },
  { defaultNavigationOptions: defaultStackNavOptions }
)

const tabConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {return <Ionicons name='ios-restaurant' size={25} color = {tabInfo.tintColor}/> },
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans'}}>Meals</Text> : 'Meals',
    },
  },
  Favourites: {
    screen: FavouritesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {return <Ionicons name='ios-star' size={25} color = {tabInfo.tintColor}/> },
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans'}}>Favourites</Text> : 'Favourties',
    }
  }
}

const MealsTabNavigator = Platform.OS === 'android' ? 
  createMaterialBottomTabNavigator(tabConfig, {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
      shifting: true,
    }
  }) 
  : createBottomTabNavigator(tabConfig, {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans'
      }
    }
  })

const FiltersNavigator = createStackNavigator(
  { Filters: FiltersScreen },
  { defaultNavigationOptions: defaultStackNavOptions, },
)

const MainNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MealsTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals'
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      },
    },
    style: {
      marginTop: Platform.OS === 'android' ? 20 : 0,
    }
  },
)

export default createAppContainer(MainNavigator)