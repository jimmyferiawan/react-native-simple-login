import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Separator() {
  const styles = {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }

  return (
    <View style={styles} />
  )
}
