import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import IdentifyLanguages from '@react-native-ml-kit/identify-languages';

const App = () => {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('');

  useEffect(() => {
    IdentifyLanguages.identify(text).then(setLang).catch(console.error);
    IdentifyLanguages.identifyPossible(text)
      .then(identifiedLangs => {
        console.log(identifiedLangs);
      })
      .catch(console.error);
  }, [text]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter text to detect language</Text>
      <TextInput
        placeholder="Enter text here"
        multiline
        textAlignVertical="top"
        style={styles.input}
        value={text}
        onChangeText={_text => setText(_text)}
      />
      {lang ? (
        <Text style={styles.heading}>Language Code is: {lang}</Text>
      ) : null}
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
