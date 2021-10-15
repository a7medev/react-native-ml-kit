import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const App = () => {
  const handlePress = () => {};

  return (
    <View style={styles.container}>
      <Button title="Choose an Image" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
