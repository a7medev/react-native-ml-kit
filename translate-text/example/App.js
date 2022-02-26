import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native';
import TranslateText, {
  TranslateLanguage,
} from '@react-native-ml-kit/translate-text';

const App = () => {
  const [text, setText] = useState('');

  const handlePress = () => {
    TranslateText.translate({
      text,
      sourceLanguage: TranslateLanguage.ENGLISH,
      targetLanguage: TranslateLanguage.SPANISH,
      downloadModelIfNeeded: true,
    })
      .then(result => {
        Alert.alert(result);
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

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
      <Button title="Translate into Spanish" onPress={handlePress} />
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
    marginBottom: 10,
  },
});

export default App;
