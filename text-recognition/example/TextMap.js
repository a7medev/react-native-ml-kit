import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

const TextMap = ({ blocks, showWords, showBlocks }) => {
  return blocks.map(block => (
    <React.Fragment key={block.text}>
      {showBlocks && (
        <TouchableOpacity
          onPress={() => Alert.alert(block.text)}
          style={[styles.text, block.frame]}
        />
      )}

      {showWords &&
        block.lines.map(line =>
          line.elements.map(el => (
            <TouchableOpacity
              onPress={() => Alert.alert(el.text)}
              key={Math.random()}
              style={[styles.text, el.frame]}
            />
          )),
        )}
    </React.Fragment>
  ));
};

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    backgroundColor: 'rgba(27, 114, 232, 0.25)',
    borderRadius: 5,
  },
});

export default TextMap;
