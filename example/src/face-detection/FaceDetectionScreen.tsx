import React, {useState} from 'react';
import {Image, StyleSheet, View, Switch, Text} from 'react-native';
import FaceDetection, {Face} from '@react-native-ml-kit/face-detection';

import FaceMap from './FaceMap';
import ChooseImageButton, {ImageDetails} from '../core/ChooseImageButton';

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
          <Image
            source={{uri: image.path}}
            style={[styles.image, {height: image.height, width: image.width}]}
          />

          {faces.map(face => (
            <FaceMap
              key={Math.random()}
              face={face}
              width={image.width}
              height={image.height}
              hideFrame={showFrame}
              showContours={showContours}
              showLandmarks={showLandmarks}
            />
          ))}

          <View style={styles.switchContainer}>
            <Switch value={showFrame} onValueChange={setShowFrame} />
            <Text style={styles.switchLabel}>Hide Frame</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch value={showLandmarks} onValueChange={setShowLandmarks} />
            <Text style={styles.switchLabel}>Show Landmarks</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch value={showContours} onValueChange={setShowContours} />
            <Text style={styles.switchLabel}>Show Contours</Text>
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
  },
});

export default FaceDetectionScreen;
