import React, { useState } from 'react';
import { Button, Image, StyleSheet, View, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FaceDetection from '@react-native-ml-kit/face-detection';

const App = () => {
  const [image, setImage] = useState();
  const [faces, setFaces] = useState([]);

  const handlePress = async () => {
    setFaces([]);

    const _image = await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 250,
      height: 250,
      cropping: true,
    });
    setImage(_image);

    const result = await FaceDetection.detect('file://' + _image.path, {
      landmarkMode: 'all',
    });
    setFaces(result);
  };

  return (
    <View style={styles.container}>
      <Button title="Choose an Image" onPress={handlePress} />
      {image && (
        <View>
          <Image
            source={{ uri: image.path }}
            style={{ height: image.height, width: image.width }}
          />
          {faces.map((face, index) => (
            <>
              <View
                key={index}
                style={[
                  styles.frame,
                  {
                    width: face.frame.width,
                    height: face.frame.height,
                    top: face.frame.origin.y,
                    left: face.frame.origin.x,
                  },
                ]}
              />

              {face.landmarks.leftEye && (
                <Text
                  style={{
                    position: 'absolute',
                    top: face.landmarks.leftEye.position.y - 10,
                    left: face.landmarks.leftEye.position.x - 20,
                    color: 'yellow',
                  }}>
                  Left Eye
                </Text>
              )}

              {face.landmarks.rightEye && (
                <Text
                  style={{
                    position: 'absolute',
                    top: face.landmarks.rightEye.position.y - 10,
                    left: face.landmarks.rightEye.position.x - 20,
                    color: 'yellow',
                  }}>
                  Right Eye
                </Text>
              )}
            </>
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
    borderColor: 'red',
    borderWidth: 5,
    position: 'absolute',
  },
});

export default App;
