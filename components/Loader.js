import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import colors from '../constants/colors'

export default () => (
  <View
    style={{
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
    <ActivityIndicator size="large" color={colors.mediumRed} />
  </View>
)
