import React from 'react'
import { ImageBackground, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import DefaultText from './DefaultText'

const MealItem = props => {
  let TouchableComp = TouchableOpacity
  
  if (Platform.OS === 'android' && Platform.Version>= 21) {
    TouchableComp = TouchableNativeFeedback
  } 

  return(
    <View style={styles.mealItem}>
      <TouchableComp onPress={props.onSelect}>
        <View>
          <View style={{...styles.mealRow, ...styles.mealHeader}}>
            <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{...styles.mealRow, ... styles.mealDetails}}>
            <DefaultText>{props.duration}m</DefaultText>
            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableComp>
    </View>
  )
}

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#dedede',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '90%',
  },
  mealDetails: {
    height: '10%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    color: 'white',
    textAlign: 'center'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
})

export default MealItem