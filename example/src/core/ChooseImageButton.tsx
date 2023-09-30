import React from 'react';
import {Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export interface ImageDetails {
  path: string;
  height: number;
  width: number;
}

interface ChooseImageButtonProps {
  onChoose: (image: ImageDetails) => void;
}

const ChooseImageButton = ({onChoose}: ChooseImageButtonProps) => {
  const handlePress = async () => {
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

    onChoose(currentImage);
  };

  return <Button title="Choose an Image" onPress={handlePress} />;
};

export default ChooseImageButton;
