import React from 'react'
import { View, Text } from 'react-native'
import NewGiftTrees from '../../components/NewGiftTrees/index.native'

const GiftTreesContainer = (props) => {
  return (
    <NewGiftTrees
      navigation={props.navigation}
    />
  )
}

export default GiftTreesContainer
