import React, { useState } from 'react';
import { Button, Image, StyleSheet, View, Switch, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

import TextMap from './TextMap';

const App = () => {
  const [image, setImage] = useState();
  const [result, setResult] = useState();
  const [showBlocks, setShowBlocks] = useState(true);
  const [showWords, setShowWords] = useState(false);

  const handlePress = async () => {
    setResult(undefined);

    const _image = await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 350,
      cropping: true,
    });
    setImage(_image);

    const _result = await TextRecognition.recognize('file://' + _image.path);
    setResult(_result);
  };

  return (
    <View style={styles.container}>
      <Button title="Choose an Image" onPress={handlePress} />

      {image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image.path }}
            style={[styles.image, { height: image.height, width: image.width }]}
          />

          {result && (
            <TextMap
              blocks={result.blocks}
              showBlocks={showBlocks}
              showWords={showWords}
            />
          )}

          <View style={styles.switchContainer}>
            <Switch value={showBlocks} onValueChange={setShowBlocks} />
            <Text style={styles.switchLabel}>Show Blocks</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch value={showWords} onValueChange={setShowWords} />
            <Text style={styles.switchLabel}>Show Words</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
  },
  imageContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchLabel: {
    color: '#333',
    marginLeft: 15,
  },
});

export default App;
