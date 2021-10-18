import React, { useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FaceDetection from '@react-native-ml-kit/face-detection';

import FaceMap from './FaceMap';

const App = () => {
  const [image, setImage] = useState();
  const [faces, setFaces] = useState([]);

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
              hideFrame
              showContours
              showLandmarks
            />
          ))}
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
  frame: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
  },
  landmark: {
    width: 7,
    height: 7,
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'yellow',
    position: 'absolute',
  },
  image: {
    borderRadius: 10,
  },
  imageContainer: {
    marginTop: 15,
  },
});

export default App;
