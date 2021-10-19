import React, { useState } from 'react';
import { Button, Image, StyleSheet, View, Switch, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FaceDetection from '@react-native-ml-kit/face-detection';

import FaceMap from './FaceMap';

const App = () => {
  const [image, setImage] = useState();
  const [faces, setFaces] = useState([]);
  const [hideFrame, setHideFrame] = useState(false);
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [showContours, setShowContours] = useState(false);

  const handlePress = async () => {
    setFaces([]);

    const _image = await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 350,
      height: 350,
      cropping: true,
    });
    setImage(_image);

    const result = await FaceDetection.detect('file://' + _image.path, {
      landmarkMode: 'all',
      contourMode: 'all',
    });
    setFaces(result);
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

          {faces.map(face => (
            <FaceMap
              key={Math.random()}
              face={face}
              width={image.width}
              height={image.height}
              hideFrame={hideFrame}
              showContours={showContours}
              showLandmarks={showLandmarks}
            />
          ))}

          <View style={styles.switchContainer}>
            <Switch value={hideFrame} onValueChange={setHideFrame} />
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

export default App;
