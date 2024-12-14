import { ActivityIndicator, View, StyleSheet } from 'react-native';
import React from 'react';

function LoadingSpinner() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={'#008080'} />
    </View>
  );
}

export default LoadingSpinner;

const styles = StyleSheet.create({
  loader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
