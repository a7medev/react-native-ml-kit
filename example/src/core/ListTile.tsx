import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

interface ListTileProps {
  title: string;
  onPress: () => void;
}

const ListTile = ({title, onPress}: ListTileProps) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.listTile}
      underlayColor="#f2f2f2">
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  listTile: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ListTile;
