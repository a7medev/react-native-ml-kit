import React, {useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import ImageLabeling, {Label} from '@react-native-ml-kit/image-labeling';
import ChooseImageButton, {ImageDetails} from '../core/ChooseImageButton';
import PreviewImage from '../core/PreviewImage';
import LabelTile from '../core/LabelTile';

const ImageLabelingScreen = () => {
  const [image, setImage] = useState<ImageDetails>();
  const [labels, setLabels] = useState<Label[]>([]);

  const handleChoose = async (currentImage: ImageDetails) => {
    setImage(currentImage);

    const result = await ImageLabeling.label(currentImage.path);

    setLabels(result);
  };

  return (
    <View style={styles.container}>
      <ChooseImageButton onChoose={handleChoose} />

      {image && <PreviewImage source={image.path} />}

      {labels.length > 0 && (
        <>
          <Text style={styles.heading}>labels</Text>

          <FlatList
            data={labels}
            style={styles.list}
            keyExtractor={label => label.text}
            renderItem={({item}) => (
              <LabelTile>
                {item.text} - {(100 * item.confidence).toFixed(2)}%
              </LabelTile>
            )}
          />
        </>
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
  list: {
    width: '100%',
    padding: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default ImageLabelingScreen;
