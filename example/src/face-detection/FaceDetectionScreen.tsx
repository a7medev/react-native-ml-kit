import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FaceDetection, {Face} from '@react-native-ml-kit/face-detection';

import FaceMap from './FaceMap';
import ChooseImageButton, {ImageDetails} from '../core/ChooseImageButton';
import OptionSwitch from '../core/OptionSwitch';
import PreviewImage from '../core/PreviewImage';

const FaceDetectionScreen = () => {
  const [image, setImage] = useState<ImageDetails>();
  const [faces, setFaces] = useState<Face[]>([]);
  const [showFrame, setShowFrame] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [showContours, setShowContours] = useState(false);

  const handleChoose = async (currentImage: ImageDetails) => {
    setImage(currentImage);

    const result = await FaceDetection.detect(currentImage.path, {
      landmarkMode: 'all',
      contourMode: 'all',
    });

    setFaces(result);
  };

  return (
    <View style={styles.container}>
      <ChooseImageButton onChoose={handleChoose} />

      {image && (
        <View style={styles.imageContainer}>
          <PreviewImage source={image.path} />

          {faces.map(face => (
            <FaceMap
              key={Math.random()}
              face={face}
              width={image.width}
              height={image.height}
              showFrame={showFrame}
              showContours={showContours}
              showLandmarks={showLandmarks}
            />
          ))}

          <OptionSwitch
            label="Show Frame"
            value={showFrame}
            onChange={setShowFrame}
          />
          <OptionSwitch
            label="Show Landmarks"
            value={showLandmarks}
            onChange={setShowLandmarks}
          />
          <OptionSwitch
            label="Show Contours"
            value={showContours}
            onChange={setShowContours}
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

export default FaceDetectionScreen;
