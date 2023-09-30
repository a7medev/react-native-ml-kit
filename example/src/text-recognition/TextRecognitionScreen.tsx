import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import TextRecognition, {
  TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';

import TextMap from './TextMap';
import ChooseImageButton, {ImageDetails} from '../core/ChooseImageButton';
import PreviewImage from '../core/PreviewImage';
import OptionSwitch from '../core/OptionSwitch';

const TextRecognitionScreen = () => {
  const [image, setImage] = useState<ImageDetails>();
  const [result, setResult] = useState<TextRecognitionResult>();
  const [showBlocks, setShowBlocks] = useState(true);
  const [showWords, setShowWords] = useState(false);

  const handleChoose = async (currentImage: ImageDetails) => {
    setImage(currentImage);

    const _result = await TextRecognition.recognize(currentImage.path);

    setResult(_result);
  };

  return (
    <View style={styles.container}>
      <ChooseImageButton onChoose={handleChoose} />

      {image && (
        <View style={styles.imageContainer}>
          <PreviewImage source={image.path} />

          {result && (
            <TextMap
              width={image.width}
              height={image.height}
              blocks={result.blocks}
              showBlocks={showBlocks}
              showWords={showWords}
            />
          )}

          <OptionSwitch
            label="Show Blocks"
            value={showBlocks}
            onChange={setShowBlocks}
          />
          <OptionSwitch
            label="Show Words"
            value={showWords}
            onChange={setShowWords}
          />
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
  imageContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
});

export default TextRecognitionScreen;
