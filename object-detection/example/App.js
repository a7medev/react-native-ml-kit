import React, { useState } from 'react';
import { Text, Button, StyleSheet, View, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ObjectDetection from '@react-native-ml-kit/object-detection';

const App = () => {
  const [labels, setLabels] = useState([]);
  const [imagePath, setImagePath] = useState(null);

  const handlePress = async () => {
    setLabels([]);
    const image = await ImagePicker.openPicker({ mediaType: 'photo' });
    setImagePath(image.path);

    console.log(image.path);
    const result = await ObjectDetection.detectSingleImage({
      url: 'file:' + image.path,
      confidence: 0.8,
      shouldEnableMultipleObjects: true,
      shouldEnableClassification: true
    });
    console.log(result);
    setLabels(result);
  };

  // resizeMode="repeat" has to be because any other configuration scales or recenters the image!

  return (
    <View style={styles.container}>

      <View style={styles.image}>
        <ImageBackground style={styles.image} source={{ uri: imagePath }} resizeMode="repeat">

          {labels.map(label => (<View key={label.index} style={{
            zIndex: 20,
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            width: label.frameWidth,
            height: label.frameHeight,
            left: label.frameX,
            top: label.frameY
          }} />))}

        </ImageBackground>
      </View>

      <Button title="Choose an Image" onPress={handlePress} />

      {labels.length > 0 && <Text style={styles.heading}>Labels</Text>}
      {labels.map(label => (
        <View style={styles.label} key={label}>
          <Text>
            {label.text} - {label.confidence.toFixed(2)}% (w*h*x*y == {label.frameWidth}x{label.frameHeight}x{label.frameX}x{label.frameY})
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    backgroundColor: '#ffff55',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: '90%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  image: {
    overflow: 'hidden',
    height: 400,
    width: '100%',
    backgroundColor: 'black'
  }
});

export default App;
