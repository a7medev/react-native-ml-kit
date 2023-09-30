import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface LabelProps {
  children: React.ReactNode;
}

const LabelTile = ({children}: LabelProps) => {
  return (
    <View style={styles.label}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    marginHorizontal: 10,
    alignItems: 'center',
  },
});

export default LabelTile;
