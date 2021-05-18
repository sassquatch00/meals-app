import React from 'react'
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'

const CategoryGridTile = props => {
  let TouchableComp = TouchableOpacity
  if (Platform.OS === 'android' && Platform.Version>= 21) {
    TouchableComp = TouchableNativeFeedback
  } 
  return(
    <View style={styles.gridItem}>
      <TouchableComp style={{flex: 1}} onPress={props.onSelect}>
        <View style={{...styles.container,...{backgroundColor: props.color}}}>
          <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
        </View>
      </TouchableComp>
    </View>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    // overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'visible' : 'hidden',
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    elevation: 5,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  },
})

export default CategoryGridTile