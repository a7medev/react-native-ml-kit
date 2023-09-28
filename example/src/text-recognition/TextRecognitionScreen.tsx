import React, {useState} from 'react';
import {Button, Image, StyleSheet, View, Switch, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition, {
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';

import TextMap from './TextMap';

interface ImageDetails {
  path: string;
  height: number;
  width: number;
}

const TextRecognitionScreen = () => {
  const [image, setImage] = useState<ImageDetails>();
  const [result, setResult] = useState<TextRecognitionResult>();
  const [showBlocks, setShowBlocks] = useState(true);
  const [showWords, setShowWords] = useState(false);

  const handlePress = async () => {
    setResult(undefined);

    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (imageResult.canceled) {
      return;
    }

    const asset = imageResult.assets![0];
    const currentImage = {
      path: asset.uri,
      width: asset.width,
      height: asset.height,
    };
    setImage(currentImage);

    const _result = await TextRecognition.recognize(currentImage.path);
    setResult(_result);
  };

  return (
    <View style={styles.container}>
      <Button title="Choose an Image" onPress={handlePress} />

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{uri: image.path}} style={styles.image} />

          {result && (
            <TextMap
              width={image.width}
              height={image.height}
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
    aspectRatio: 1,
    width: '100%',
    objectFit: 'contain',
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

export default TextRecognitionScreen;
