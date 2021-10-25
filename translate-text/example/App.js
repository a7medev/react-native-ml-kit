import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import TranslateText from '@react-native-ml-kit/translate-text';

const App = () => {
  const [text, setText] = useState('');

  // TODO: add example usage

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter text to translate</Text>
      <TextInput
        placeholder="Enter text here"
        multiline
        textAlignVertical="top"
        style={styles.input}
        value={text}
        onChangeText={_text => setText(_text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    height: 100,
    width: '90%',
    padding: 15,
    backgroundColor: '#eee',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default App;
